'use client';

import {useState, useEffect} from 'react';
import requests from '@/JS/requests';
import axios from 'axios';
import Link from 'next/link';

export default function Page({params}) {
    const {clientId, accountNumber} = params;
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
            const requestURI = requests.accounts.byClientAndAccountNumber(clientId, accountNumber);
            const response = await axios.get(requestURI);
            setAccount(response.data);
        }
        fetchAccount();
    }, []);

    return (
        account && 
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col gap-3">
                    <h2 className="text-4xl">Cuenta de {account.client.name}</h2>
                    <ul className="flex flex-col gap-1 text-2xl">
                        <li>Número de cuenta:     {account.id}</li>
                        <li>Tipo de cuenta:    {account.type}</li>
                        <li>Balance:    ${account.balance}</li>
                    </ul>
                </div>
                <Link href={`/cuentas/${clientId}`} className="text-gray-50 bg-green-500 rounded-md p-4 justify-center items-center">
                    Volver
                </Link>
            </div>
    );
}