import { buildModel } from '../../src/lib/transform';

const props = {
	'items': [
		{
			'id': '01f0b004-36b9-11ea-a6d3-9a26f8c3cba4',
			'title': 'Europeans step up pressure on Iran over nuclear deal',
			'publishedDate': '2020-01-14T11:10:26.000Z'
		},
		{
			'id': '01eaf2fc-36ac-11ea-a6d3-9a26f8c3cba4',
			'title': 'Iran’s judiciary threatens to expel UK ambassador',
			'publishedDate': '2020-01-14T10:23:14.000Z'
		},
		{
			'id': 'dcac61ea-361c-11ea-a6d3-9a26f8c3cba4',
			'title': 'Iran’s regime loses the battle for public opinion',
			'publishedDate': '2020-01-14T10:00:27.000Z'
		},
		{
			'id': 'bf0752ee-3685-11ea-a6d3-9a26f8c3cba4',
			'title': 'Justin Trudeau partly blames US for Iran plane crash',
			'publishedDate': '2020-01-14T08:15:05.000Z'
		},
		{
			'id': '1d1527fa-356c-11ea-a6d3-9a26f8c3cba4',
			'title': 'Biden and Sanders reprise Iraq war fight in 2020 race',
			'publishedDate': '2020-01-13T11:00:26.000Z'
		},
		{
			'id': '6524b530-355b-11ea-a6d3-9a26f8c3cba4',
			'title': 'Esper ‘didn’t see’ specific evidence of embassy threat',
			'publishedDate': '2020-01-12T18:36:39.000Z'
		},
		{
			'id': '86df67f6-3524-11ea-a6d3-9a26f8c3cba4',
			'title': 'Lies over air crash shake Iran’s trust in its rulers',
			'publishedDate': '2020-01-12T16:29:11.000Z'
		},
		{
			'id': '37084c8c-3508-11ea-a6d3-9a26f8c3cba4',
			'title': 'Iran questions Revolutionary Guard over downing of airliner',
			'publishedDate': '2020-01-12T09:51:13.000Z'
		},
		{
			'id': 'b931cc22-3073-11ea-a329-0bcf87a328f2',
			'title': 'What next for oil as US-Iran tensions simmer?',
			'publishedDate': '2020-01-12T09:00:26.000Z'
		},
		{
			'id': '0e76e39a-3428-11ea-9703-eea0cae3f0de',
			'title': 'Iran admits it shot down Ukrainian jet',
			'publishedDate': '2020-01-12T05:35:29.000Z'
		}
	],
	'showSaveButtons': false,
	'latestItemsTime': null,
	'children': []
};
const groupedItems = [
	{
		'date': '2020-01-14',
		'title': 'Earlier Today',
		'items': [
			{
				'articleIndex': 0,
				'localisedLastUpdated': '2020-01-14T11:10:26.000+00:00',
				'id': '01f0b004-36b9-11ea-a6d3-9a26f8c3cba4',
				'title': 'Europeans step up pressure on Iran over nuclear deal',
				'publishedDate': '2020-01-14T11:10:26.000Z'
			},
			{
				'articleIndex': 1,
				'localisedLastUpdated': '2020-01-14T10:23:14.000+00:00',
				'id': '01eaf2fc-36ac-11ea-a6d3-9a26f8c3cba4',
				'title': 'Iran’s judiciary threatens to expel UK ambassador',
				'publishedDate': '2020-01-14T10:23:14.000Z'
			},
			{
				'articleIndex': 2,
				'localisedLastUpdated': '2020-01-14T10:00:27.000+00:00',
				'id': 'dcac61ea-361c-11ea-a6d3-9a26f8c3cba4',
				'title': 'Iran’s regime loses the battle for public opinion',
				'publishedDate': '2020-01-14T10:00:27.000Z'
			},
			{
				'articleIndex': 3,
				'localisedLastUpdated': '2020-01-14T08:15:05.000+00:00',
				'id': 'bf0752ee-3685-11ea-a6d3-9a26f8c3cba4',
				'title': 'Justin Trudeau partly blames US for Iran plane crash',
				'publishedDate': '2020-01-14T08:15:05.000Z'
			}
		]
	},
	{
		'date': '2020-01-13',
		'title': 'Yesterday',
		'items':
			[
				{
					'articleIndex': 4,
					'localisedLastUpdated': '2020-01-13T11:00:26.000+00:00',
					'id': '1d1527fa-356c-11ea-a6d3-9a26f8c3cba4',
					'title': 'Biden and Sanders reprise Iraq war fight in 2020 race',
					'publishedDate': '2020-01-13T11:00:26.000Z'
				}
			]
	},
	{
		'date': '2020-01-12',
		'title': 'January 12, 2020',
		'items': [
			{
				'articleIndex': 5,
				'localisedLastUpdated': '2020-01-12T18:36:39.000+00:00',
				'id': '6524b530-355b-11ea-a6d3-9a26f8c3cba4',
				'title': 'Esper ‘didn’t see’ specific evidence of embassy threat',
				'publishedDate': '2020-01-12T18:36:39.000Z'
			},
			{
				'articleIndex': 6,
				'localisedLastUpdated': '2020-01-12T16:29:11.000+00:00',
				'id': '86df67f6-3524-11ea-a6d3-9a26f8c3cba4',
				'title': 'Lies over air crash shake Iran’s trust in its rulers',
				'publishedDate': '2020-01-12T16:29:11.000Z'
			},
			{
				'articleIndex': 7,
				'localisedLastUpdated': '2020-01-12T09:51:13.000+00:00',
				'id': '37084c8c-3508-11ea-a6d3-9a26f8c3cba4',
				'title': 'Iran questions Revolutionary Guard over downing of airliner',
				'publishedDate': '2020-01-12T09:51:13.000Z'
			},
			{
				'articleIndex': 8,
				'localisedLastUpdated': '2020-01-12T09:00:26.000+00:00',
				'id': 'b931cc22-3073-11ea-a329-0bcf87a328f2',
				'title': 'What next for oil as US-Iran tensions simmer?',
				'publishedDate': '2020-01-12T09:00:26.000Z'
			},
			{
				'articleIndex': 9,
				'localisedLastUpdated': '2020-01-12T05:35:29.000+00:00',
				'id': '0e76e39a-3428-11ea-9703-eea0cae3f0de',
				'title': 'Iran admits it shot down Ukrainian jet',
				'publishedDate': '2020-01-12T05:35:29.000Z'
			}
		]
	}
];

describe.only('buildModel without custom slot content', () => {
	test('correctly builds model from props', () => {
		const result = buildModel({ ...props, timezoneOffset: 0, localTodayDate: '2020-01-14' });
		expect(result).toEqual(groupedItems);
	});
});

describe.only('buildModel with custom slot content', () => {
	test('returns correct model for custom slot in middle of first group', () => {
		const result = buildModel({
			...props,
			timezoneOffset: 0,
			localTodayDate: '2020-01-14',
			customSlotContent: { foo: 1 },
			customSlotPosition: 2
		});
		expect(result).toEqual([
			{
				...groupedItems[0],
				items: [groupedItems[0].items[0], groupedItems[0].items[1], { foo: 1 }, groupedItems[0].items[2], groupedItems[0].items[3]]
			},
			groupedItems[1],
			groupedItems[2]
		]);
	});
	test('returns correct model for custom slot at end of second group', () => {
		const result = buildModel({
			...props,
			timezoneOffset: 0,
			localTodayDate: '2020-01-14',
			customSlotContent: { foo: 1 },
			customSlotPosition: 5
		});
		expect(result).toEqual([
			groupedItems[0],
			{
				...groupedItems[1],
				items: [groupedItems[1].items[0], { foo: 1 }]
			},
			groupedItems[2]
		]);
	});
	test('returns correct model for custom slot off end of all groups', () => {
		const result = buildModel({
			...props,
			timezoneOffset: 0,
			localTodayDate: '2020-01-14',
			customSlotContent: { foo: 1 },
			customSlotPosition: 10
		});
		expect(result).toEqual([
			groupedItems[0],
			groupedItems[1],
			{
				...groupedItems[2],
				items: [...groupedItems[2].items, { foo: 1 }]
			}
		]);
	});
	test('returns correct model for custom slot in position 0', () => {
		const result = buildModel({
			...props,
			timezoneOffset: 0,
			localTodayDate: '2020-01-14',
			customSlotContent: { foo: 1 },
			customSlotPosition: 0
		});
		expect(result).toEqual([
			{
				...groupedItems[0],
				items: [{ foo: 1 }, groupedItems[0].items[0], groupedItems[0].items[1], groupedItems[0].items[2], groupedItems[0].items[3]]
			},
			groupedItems[1],
			groupedItems[2]
		]);
	});
});
