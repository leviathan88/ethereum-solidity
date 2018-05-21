import Block from '../lib/Block'
import assert from 'assert'
import { GENESIS_TIME } from '../utils/constants';

describe('Block Tests', () => {

  let block

  beforeEach(() => {
    block = new Block('foo', 'bar', 'zoo', 'bazooka')
  })
  

  it('should check for creation of new Block', () => {
    assert.equal(block.timestamp, 'foo')
  })

  it('shoud get Genesis Block', () => {
    assert.equal(Block.genesis().timestamp, GENESIS_TIME)
  })

  it('should mine new Block', () => {
    const newBlock = Block.mineBlock(block, 'Super Data!')
    assert.equal(newBlock.data, 'Super Data!')
  })
})