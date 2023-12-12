'use client';

import {useEffect, useState} from 'react';
import axios from 'axios';
import requests from '@/JS/requests';


export default function Home({params}) {

  const [client, setClient] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [destinationAccounts, setDestinationAccounts] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [sourceDisabled, setSourceDisabled] = useState(false);
  const [destinationDisabled, setDestinationDisabled] = useState(true);
  const [transferButtonDisabled, setTransferButtonDisabled] = useState(true);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('submiting');
  const [message, setMessage] = useState(null);

  const clientId = params.clientId;

  useEffect(() => {
    const fetchClient = async () => {
      const requestURI = requests.clients.byId(clientId);
      const response = await axios.get(requestURI);
      setClient(response.data);
    }

    const fetchAccounts = async () => {
      const requestURI = requests.accounts.byClient(clientId);
      const response = await axios.get(requestURI);
      setAccounts(response.data);
    } 

    fetchClient();
    fetchAccounts();
  }, []);

  useEffect(() => {
    if(selectedSource) {
        const newDestinationAccounts = accounts.filter(account => account.id != selectedSource);
        setDestinationAccounts(newDestinationAccounts);
        setDestinationDisabled(false);
    }
    else {
        setDestinationAccounts([]);
        setDestinationDisabled(true);
    }
  }, [selectedSource]);

  useEffect(() => {
    const disabled = !(selectedDestination && amount > 0);
    setTransferButtonDisabled(disabled);
  }, [selectedDestination, amount]);

  function handleSourceSelection(e) {
    setSelectedSource(e.target.value);
  }

  function handleDestinationSelection(e) {
    setSelectedDestination(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleTransfer() {
    setSourceDisabled(true);
    setDestinationDisabled(true);
    setTransferButtonDisabled(true);

    const transfer = {
        client: clientId,
        source: selectedSource,
        dest: selectedDestination,
        amount: amount
    }

    const postData = async (transfer) => {
        try {
            const response = await axios.post(requests.transfers.makeTransfer, transfer);
            const data = response.data;
            setMessage("Transferencia exitosa");
            setStatus("success");
        } catch (error) {
            setStatus("error");
            setMessage(error.response.data.error);
            setSourceDisabled(false);
            setDestinationDisabled(false);
        }
    }

    postData(transfer);
  }



  return (
    <>
        <h2>Nueva transferencia</h2>
        {
            client && (
                accounts.length > 1? (
                    <div className="flex flex-col justify-start gap-4">
                            <div className="flex justify-between">
                                <label htmlFor="source">
                                 Cuenta Origen:
                                    <select className="mt-2 min-w-full" disabled={sourceDisabled} name="source" id="source" onChange={handleSourceSelection}>
                                        <option value={null}> </option>
                                        { accounts.map(account => {
                                            return (
                                                <option
                                                    key={account.id}
                                                    value={account.id}
                                                >
                                                        Cuenta {account.id} - Saldo: ${account.balance}
                                                </option>
                                            );
                                        })
                                        }
                                    </select>
                                </label>
                            </div>
                            <div className="flex justify-between">
                                <label htmlFor="destination">
                                    Cuenta Destino:
                                    <select className="min-w-full mt-2 rounded-sm" disabled={destinationDisabled} name="destination" id="destination" onChange={handleDestinationSelection}>
                                        <option value={null}> </option>
                                        { destinationAccounts.map(account => {
                                            return (
                                                <option
                                                    key={account.id}
                                                    value={account.id}
                                                >
                                                        Cuenta {account.id} - Saldo: ${account.balance}
                                                </option>
                                            );
                                        })
                                        }
                                    </select>
                                </label>
                            </div>
                        <label htmlFor="amount">
                            Monto:
                            <input className="min-w-full mt-2 rounded-sm" name="amount" id="amount" type="text" value={amount} onChange={handleAmountChange}/>
                        </label>
                        <button 
                            className="disabled:bg-green-950 bg-green-500 text-gray-50 disabled:text-gray-500 py-3 px-6 rounded-md"
                            disabled={transferButtonDisabled} 
                            onClick={handleTransfer}
                        >
                            Transferir
                        </button>
                        {
                            status=="error" && (
                                <p className="text-sm text-red-500">Error: {message}</p>
                            )
                        }
                        {
                            status=='success' && (
                                <p className="text-sm text-green-500">{message}</p>
                            )
                        }
                    </div>
                ) : (
                    <p>Error: el cliente seleccionado no posee dos o más cuentas.</p>
                )
            )
        }
    </>
  );



}