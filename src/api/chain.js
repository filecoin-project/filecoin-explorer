import api from './api'
import { mapAllBigInts } from './util'

/*
  Chain - a caching view on the blocks we've seen so far.

  usage:

  ```
  const chain = new Chain()
  const arr = chain.fetch()
  // [[{ cid: 'z1'}], [{ cid: 'z2'}]]
  ````

  `chainCache` - is our cached view of the chain.
  A sparse array, height is array position. values are arrays of blocks with that height value.
  ```
  [
    51299: [
     { cid: z1, height: 51299, ...},
     { cid: z2, height: 51299, ...},
   ],
    51300: [
      { cid: z1, height: 51300, ...},
      { cid: z2, height: 51300, ...},
    ]
  ]

  `blockByCid` maps blocks to their CID, for quick look-ups
  ```
  {
    'z1': { cid: z1, height: 51299, ...},
    'z2': { cid: z2, height: 51299, ...}
  }
*/
class Chain {
  constructor () {
    window.chainCache = this.chainCache = []
    this.blockByCid = {}
  }

  /**
   * Get a section of the chain, up to `pageSize` generations long.
   * Each item in the chain array is an array of blocks; a generation
   * of blocks with the same height
   */
  async fetchChain (pageSize = 20, startCid) {
    let nextBlock = null
    if (!startCid) {
      nextBlock = await this.fetchHeadBlock()
    } else {
      nextBlock = await this.fetchBlock(startCid)
    }
    // init the chain with the head block
    let section = [[nextBlock]]
    while (section.length < pageSize) {
      let generation = await this.fetchParents(nextBlock)
      let parentBlock = generation[0]
      let nulls = this.createNullGenerations(nextBlock, parentBlock)
      section = section.concat(nulls).concat([generation])
      nextBlock = parentBlock
    }
    return section
  }

  createNullGenerations (headBlock, parentBlock) {
    const nullGenerations = []
    if (headBlock && parentBlock) {
      let hh = headBlock.height
      let ph = parentBlock.height
      for (let i = hh - 1; i > ph; i--) {
        nullGenerations.push([{height: i}])
      }
    }
    return nullGenerations
  }

  /**
   * Fetch a single Block by it's cid.
   *
   * Adds a `cid` property to each block to make life easier everywhere else.
   * Caches blocks as it gets them and is responsible for the accuracy of the
   * `chainCache` and `blockByCid`.
   */
  async fetchBlock (cid) {
    // found is either the block or a promise of the block.
    const found = this.blockByCid[cid]
    if (found) return found

    const promise = api.getJson(`/api/show/block/${cid}`)
    // Handle if another req for the same cid comes in while we're waiting for this one.
    // fetchBlock is an async funtion, so it always returns a promise.
    this.blockByCid[cid] = promise

    const response = await promise

    const block = {
      cid: cid,
      ...mapAllBigInts(response)
    }

    this.blockByCid[cid] = block

    this.addBlockToChain(block)

    return Object.assign({}, block)
  }

  /**
   * Fetch the current chain head Block
   */
  async fetchHeadBlock () {
    const raw = await api.getJson(`/api/chain/head`)
    // TODO: Proper support for tipsets
    const cid = raw && raw.length > 0 && raw[0]['/']
    return this.fetchBlock(cid)
  }

  /**
   * Get the blocks that this block references in it's `parents` property
   */
  async fetchParents (block) {
    const cids = Chain.getParentCids(block)
    return Promise.all(cids.map(cid => this.fetchBlock(cid)))
  }

  /**
   * Try to find blocks that point to this block as their parent.
   * Walks up the chainCache to find the next available height.
   * Checks to see if any of that generation point to this block.
   */
  async fetchChildren (block) {
    const {height} = block
    const maxHeight = this.chainCache.length - 1
    if (height >= maxHeight) return null
    let nextGen = null
    // walk up the chain until we find the next gen or we run out of chain
    for (let nextHeight = height + 1; !nextGen && nextHeight <= maxHeight; nextHeight++) {
      nextGen = await this.chainCache[nextHeight]
    }
    if (!nextGen) return null
    // only return blocks that point the requested parent
    return nextGen.filter(b => {
      const cids = Chain.getParentCids(b)
      return cids.some(cid => cid === block.cid)
    })
  }

  // Helper method to check for dupes before adding a new block
  addBlockToChain (newBlock) {
    const {height} = newBlock
    const generation = this.chainCache[height] || []
    if (generation.some(block => block.cid === newBlock.cid)) {
      return // alredy exists, don't add it again.
    }
    this.chainCache[height] = generation.concat(newBlock)
  }

  static getParentCids (block) {
    return (block && block.parents && block.parents.map(Chain.getCid)) || []
  }

  static getCid (thing) {
    return thing && thing['/']
  }
}

export default Chain
