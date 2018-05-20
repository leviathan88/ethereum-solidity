const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')
const MILLION_GAS = '1000000'

let accounts
let factory
let campaignAddress
let campaign

function sendManagerInfo() {
  return {
    from: accounts[0],
    gas: MILLION_GAS
  }
}

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send(sendManagerInfo())  
  
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: MILLION_GAS
  });
  
  [ campaignAddress ] = await factory.methods.getDeployedCampaigns().call()
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress)
})

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call()
    assert.equal(accounts[0], manager)
  })

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: '101',
      from: accounts[1]
    })
    const isContributor = await campaign.methods.approvers(accounts[1]).call()
    assert(isContributor)
  })

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute.send({
        value: '5',
        from: accounts[1]
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  it('allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[0])
      .send(sendManagerInfo())

    const firstRequest = await campaign.methods.requests(0).call()
    assert.equal('Buy batteries', firstRequest.description)
  })

  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    })

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send(sendManagerInfo())

    await campaign.methods.approveRequest(0).send(sendManagerInfo())

    await campaign.methods.finalizeRequest(0).send(sendManagerInfo())

    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)

    assert(balance > 104)
  })

})