import Block from '../lib/Block'
import assert from 'assert'
import { GENESIS_TIME, DIFFICULTY } from '../utils/constants'

describe('Block Tests', () => {

  let block;
  let genesis;
  let data;

  beforeEach(() => {
    genesis = Block.genesis()
    data = 'Super Data'
    block = Block.mineBlock(genesis, data)
  }) 

  it('shoud get Genesis Block', () => {
    assert.equal(genesis.timestamp, GENESIS_TIME)
  })

  it('should mine new Block', () => {    
    assert.equal(block.data, data)
  })

  it('generates a hash that matches the difficulty', () => {    
    assert.equal(block.hash.substring(0, block.difficulty), '0'.repeat(block.difficulty))
  })

  it('lowers the difficulty for slowly mined blocks', () => {
    assert.equal(Block.adjustDifficulty(block, block.timestap + 36000), block.difficulty - 1)
  })

  it('raises the difficulty for quickly mined blocks', () => {
    assert.equal(Block.adjustDifficulty(block, block.timestap), block.difficulty + 1)
  })
})