const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { interface, bytecode } = require('../compile')

const provider = ganache.provider()
const web3 = new Web3(provider)
const MY_MESSAGE = 'Hi there!'

let accounts
let inbox

beforeEach(async() => {
  // get a list of all accounts

  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [MY_MESSAGE]
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    })

  // inbox.setProvider(provider)
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  })

  it('has a default message', async() => {
    const message = await inbox.methods.message().call()
    assert.equal(message, MY_MESSAGE)
  })

  it('can change the message', async() => {
    await inbox.methods.setMessage('bye').send({
      from: accounts[0]
    })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'bye')
  })
})