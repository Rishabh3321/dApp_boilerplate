import React, { useState } from 'react';
import getWeb3 from  '../getWeb3';
import CounterContract from "../contracts/Counter.json";

export const contractContext = React.createContext();
export const Provider = ({ children }) => {

    const [web3,setWeb3] = useState(null) ;
    const [account,setAccount] = useState(null);
    const [contract,setContract] = useState(null);
    
    const initialise = async () => {
        window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0]);
        });
        try {
            const web3Instance = await getWeb3();
            const accounts = await web3Instance.eth.getAccounts();
            const networkId = await web3Instance.eth.net.getId();
            const deployedNetwork = CounterContract.networks[networkId];
            const contractInstance = new web3Instance.eth.Contract(
                CounterContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            setWeb3(web3Instance);
            setAccount(accounts[0]);
            setContract(contractInstance);
        } catch (error) {
            alert('Failed to load web3, accounts, or contract. Check console for details.');
            console.error(error);
        }
    };

    return (
        <contractContext.Provider value={{ web3 , account ,contract , initialise }}>
            {children}
        </contractContext.Provider>
    );
};

export const Consumer = contractContext.Consumer;