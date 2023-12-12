'use client';

import requests from '../../../JS/requests';
import Link from 'next/link';
import axios from 'axios';
import {useState, useEffect} from 'react';
import GridPage from '@/Components/GridPage';

function Page({params}) {
    const clientId = params.clientId;
    const [accounts, setAccounts] = useState([]);
    const [currentClient, setCurrentClient] = useState(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            const requestURI = requests.accounts.byClient(clientId);
            const response = await axios.get(requestURI);
            setAccounts(response.data);
        }

        const fetchClient = async () => {
            const requestURI = requests.clients.byId(clientId);
            const response = await axios.get(requestURI);
            setCurrentClient(response.data);
        }

        fetchAccounts();
        fetchClient();
    }, []);

    const newAccounts = accounts.map(account => {
        const {client, ...rest} = account;
        return rest;
    });

    const render = currentClient && accounts;
    return (
        <div className="flex flex-col gap-3 items-center">
        {render &&
                <GridPage
                    items={newAccounts}
                    title={`Cuenta de ${currentClient.name}`}
                    subtitle="Seleccione cuenta a consultar"
                    link={`/cuentas/${clientId}`}
                    resultsPerPage={5}
                />
        }
        {currentClient && 
            <Link 
                className="bg-green-500 text-gray-50 text-lg rounded-md my-3 max-w-fit p-3" 
                href={`/transferencias/${currentClient.id}`}>
                    Transferencias
            </Link>
        }
        <div className="flex justify-start w-full mt-16">
            <Link href={`/`} className="text-gray-50 max-w-fit bg-green-500 rounded-md p-4 px-8">
                Volver
            </Link>
        </div>
        </div>
    );
}

export default Page;