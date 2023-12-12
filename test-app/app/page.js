'use client';

import {useEffect, useState} from 'react';
import axios from 'axios';
import requests from '../JS/requests';
import GridPage from '@/Components/GridPage';

export default function Home() {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const requestURI = requests.clients.index;
      const response = await axios.get(requestURI);
      setClients(response.data);
    }
    fetchClients();
  }, [])

  return (
    clients && 
      <GridPage
        title="Clientes"
        subtitle="Seleccione cliente a consultar"
        items={clients}
        link="/cuentas"
        resultsPerPage="8"
      />
  );
}
