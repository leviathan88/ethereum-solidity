import Block from './Block'

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1]
    const newBlock = Block.mineBlock(lastBlock, data)
    this.chain.push(newBlock)

    return newBlock
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false

    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i]
      const previousBlock = chain[i - 1]

      if (currentBlock.lastHash !== previousBlock.hash ||
          currentBlock.hash !== Block.blockHash(currentBlock)) {
        return false
      }
    }

    return true
  }

  replaceChain(newChain) {
    if (this.chain.length >= newChain.length) return false
    if(!this.isValidChain(newChain)) return false

    this.chain = newChain
    return true
  }

}

export default Blockchain