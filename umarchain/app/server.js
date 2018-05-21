import express from 'express'
import bodyParser from 'body-parser'

import Blockchain from '../lib/blockchain'
import { HTTP_PORT } from '../utils/constants'
import P2pServer from './p2p-server'

const app = express()
app.use(bodyParser.json())

const bc = new Blockchain()
const p2pServer = new P2pServer(bc)

app.get('/blocks', (req, res) => {
  res.json(bc.chain)
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  res.redirect('/blocks')

  p2pServer.syncChains()
})

app.listen(HTTP_PORT, () => {
  console.log('running like a hurrican', HTTP_PORT)
})
p2pServer.listen()