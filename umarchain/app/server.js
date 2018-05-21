import express from 'express'
import bodyParser from 'body-parser'

import Blockchain from '../lib/blockchain'
import { HTTP_PORT } from '../utils/constants'

const app = express()
app.use(bodyParser.json())

const bc = new Blockchain()

app.get('/blocks', (req, res) => {
  res.json(bc.chain)
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  res.redirect('/blocks')
})

app.listen(HTTP_PORT, () => {
  console.log('running like a hurrican', HTTP_PORT)
})