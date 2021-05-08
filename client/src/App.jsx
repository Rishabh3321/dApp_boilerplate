import React, { useContext, useEffect } from "react";
import { contractContext } from "./hooks/contract";
import Routes from "./routes";
import "./App.css";

function App() {
  const  { web3 , initialise } = useContext(contractContext);

  useEffect(() => {
    async function init(){
      await initialise();
    }; 
    init();
  },[initialise]);

  return(
    (!web3) ? (
     <div>Loading Web3, accounts, and contract...</div>
    ): (<Routes />)
  )
}
  export default App;