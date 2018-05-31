import { SHA256 } from 'crypto-js'

import { shorten } from '../utils/helpers'
import { GENESIS_TIME, DIFFICULTY } from '../utils/constants'

class Block {
  constructor(timestamp, lastHash, hash, data, nonce) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
  }

  toString() {
    return `Block - 
      Timestamp: ${this.timestamp}
      Last Hash: ${shorten(this.lastHash)}
      Hash     : ${shorten(this.hash)}
      Nonce    : ${this.nonce}
      Data     : ${this.data}
    `
  }

  static genesis() {
    return new this(GENESIS_TIME, '-------', 'f1rg-sdgsg', [], 0)
  }

  static mineBlock(lastBlock, data) {    
    const lastHash = lastBlock.hash

    let timestamp
    let hash
    let nonce = 0   

    do {
      nonce++
      timestamp = Date.now()
      hash = Block.hash(timestamp, lastHash, data, nonce)
    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY))

    return new this(timestamp, lastHash, hash, data, nonce)
  }

  static hash(timestamp, lastHash, data, nonce) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString()
  }
  
  static blockHash(block) {
    const { timestamp, lastHash, data, nonce } = block

    return Block.hash(timestamp, lastHash, data, nonce)
  }
}

export default Block