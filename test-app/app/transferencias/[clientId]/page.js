'use client'
import {useEffect, useState} from 'react';
import axios from 'axios';
import requests from '@/JS/requests';
import Link from 'next/link';


export default function Page({params}) {
    const [currentClient, setCurrentClient] = useState(null);
    const [transfers, setTransfers] = useState([]);

    const clientId = params.clientId;

    useEffect(() => {
        const fetchClient = async () => {
            const requestURI = requests.clients.byId(clientId);
            const response = await axios.get(requestURI);
            setCurrentClient(response.data);
        }

        const fetchTransfers = async () => {
            const requestURI = requests.transfers.byClient(clientId) + "?amount=5";
            const response = await axios.get(requestURI);
            setTransfers(response.data);
        }

        fetchClient();
        fetchTransfers();
        console.log(currentClient);
        console.log(transfers);
    } ,[]);

    

    return (
        currentClient && (
            <>
                <div className="flex flex-col gap-8 items-center my-8">
                    { transfers.length? (
                        <>
                            <h2 className="text-4xl">Últimas cinco transferencias de {`${currentClient.name}`}</h2>
                            <div className="w-full">
                                <dl className="flex flex-col gap-3">
                                {transfers.map(transfer => {
                                    return (
                                        <div key={ transfer.id }>
                                            <dt className="ml-4 text-lg">Transferencia {transfer.id}</dt>
                                            <dd className="ml-12 text-md">Desde cuenta: {transfer.sourceAccount.id}</dd>
                                            <dd className="ml-12 text-md">Hacia cuenta: {transfer.destinationAccount.id}</dd>
                                            <dd className="ml-12 text-md">Monto: {transfer.amount}</dd>
                                            <dd className="ml-12 text-md">Fecha: {transfer.timestamp}</dd>
                                        </div>
                                    )
                                })}
                                </dl>
                            </div>
                        </>
                    ) : (
                        <h2 className="text-4xl">No se registran transferencias por {`${currentClient.name}`}</h2>
                    )
                    }
                    <Link href={`/transferencias/${clientId}/nueva`} className="text-gray-50 max-w-fit bg-green-500 rounded-md p-4 px-8 justify-center items-center">
                        Nueva transferencia
                    </Link>
                <div className="flex justify-start w-full">
                    <Link href={`/cuentas/${clientId}`} className="text-gray-50 max-w-fit bg-green-500 rounded-md p-4 px-8">
                        Volver
                    </Link>
                </div>
                </div>
            </>
        )
    );
}