import React, { Component } from 'react'

import './App.css'
import web3 from './web3'
import lottery from './lottery'

class App extends Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  }
  

  async componentDidMount() {
    const manager = await lottery.methods.manager().call()
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)

    this.setState({
      manager,
      players,
      balance
    })
  }

  render() {
    const { value, players, manager, balance, message } = this.state  
    return (
      <div>
        <h2>Lottery Contract, web3 version: {web3.version}</h2>
        <p> This contract is managed by {manager} </p>
        <p> There are currently {players.length} people competing</p>
        <p> for {web3.utils.fromWei(balance, 'ether')} ether</p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Feeling lucky punk?</h4>
          <div>
            <label> Amount of ether to enter</label>
            <input
              value={value}
              onChange={event => this.setState({
                value: event.target.value
              })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr/>
          <h4> pick a winner </h4>
          <button onClick={this.onClick}>Pick</button>
        <hr/>
        <h2>{message}</h2>
      </div>
    )
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const accounts = await web3.eth.getAccounts()

    this.setState({
      message: 'Submiting the transaction...'
    })

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })

    this.setState({
      message: 'You have entered mortal kombat!'
    })
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts()

    this.setState({
      message: 'Picking a winner...'
    })

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({
      message: 'winner got picked!!!'
    })
  }
}

export default App
