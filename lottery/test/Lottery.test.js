const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { interface, bytecode } = require('../compile')

const provider = ganache.provider()
const web3 = new Web3(provider)

let lottery
let accounts

beforeEach(async() => {
  accounts = await web3.eth.getAccounts()

  const firstAccount = accounts[0]

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
})