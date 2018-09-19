const data = {
	layout: 'full-bleed-image-left',
	headline: 'What makes a great surgeon? Two of Britain’s best discuss',
	standfirst: 'Henry Marsh and Stephen Westaby on ‘100 per cent mortality’, the embattled NHS and why self-deception is a clinical skill',
	mainLink: {
		id: '6b32f2c1-da43-4e19-80b9-8aef4ab640d7',
		type: 'TOPIC',
		prefLabel: 'Life & Arts',
		url: 'https://www.ft.com/life-art'
	},
	leadImages: [
		{
			width: 490,
			description: '...',
			aspectRatio: 1,
			title: "",
			type: "square",
			url: "http://prod-upp-image-read.ft.com/194b5a92-9486-11e7-a9e6-11d2f0ebb7f0",
			height: null,
			ratio: 1
		},
		{
			width: 1220,
			description: '...',
			aspectRatio: 1,
			title: "",
			type: "wide",
			url: "http://prod-upp-image-read.ft.com/37f4c8fc-9486-11e7-a9e6-11d2f0ebb7f0",
			height: null,
			ratio: 1
		},
		{
			copyright: '',
			width: 2048,
			description: '...',
			aspectRatio: 0.5625,
			title: '',
			type: 'standard',
			url: 'http://prod-upp-image-read.ft.com/37f4c8fc-9486-11e7-a9e6-11d2f0ebb7f0',
			height: 1152,
			ratio: 1.77778
		},
	]
};

exports.title = 'Full Bleed Article Image';
exports.data = data;
exports.knobs = Object.keys(data);
exports.m = module;


/*
490px http://prod-upp-image-read.ft.com/194b5a92-9486-11e7-a9e6-11d2f0ebb7f0
1220px http://prod-upp-image-read.ft.com/37f4c8fc-9486-11e7-a9e6-11d2f0ebb7f0
1220px http://prod-upp-image-read.ft.com/13d2136c-9486-11e7-a9e6-11d2f0ebb7f0
http://prod-upp-image-read.ft.com/37f4c8fc-9486-11e7-a9e6-11d2f0ebb7f0
*/
