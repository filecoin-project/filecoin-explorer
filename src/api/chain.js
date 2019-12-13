import { Lotus } from '@openworklabs/lotus-block-explorer';

window.localStorage.getItem('chainState');

const lotus = new Lotus({
  jsonrpcEndpoint: 'https://lotus-dev.temporal.cloud/rpc/v0',
});

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
  constructor() {
    window.chainCache = this.chainCache = [];
    this.blockByCid = {};
  }

  /**
   * Get a section of the chain, up to `pageSize` generations long.
   * Each item in the chain array is an array of blocks; a generation
   * of blocks with the same height
   */
  async fetchChain(handleError) {
    try {
      const { Height } = await lotus.getChainHead();
      await lotus.explore({
        fromHeight: Height - 5,
        toHeight: Height - 1,
      });
    } catch (err) {
      handleError(err)
    }
  }

  getChain = () => lotus.getChain();

  listen = () => lotus.listen();

  subscribe = callback => lotus.store.subscribe(callback);

  unsubscribe = callback => lotus.store.unsubscribe(callback);

  stopListening = () => lotus.stopListening();

  loadNextBlocks = () => lotus.loadNextBlocks(3);

  /**
   * Fetch a single Block by it's cid.
   *
   * Adds a `cid` property to each block to make life easier everywhere else.
   * Caches blocks as it gets them and is responsible for the accuracy of the
   * `chainCache` and `blockByCid`.
   */
  async fetchBlock(cid) {
    const block = await lotus.loadSingleBlock(cid);
    return block;
  }

  /**
   * Fetch the current chain head Block
   * For now we just take the first block in the tipset,
   * but later we could include the entire tipset in this view
   */
  async fetchHeadBlock() {
    const tipset = await lotus.getChainHead();
    return this.fetchBlock(tipset.Cids[0]['/']);
  }

  /**
   * Get the blocks that this block references in it's `parents` property
   */
  async fetchParents(block) {
    const cids = Chain.getParentCids(block);
    return Promise.all(cids.map(cid => this.fetchBlock(cid)));
  }

  /**
   * Try to find blocks that point to this block as their parent.
   * Walks up the chainCache to find the next available height.
   * Checks to see if any of that generation point to this block.
   */
  async fetchChildren(block) {
    const height = block.header.height;
    const maxHeight = this.chainCache.length - 1;
    if (height >= maxHeight) return null;
    let nextGen = null;
    // walk up the chain until we find the next gen or we run out of chain
    for (
      let nextHeight = height + 1;
      !nextGen && nextHeight <= maxHeight;
      nextHeight++
    ) {
      nextGen = await this.chainCache[nextHeight];
    }
    if (!nextGen) return null;
    // only return blocks that point the requested parent
    return nextGen.filter(b => {
      const cids = Chain.getParentCids(b);
      return cids.some(cid => cid === block.cid);
    });
  }

  // Helper method to check for dupes before adding a new block
  addBlockToChain(newBlock) {
    const height = newBlock.header.height;
    const generation = this.chainCache[height] || [];
    if (generation.some(block => block.cid === newBlock.cid)) {
      return; // alredy exists, don't add it again.
    }
    this.chainCache[height] = generation.concat(newBlock);
  }

  static getParentCids(block) {
    return (
      (block &&
        block.header.parents &&
        block.header.parents.map(Chain.getCid)) ||
      []
    );
  }

  static getCid(thing) {
    return thing && thing['/'];
  }
}

export default Chain;
