const { presets } = require('@financial-times/x-teaser');

module.exports = [
    {
        type: 'article',
        id: '',
        url: '#',
        title: 'Inside charity fundraiser where hostesses are put on show',
        alternativeTitle: 'Men Only, the charity fundraiser with hostesses on show',
        standfirst: 'FT investigation finds groping and sexual harassment at secretive black-tie dinner',
        alternativeStandfirst: 'Groping and sexual harassment at black-tie dinner charity event',
        publishedDate: '2018-01-23T15:07:00.000Z',
        firstPublishedDate: '2018-01-23T13:53:00.000Z',
        conceptPrefix: '',
        conceptSuffix: '',
        concept: {
            url: '#',
            prefLabel: 'Sexual misconduct allegations'
        },
        alternativeConcept: {
            url: '#',
            prefLabel: 'FT Investigations'
        },
        image: {
            url: 'http://prod-upp-image-read.ft.com/a25832ea-0053-11e8-9650-9c0ad2d7c5b5',
            width: 2048,
            height: 1152
        },
        indicators: {},
        ...presets.SMALL_HEAVY
    },
    {
        type: 'article',
        id: '',
        url: '#',
        title: 'Inside charity fundraiser where hostesses are put on show',
        alternativeTitle: 'Men Only, the charity fundraiser with hostesses on show',
        standfirst: 'FT investigation finds groping and sexual harassment at secretive black-tie dinner',
        alternativeStandfirst: 'Groping and sexual harassment at black-tie dinner charity event',
        publishedDate: '2018-01-23T15:07:00.000Z',
        firstPublishedDate: '2018-01-23T13:53:00.000Z',
        conceptPrefix: '',
        conceptSuffix: '',
        concept: {
            url: '#',
            prefLabel: 'Sexual misconduct allegations'
        },
        alternativeConcept: {
            url: '#',
            prefLabel: 'FT Investigations'
        },
        image: {
            url: 'http://prod-upp-image-read.ft.com/a25832ea-0053-11e8-9650-9c0ad2d7c5b5',
            width: 2048,
            height: 1152
        },
        related: [
            {
                id: '',
                url: '#',
                type: 'article',
                title: 'Removing the fig leaf of charity'
            },
            {
                id: '',
                url: '#',
                type: 'article',
                title: 'A dinner that demeaned both women and men'
            },
            {
                id: '',
                url: '#',
                type: 'video',
                title: 'PM speaks out after Presidents Club dinner'
            }
        ],
        ...presets.TOP_STORY_LANDSCAPE
    },
    {
        type: 'video',
        // The ID is required for the in-situ video demo to work
        id: '0e89d872-5711-457b-80b1-4ca0d8afea46',
        url: '#',
        title: 'FT View: Donald Trump, man of steel',
        standfirst: 'The FT\'s Rob Armstrong looks at why Donald Trump is pushing trade tariffs',
        publishedDate: '2018-03-26T08:12:28.137Z',
        firstPublishedDate: '2018-03-26T08:12:28.137Z',
        conceptPrefix: '',
        conceptSuffix: '02:51min',
        concept: {
            url: '#',
            prefLabel: 'Global Trade'
        },
        alternativeConcept: {
            url: '#',
            prefLabel: 'US'
        },
        image: {
            url: 'http://com.ft.imagepublish.upp-prod-eu.s3.amazonaws.com/a27ce49b-85b8-445b-b883-db6e2f533194',
            width: 1920,
            height: 1080
        },
        video: {
            url: 'https://next-media-api.ft.com/renditions/15218247321960/640x360.mp4',
            width: 640,
            height: 360,
            mediaType: 'video/mp4'
        },
        ...presets.HERO_INLINE_VIDEO
    },
    {
        type: 'paid-post',
        id: '',
        url: '#',
        title: 'Why eSports companies are on a winning streak',
        standfirst: 'ESports is big business and about to get bigger: global revenues could hit $1.5bn by 2020',
        promotedPrefix: 'Paid post',
        promotedSuffix: 'by UBS',
        image: {
            url: 'https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKCrm_3yahABGAEyCMx3RoLss603',
            width: 700,
            height: 394
        },
        ...presets.SMALL_LIGHT
    }
];
