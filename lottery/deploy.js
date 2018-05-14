const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  'choose coil early deny coil engine current cup problem project design option',
  'https://rinkeby.infura.io/ft3e6i0JHtcEZ9OO40wF'
)

const web3 = new Web3(provider)


const gas = 1000000
const gasPrice = web3.utils.toWei('2', 'gwei')

const deploy = async() => {
  const accounts = await web3.eth.getAccounts()

  const firstAccount = accounts[0]

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: '0x' + bytecode
    })
    .send({
      gas,
      gasPrice,
      from: firstAccount
    })

  console.log(interface)
  console.log('Contract deployed to', result.options.address)
}

deploy()