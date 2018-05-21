import { shorten } from './utils/helpers'

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
    return new this('Genesis time', '-------', 'f1rg-sdgsg', [])
  }
}

export default Block