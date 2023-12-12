const URL = 'http://localhost:8000/api';

const requests = {
    clients: {
        index: `${URL}/clients`,
        byId: clientId => `${URL}/clients/${clientId}`
    },
    accounts: {
        index: `${URL}/accounts`,
        byClient: clientId => `${URL}/accounts/${clientId}`,
        byClientAndAccountNumber: (clientId, accountNumber) => `${URL}/accounts/${clientId}/${accountNumber}`
    },
    transfers: {
        byClient: clientId => `${URL}/transfers/${clientId}`,
        makeTransfer: `${URL}/transfers`
    }
}

export default requests;
