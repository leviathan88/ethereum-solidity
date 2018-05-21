import { SHA256 } from 'crypto-js'

import { shorten } from '../utils/helpers'
import { GENESIS_TIME } from '../utils/constants'

class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
  }

  toString() {
    return `Block - 
      Timestamp: ${this.timestamp}
      Last Hash: ${shorten(this.lastHash)}
      Hash     : ${shorten(this.hash)}
      Data     : ${this.data}
    `
  }

  static genesis() {
    return new this(GENESIS_TIME, '-------', 'f1rg-sdgsg', [])
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now()
    const lastHash = lastBlock.hash

    const hash = Block.hash(timestamp, lastHash, data)

    return new this(timestamp, lastHash, hash, data)
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString()
  }
  
  static blockHash(block) {
    const { timestamp, lastHash, data } = block

    return Block.hash(timestamp, lastHash, data)
  }
}

export default Block