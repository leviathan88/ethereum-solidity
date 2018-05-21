import Block from '../block'
import assert from 'assert'

let block

beforeEach(() => {
  block = new Block('foo', 'bar', 'zoo', 'bazooka')
})

describe('Blockchain', () => {
  it('should check for creation of blockchain', () => {
    assert.equal(block.timestamp, 'foo')
  })

  it('shoud get genesis block', () => {
    assert.equal(Block.genesis().timestamp, 'Genesis time')
  })
})