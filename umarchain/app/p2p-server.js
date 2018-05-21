import Websocket from 'ws'
import { P2P_PORT, PEERS } from '../utils/constants';

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain
    this.sockets = []
  }

  listen() {
    const server = new Websocket.Server({
      port: P2P_PORT
    })

    server.on('connection', socket => {
      this.connectSocket(socket)
    })

    this.connectToPeers()
    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`)
  }

  connectSocket(socket) {
    this.sockets.push(socket)
    console.log('Socket connected')

    this.messageHandler(socket)
    this.sendChain(socket)
  }

  connectToPeers() {
    PEERS.forEach(peer => {
      const socket = new Websocket(peer)

      socket.on('open', () => this.connectSocket(socket))
    })
  }

  messageHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message)
      this.blockchain.replaceChain(data)
    })
  }

  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain))
  }

  syncChains() {
    this.sockets.forEach(socket => {
      this.sendChain(socket)
    })
  }
}

export default P2pServer