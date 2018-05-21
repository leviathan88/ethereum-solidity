const GENESIS_TIME = 'Genesis time'
const HTTP_PORT = process.env.HTTP_PORT || 3000
const P2P_PORT = process.env.P2P_PORT || 5001
const PEERS = process.env.PEERS ? process.env.PEERS.split(',') : []

export {
  GENESIS_TIME,
  HTTP_PORT,
  P2P_PORT,
  PEERS
}