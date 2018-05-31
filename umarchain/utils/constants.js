const GENESIS_TIME = Date.now()
const HTTP_PORT = process.env.HTTP_PORT || 3000
const P2P_PORT = process.env.P2P_PORT || 5001
const PEERS = process.env.PEERS ? process.env.PEERS.split(',') : []
const DIFFICULTY = 3
const MINE_RATE = 3000

export {
  GENESIS_TIME,
  HTTP_PORT,
  P2P_PORT,
  PEERS,
  DIFFICULTY,
  MINE_RATE
}