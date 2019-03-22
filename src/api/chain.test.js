/* global jest, test, expect */

import api from './api'
import { decodeBigInt } from './util'
import Chain from './chain'
import headBlock from './fixtures/block/zDPWYqFD7pu9A7r1Lb45GKKkaai4NquaRViBMyPfLZHKrW87DRo2.json'
import parent1 from './fixtures/block/zDPWYqFD7np5ATk5Qn2bT4nv943Ki9Qug2pm2drtnoyXzYQETKS1.json'
import parent2 from './fixtures/block/zDPWYqFD4uRLT1cJ62HYKp6nembi2NGPyZ4fJ6E3WMS18YjDkQRf.json'
import parent3 from './fixtures/block/zDPWYqFCtf5awkxnZbpurnQFvsrafnv4nJbP8UkAHD8GCf8T2Sz4.json'

const chainHeadRes = [headBlock]

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

  const cid = 'zDPWYqFD7pu9A7r1Lb45GKKkaai4NquaRViBMyPfLZHKrW87DRo2'
  let block = await chainApi.fetchBlock(cid)
  expect(block).toEqual({
    cid: cid,
    ...headBlock,
  })

  // expect 2nd call to hit internal cache not the api mock
  block = await chainApi.fetchBlock(cid)
  expect(block).toEqual({
    cid: cid,
    ...headBlock,
  })
})

test('fetchHeadBlock', async () => {
  const chainApi = new Chain()
  api.getJson = jest.fn()
  api.getJson
    .mockReturnValueOnce(resolveArray(chainHeadRes))

  const cid = 'zDPWYqFD7pu9A7r1Lb45GKKkaai4NquaRViBMyPfLZHKrW87DRo2'
  const block = await chainApi.fetchHeadBlock()
  expect(block).toEqual({
    ...headBlock,
  })
})

test('fetchChain', async () => {
  const chainApi = new Chain()
  api.getJson = jest.fn()
  api.getJson
    .mockReturnValueOnce(resolveArray(chainHeadRes))
    .mockReturnValueOnce(resolve(parent1))
    .mockReturnValueOnce(resolve(parent2))
    .mockReturnValueOnce(resolve(parent3))

  const cid = 'zDPWYqFD7pu9A7r1Lb45GKKkaai4NquaRViBMyPfLZHKrW87DRo2'
  const pageSize = 6
  const res = await chainApi.fetchChain(pageSize)

  expect(res.length).toBe(pageSize)
  const height = headBlock.height
  expect(+res[0][0].height).toEqual(+height)
  // expect 2 null blocks
  expect(+res[1][0].height).toEqual(+height - 1)
  expect(+res[2][0].height).toEqual(+height - 2)
})

test.skip('fetchParents', async () => {
  const chainApi = new Chain()
  api.getJson = jest.fn()
  api.getJson
    .mockReturnValueOnce(resolve([headBlock]))
    .mockReturnValueOnce(resolve(parent1))

  const block = await chainApi.fetchHeadBlock()
  console.log(chainHeadRes, block)
  const parents = await chainApi.fetchParents(block)

  expect(parents.length).toBe(1)
  expect(parents[0].cid).toEqual(block.parents[0]['/'])
})

test.skip('fetchChildren', async () => {
  const chainApi = new Chain()
  api.getJson = jest.fn()
  api.getJson
    .mockReturnValueOnce(resolve(chainHeadRes))
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

  children = await chainApi.fetchChildren(res[4][0])

  expect(children.length).toBe(1)
})
