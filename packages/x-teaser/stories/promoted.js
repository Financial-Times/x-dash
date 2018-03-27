const { Teaser } = require('../');
const h = require('@financial-times/x-engine');

exports.title = 'Teaser';

exports.fixture = {
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
	}
};

exports.stories = {

	PaidPost ({ createProps }) {
		const props = createProps([
			// Core content
			'id',
			'url',
			'type',
			'title',
			'standfirst',
			'promotedPrefix',
			'promotedSuffix',
			'image',
			// Features
			'showMeta',
			'showTitle',
			'showStandfirst',
			'showImage',
			// Feature options
			'imageSize'
		]);

		return <Teaser {...props} layout='small' />;
	}
};

exports.knobs = require('./knobs');

exports.module = module;
