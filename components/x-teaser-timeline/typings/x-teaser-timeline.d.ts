/**
 * @typedef {  } CustomSlotContent
 * @typedef { Array<number> | number } CustomSlotPosition
 */

export type CustomSlotContent = string[] | Object[] | Object | string
export type CustomSlotPosition = number[] | number

/**
 * A news item (an article).
 * @typedef {Object} Item
 * @property {string} id e.g., '01f0b004-36b9-11ea-a6d3-9a26f8c3cba4'
 * @property {string} title e.g.,'Europeans step up pressure on Iran over nuclear deal'
 * @property {string} publishedDate e.g., '2020-01-14T11:10:26.000Z'
 */
export interface Item {
  id: string
  title: string
  publishedDate: string
  localisedLastUpdated: string
}

/**
 * Extra props added to an item in groups.
 * @typedef {Object} ItemInGroupInfo
 * @property {number} articleIndex
 * @property {string} localisedLastUpdated e.g., '2020-01-14T11:10:26.000+00:00'
 */
export interface ItemInGroupInfo {
  articleIndex: number
  localisedLastUpdated: string
}

/** A news item (an article) in a group of items.
 * @typedef {(Item & ItemInGroupInfo)} ItemInGroup
 */
export interface ItemInGroup extends Item, ItemInGroupInfo {}

/**
 * A list of news published on the same date.
 * @typedef {Object} GroupOfItems
 * @property {string} title e.g., 'Earlier Today'
 * @property {string} date e.g., '2020-01-14'
 * @property {Array<ItemInGroup>} items An array of news articles.
 */
export interface GroupOfItems {
  title?: string
  date: string
  items: ItemInGroup[]
}

/**
 * @typedef {Object} PositionInGroup
 * @property {number} group
 * @property {number} index
 */
export interface PositionInGroup {
  group: number
  index: number
}
