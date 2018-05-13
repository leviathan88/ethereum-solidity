const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { interface, bytecode } = require('../compile')

const provider = ganache.provider()
const web3 = new Web3(provider)

let lottery
let accounts
let firstAccount

beforeEach(async() => {
  accounts = await web3.eth.getAccounts()

  firstAccount = accounts[0]

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({
      from: firstAccount,
      gas: '1000000'
    })
})

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address)
  })

  it('allows one account to enter', async() => {
    await lottery.methods.enter().send({
      from: firstAccount,
      value: web3.utils.toWei('0.02', 'ether')
    })

    const players = await lottery.methods.getPlayers().call({
      from: firstAccount
    })

    assert.equal(firstAccount, players[0])
    assert.equal(1, players.length)
  })

  it('allows multiple accounts to enter', async() => {
    await lottery.methods.enter().send({
      from: firstAccount,
      value: web3.utils.toWei('0.02', 'ether')
    })

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    })

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether')
    })

    const players = await lottery.methods.getPlayers().call({
      from: firstAccount
    })

    assert.equal(accounts[0], players[0])
    assert.equal(accounts[1], players[1])
    assert.equal(accounts[2], players[2])
    assert.equal(3, players.length)
  })

  it('requires a minimum amount of ether to enter', async() => {
    try {
      await lottery.methods.enter().send({
        from: firstAccount,
        value: 0
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  it('only manager can call pickWinner', async() => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  it('sends money to the winner and rests the players array', async() => {
    await lottery.methods.enter().send({
      from: firstAccount,
      value: web3.utils.toWei('2', 'ether')
    })

    const initialBalance = await web3.eth.getBalance(firstAccount)
    await lottery.methods.pickWinner().send({ from: firstAccount })
    const finalBalance = await web3.eth.getBalance(firstAccount)
    const difference = finalBalance - initialBalance

    assert(difference > web3.utils.toWei('1.8', 'ether'))

    const players = await lottery.methods.getPlayers().call({
      from: firstAccount
    })
    assert.equal(0, players.length)
  })
})