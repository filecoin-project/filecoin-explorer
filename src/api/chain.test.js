/* global jest, test, expect */

import api from './api'
import Chain from './chain'
import chainHeadRes from './fixtures/chain.head.json'
import headBlock from './fixtures/block/zDPWYqFD7pu9A7r1Lb45GKKkaai4NquaRViBMyPfLZHKrW87DRo2.json'
import parent1 from './fixtures/block/zDPWYqFD7np5ATk5Qn2bT4nv943Ki9Qug2pm2drtnoyXzYQETKS1.json'
import parent2 from './fixtures/block/zDPWYqFD4uRLT1cJ62HYKp6nembi2NGPyZ4fJ6E3WMS18YjDkQRf.json'
import parent3 from './fixtures/block/zDPWYqFCtf5awkxnZbpurnQFvsrafnv4nJbP8UkAHD8GCf8T2Sz4.json'

function resolve (data) {
  data = Object.assign({}, data)
  return Promise.resolve(data)
}
function resolveArray (data) {
  return Promise.resolve([Object.assign({}, data[0])])
}

test('fetchBlock', async () => {
  const chainApi = new Chain()
  api.getJson = jest.fn()
  api.getJson
    .mockReturnValueOnce(resolve(headBlock))

  const cid = chainHeadRes[0]['/']
  let block = await chainApi.fetchBlock(cid)
  expect(block).toEqual({
    cid: chainHeadRes[0]['/'],
    ...headBlock,
    height: Number(headBlock.height),
    nonce: Number(headBlock.nonce),
    parentWeight: Number(headBlock.parentWeight),
  })

  // expect 2nd call to hit internal cache not the api mock
  block = await chainApi.fetchBlock(cid)
  expect(block).toEqual({
    cid: chainHeadRes[0]['/'],
    ...headBlock,
    height: Number(headBlock.height),
    nonce: Number(headBlock.nonce),
    parentWeight: Number(headBlock.parentWeight),
  })
})

test('fetchHeadBlock', async () => {
  const chainApi = new Chain()
  api.getJson = jest.fn()
  api.getJson
    .mockReturnValueOnce(resolveArray(chainHeadRes))
    .mockReturnValueOnce(resolve(headBlock))

  const block = await chainApi.fetchHeadBlock()
  expect(block).toEqual({
    cid: chainHeadRes[0]['/'],
    ...headBlock,
    height: Number(headBlock.height),
    nonce: Number(headBlock.nonce),
    parentWeight: Number(headBlock.parentWeight),
  })
})

test('fetchChain', async () => {
  const chainApi = new Chain()
  api.getJson = jest.fn()
  api.getJson
    .mockReturnValueOnce(resolveArray(chainHeadRes))
    .mockReturnValueOnce(resolve(headBlock))
    .mockReturnValueOnce(resolve(parent1))
    .mockReturnValueOnce(resolve(parent2))
    .mockReturnValueOnce(resolve(parent3))

  const pageSize = 6
  const res = await chainApi.fetchChain(pageSize)
  console.log(res)   

  expect(res.length).toBe(pageSize)
  expect(res[0][0].cid).toEqual(chainHeadRes[0]['/'])
  const height = Number(headBlock.height)
  expect(res[0][0].height).toEqual(height)
  // expect 2 null blocks
  expect(res[1][0]).toEqual({height: height - 1})
  expect(res[2][0]).toEqual({height: height - 2})

  expect(res[3][0].cid).toEqual(headBlock.parents[0]['/'])
  expect(res[4][0].cid).toEqual(parent1.parents[0]['/'])
  expect(res[5][0].cid).toEqual(parent2.parents[0]['/'])
})

test('fetchParents', async () => {
  const chainApi = new Chain()
  api.getJson = jest.fn()
  api.getJson
    .mockReturnValueOnce(resolve(chainHeadRes))
    .mockReturnValueOnce(resolve(headBlock))
    .mockReturnValueOnce(resolve(parent1))

  const block = await chainApi.fetchHeadBlock()
  const parents = await chainApi.fetchParents(block)

  expect(parents.length).toBe(1)
  expect(parents[0].cid).toEqual(block.parents[0]['/'])
})

test('fetchChildren', async () => {
  const chainApi = new Chain()
  api.getJson = jest.fn()
  api.getJson
    .mockReturnValueOnce(resolve(chainHeadRes))
    .mockReturnValueOnce(resolve(headBlock))
    .mockReturnValueOnce(resolve(parent1))
    .mockReturnValueOnce(resolve(parent2))
    .mockReturnValueOnce(resolve(parent3))

  const pageSize = 6
  const res = await chainApi.fetchChain(pageSize)

  // no children of null blocks
  let children = await chainApi.fetchChildren(res[1][0])
  expect(children.length).toBe(0)

  children = await chainApi.fetchChildren(res[3][0])
  expect(children.length).toBe(1)
  expect(children[0].cid).toEqual(res[0][0].cid)

  children = await chainApi.fetchChildren(res[4][0])

  expect(children.length).toBe(1)
  expect(children[0].cid).toEqual(res[3][0].cid)
})
