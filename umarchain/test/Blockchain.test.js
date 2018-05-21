import assert from 'assert'

import Blockchain from '../lib/Blockchain'
import { GENESIS_TIME } from '../utils/constants'

describe('Blockchain Tests', () => {
  let blockchain

  beforeEach(() => {
    blockchain = new Blockchain()
  })

  it('should start with genesis block', () => {
    assert.equal(blockchain.chain[blockchain.chain.length - 1].timestamp, GENESIS_TIME)
  })
})