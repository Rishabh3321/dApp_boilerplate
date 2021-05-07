import React, { Component } from "react";
import CounterContract from "./contracts/Counter.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };
  
    initialise = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CounterContract.networks[networkId];
      const instance = new web3.eth.Contract(
        CounterContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const response = await instance.methods.counter().call();
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.storageValue
      this.setState({ web3, accounts, contract: instance,storageValue: response });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentDidMount = async () => {
      await this.initialise();
      window.ethereum.on('accountsChanged', async (accounts) => {
        this.setState({accounts});
      })
  };

  incrementCounter = async () => {
    const { accounts, contract } = this.state;
    let acc = "0x13d35919269C9Eb1471F4aB1564C850151C9Ca73";
    await contract.methods.incrementByOne().send({ from:accounts[0] });
    const response = await contract.methods.counter().call();
    this.setState({ storageValue: response });
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Hi this side Rishabh Mishra!!!</h1>
        <h3>Address :: {this.state.accounts[0]}</h3>
        <h3>Current Counter Value : {this.state.storageValue} </h3>
        <button onClick={this.incrementCounter} > Inrcrement Counter </button>
      </div>
    );
  }
}

export default App;
