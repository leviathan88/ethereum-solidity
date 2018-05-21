import assert from 'assert'

import Blockchain from '../lib/Blockchain'
import { GENESIS_TIME } from '../utils/constants'
import Block from '../lib/block';

describe('Blockchain Tests', () => {
  let blockchain
  let bc2

  beforeEach(() => {
    blockchain = new Blockchain()
    bc2 = new Blockchain()
  })

  it('should start with genesis block', () => {    
    assert.deepEqual(blockchain.chain[0], Block.genesis())
  })

  it('should add new block', () => {
    const data = 'Second Block'
    blockchain.addBlock(data)
    assert.equal(blockchain.chain[1].data, data)
  })

  it('should valdidate a valid chain', () => {
    bc2.addBlock('anything at all')
    bc2.addBlock('anything at allsad')
    assert(blockchain.isValidChain(bc2.chain))
  })

  it('should invalidate a chain with corrupt genesis block', () => {
    bc2.chain[0].data = 'Evil corrupt data'
    assert(!blockchain.isValidChain(bc2.chain))
  })

  it('should invalidate a corrupt chain', () => {
    bc2.addBlock('Funky block')
    bc2.chain[1].data = 'Not so funky anymore'

    assert(!blockchain.isValidChain(bc2.chain))
  })
})