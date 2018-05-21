import Block from './Block'

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1]
    const newBlock = Block.mineBlock(lastBlock, data)
    this.chain.push(block)

    return newBlock
  }
}

export default Blockchain