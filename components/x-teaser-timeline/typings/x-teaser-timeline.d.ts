export type CustomSlotContent = string[] | Object[] | Object | string
export type CustomSlotPosition = number[] | number

/**
 * A news item (i.e. an article)
 */
export interface Item {
  id: string // e.g. '01f0b004-36b9-11ea-a6d3-9a26f8c3cba4'
  title: string // e.g.,'Europeans step up pressure on Iran over nuclear deal'
  publishedDate: string // ISO8601 date string
  localisedLastUpdated: string // ISO8601 date string
}

export interface ItemInGroupInfo {
  articleIndex: number
  localisedLastUpdated: string // ISO8601 date string
}

export interface ItemInGroup extends Item, ItemInGroupInfo {}

export interface GroupOfItems {
  title?: string // e.g. 'Earlier Today'
  date: string // e.g. '2020-01-14'
  items: ItemInGroup[] // An array of news articles
}

export interface PositionInGroup {
  group: number
  index: number
}
