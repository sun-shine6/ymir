import dataset from "../dataset"
import { put, putResolve, call, select } from "redux-saga/effects"
import { errorCode } from './func'

put.resolve = putResolve

function equalObject(obj1, obj2) {
  expect(JSON.stringify(obj1)).toBe(JSON.stringify(obj2))
}

describe("models: dataset", () => {
  errorCode(dataset, 'getDatasets')
  errorCode(dataset, 'getDataset')
  errorCode(dataset, 'batchDatasets')
  errorCode(dataset, 'getAssetsOfDataset')
  errorCode(dataset, 'getAsset')
  errorCode(dataset, 'delDataset')
  errorCode(dataset, 'createDataset')
  errorCode(dataset, 'updateDataset')
  errorCode(dataset, 'getInternalDataset')
  errorCode(dataset, 'getHotDatasets', [])

  it("reducers: UPDATE_DATASETS", () => {
    const state = {
      datasets: {},
    }
    const expected = { items: [1, 2, 3, 4], total: 4 }
    const action = {
      payload: expected,
    }
    const result = dataset.reducers.UPDATE_DATASETS(state, action)
    expect(result.datasets.total).toBe(expected.total)
  })
  it("reducers: UPDATE_DATASET", () => {
    const state = {
      dataset: {},
    }
    const expected = { id: 1001 }
    const action = {
      payload: expected,
    }
    const result = dataset.reducers.UPDATE_DATASET(state, action)
    expect(result.dataset.id).toBe(expected.id)
  })
  it("reducers: UPDATE_ASSETS", () => {
    const state = {
      assets: {},
    }
    const expected = { items: [1, 2, 3, 4], total: 4 }
    const action = {
      payload: expected,
    }
    const result = dataset.reducers.UPDATE_ASSETS(state, action)
    expect(result.assets.total).toBe(expected.total)
  })
  it("reducers: UPDATE_ASSET", () => {
    const state = {
      asset: {},
    }
    const expected = { hash: 'test' }
    const action = {
      payload: expected,
    }
    const result = dataset.reducers.UPDATE_ASSET(state, action)
    expect(result.asset.hash).toBe(expected.hash)
  })
  it("reducers: UPDATE_PUBLICDATASETS", () => {
    const state = {
      publicDatasets: [],
    }
    const expected = [1, 2, 3, 4]
    const action = {
      payload: expected,
    }
    const result = dataset.reducers.UPDATE_PUBLICDATASETS(state, action)
    expect(result.publicDatasets.join(',')).toBe(expected.join(','))
  })

  it("effects: getDatasets", () => {
    const saga = dataset.effects.getDatasets
    const creator = {
      type: "getDatasets",
      payload: {},
    }
    const expected = { items: [1, 2, , 3, 4], total: 4 }

    const generator = saga(creator, { put, call })
    generator.next()
    const response = generator.next({
      code: 0,
      result: expected,
    })
    const end = generator.next()

    equalObject(expected, end.value)
    expect(end.done).toBe(true)
  })
  it("effects: getDataset", () => {
    const saga = dataset.effects.getDataset
    const creator = {
      type: "getDataset",
      payload: {},
    }
    const expected = { id: 1001, name: 'dataset001' }

    const generator = saga(creator, { put, call })
    generator.next()
    generator.next({
      code: 0,
      result: expected,
    })
    const end = generator.next()

    equalObject(expected, end.value)
    expect(end.done).toBe(true)
  })
  it("effects: batchDatasets", () => {
    const saga = dataset.effects.batchDatasets
    const creator = {
      type: "batchDatasets",
      payload: { ids: '1,2,3,4' },
    }
    const expected = [1, 2, 3, 4]

    const generator = saga(creator, { put, call })
    generator.next()
    const end = generator.next({
      code: 0,
      result: expected,
    })

    equalObject(expected, end.value)
    expect(end.done).toBe(true)
  })
  it("effects: getAssetsOfDataset", () => {
    const saga = dataset.effects.getAssetsOfDataset
    const creator = {
      type: "getAssetsOfDataset",
      payload: {},
    }
    const expected = { items: [1, 2, , 3, 4], total: 4 }

    const generator = saga(creator, { put, call })
    generator.next()
    generator.next({
      code: 0,
      result: expected,
    })
    const end = generator.next()

    equalObject(expected, end.value)
    expect(end.done).toBe(true)
  })
  it("effects: getAsset", () => {
    const saga = dataset.effects.getAsset
    const creator = {
      type: "getAsset",
      payload: { hash: 'identify_hash_string' },
    }
    const expected = {
      hash: 'identify_hash_string', width: 800, height: 600,
      "size": 0,
      "channel": 3,
      "timestamp": "2021-09-28T08:26:53.088Z",
      "url": "string",
      "annotations": [
        {}
      ],
      "metadata": {},
      "keywords": [
        "string"
      ]
    }

    const generator = saga(creator, { put, call })
    generator.next()
    generator.next({
      code: 0,
      result: expected,
    })
    const end = generator.next()

    equalObject(expected, end.value)
    expect(end.done).toBe(true)
  })
  it("effects: delDataset", () => {
    const saga = dataset.effects.delDataset
    const creator = {
      type: "delDataset",
      payload: { id: 10001 },
    }
    const expected = { id: 10001, name: 'del_dataset_name' }

    const generator = saga(creator, { put, call })
    generator.next()
    const end = generator.next({
      code: 0,
      result: expected,
    })

    equalObject(expected, end.value)
    expect(end.done).toBe(true)
  })
  it("effects: createDataset", () => {
    const saga = dataset.effects.createDataset
    const expected = { id: 10001, name: 'new_dataset_name' }
    const creator = {
      type: "createDataset",
      payload: { id: 10001, name: 'new_dataset_name', type: 1 },
    }

    const generator = saga(creator, { put, call })
    generator.next()
    const end = generator.next({
      code: 0,
      result: expected,
    })

    equalObject(expected, end.value)
    expect(end.done).toBe(true)
  })
  it("effects: updateDataset", () => {
    const saga = dataset.effects.updateDataset
    const creator = {
      type: "updateDataset",
      payload: { id: 10001, name: 'new_dataset_name' },
    }
    const expected = { id: 10001, name: 'new_dataset_name' }

    const generator = saga(creator, { put, call })
    generator.next()
    const end = generator.next({
      code: 0,
      result: expected,
    })

    equalObject(expected, end.value)
    expect(end.done).toBe(true)
  })
  it("effects: updateDatasets -> normal success", () => {
    const saga = dataset.effects.updateDatasets
    const datasets = {
      items: [
        { id: 34, hash: 'hash1', state: 2, progress: 20 },
        { id: 35, hash: 'hash2', state: 3, progress: 100 },
        { id: 36, hash: 'hash3', state: 2, progress: 96 },
      ], total: 3
    }
    const creator = {
      type: "updateDatasets",
      payload: { hash1: { id: 34, state: 2, percent: 0.45 }, hash3: { id: 36, state: 3, percent: 1 } },
    }
    const expected = [
      { id: 34, hash: 'hash1', state: 2, progress: 45 },
      { id: 35, hash: 'hash2', state: 3, progress: 100 },
      { id: 36, hash: 'hash3', state: 3, progress: 100, forceUpdate: true },
    ]

    const generator = saga(creator, { put, call, select })
    generator.next()
    const d = generator.next(datasets)
    const end = generator.next()
    const updated = d.value.payload.action.payload.items

    expect(updated).toEqual(expected)
    expect(end.done).toBe(true)
  })
  it("effects: updateDatasets -> empty success", () => {
    const saga = dataset.effects.updateDatasets
    const datasets = {
      items: [
        { id: 34, hash: 'hash1', state: 2, progress: 20 },
        { id: 35, hash: 'hash2', state: 3, progress: 100 },
        { id: 36, hash: 'hash3', state: 2, progress: 96 },
      ], total: 3
    }
    const creator = {
      type: "updateDatasets",
    }

    const generator = saga(creator, { put, call, select })
    generator.next()
    const d = generator.next(datasets)
    const end = generator.next()
    const updated = d.value.payload.action.payload

    expect(updated).toEqual(datasets)
    expect(end.done).toBe(true)
  })
  it("effects: getHotDatasets -> get stats result success-> batch datasets success", () => {
    const saga = dataset.effects.getHotDatasets
    const creator = {
      type: "getHotDatasets",
      payload: { limit: 3 },
    }
    const result = [[1, 34], [1001, 31], [23, 2]]
    const datasets = [{ id: 1 }, { id: 1001 }, { id: 23 }]
    const expected = [{ id: 1, count: 34 }, { id: 1001, count: 31 }, { id: 23, count: 2 }]

    const generator = saga(creator, { put, call, select })
    generator.next()
    generator.next({
      code: 0,
      result,
    })
    const end = generator.next(datasets)

    expect(end.value).toEqual(expected)
    expect(end.done).toBe(true)
  })
  it("effects: getHotDatasets -> get stats result success-> batch datasets failed", () => {
    const saga = dataset.effects.getHotDatasets
    const creator = {
      type: "getHotDatasets",
      payload: { limit: 3 },
    }
    const result = [[1, 34], [1001, 31], [23, 2]]
    const datasets = undefined
    const expected = []

    const generator = saga(creator, { put, call, select })
    generator.next()
    generator.next({
      code: 0,
      result,
    })
    const end = generator.next(datasets)

    expect(end.value).toEqual(expected)
    expect(end.done).toBe(true)
  })
  it("effects: getHotDatasets -> stats result = []", () => {
    const saga = dataset.effects.getHotDatasets
    const creator = {
      type: "getHotDatasets",
      payload: { limit: 4 },
    }
    const result = []
    const expected = []

    const generator = saga(creator, { put, call, select })
    generator.next()
    const end = generator.next({
      code: 0,
      result,
    })

    expect(end.value).toEqual(expected)
    expect(end.done).toBe(true)
  })
  it("effects: getInternalDataset", () => {
    const saga = dataset.effects.getInternalDataset
    const creator = {
      type: "getInternalDataset",
      payload: {},
    }
    const expected = { items: [1, 2, , 3, 4], total: 4 }

    const generator = saga(creator, { put, call })
    generator.next()
    generator.next({
      code: 0,
      result: expected,
    })
    const end = generator.next()

    equalObject(expected, end.value)
    expect(end.done).toBe(true)
  })
})
