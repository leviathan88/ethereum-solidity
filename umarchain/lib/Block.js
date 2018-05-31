import { SHA256 } from 'crypto-js'

import { shorten } from '../utils/helpers'
import { GENESIS_TIME, DIFFICULTY, MINE_RATE } from '../utils/constants'

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
    this.difficulty = difficulty || DIFFICULTY
  }

  toString() {
    return `Block - 
      Timestamp  : ${this.timestamp}
      Last Hash  : ${shorten(this.lastHash)}
      Hash       : ${shorten(this.hash)}
      Nonce      : ${this.nonce}
      Difficulty : ${this.difficulty}
      Data       : ${this.data}
    `
  }

  static genesis() {
    return new this(GENESIS_TIME, '-------', 'f1rg-sdgsg', [], 0)
  }

  static mineBlock(lastBlock, data) {
    const lastHash = lastBlock.hash

    let { difficulty } = lastBlock
    let timestamp
    let hash
    let nonce = 0   

    do {
      nonce++
      timestamp = Date.now()
      hash = Block.hash(timestamp, lastHash, data, nonce)
      difficulty = Block.adjustDifficulty(lastBlock, timestamp)
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

    return new this(timestamp, lastHash, hash, data, nonce, difficulty)
  }

  static adjustDifficulty(lastBlock, currentTime) {
    const { difficulty } = lastBlock
    //console.log(`first par: ${lastBlock.timestamp + MINE_RATE}`)
    //console.log(`second ${currentTime}`)
    return lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString()
  }
  
  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block

    return Block.hash(timestamp, lastHash, data, nonce, difficulty)
  }
}

export default Block