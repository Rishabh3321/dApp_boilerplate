import React, { useState,useContext,useEffect, useCallback } from 'react'
import {contractContext} from '../hooks/contract';


function Dashboard() {
    const [counter,setCounter] = useState(0);
    const {account , contract} = useContext(contractContext);

    const incrementCounter = async () => {
        await contract.methods.incrementByOne().send({ from:account });
        const response = await contract.methods.counter().call();
        setCounter(response);
    }


    const syncCounter = useCallback(async () => {
        if(contract){
            const response = await contract.methods.counter().call();
            setCounter(response);
        }
    },[contract]);

    useEffect(() => {
        syncCounter();  
    }, [syncCounter])

    return(
        <div className="App">
            <h1>Hi this side Rishabh Mishra!!!</h1>
            <h3>Address :: {account} </h3>
            <h3>Counter Value : {counter} </h3>
            <button onClick={incrementCounter} > Inrcrement Counter </button>
      </div>
    );
}

export default Dashboard;
