import XLogo from '../index';
import React from 'react';

export const title = 'Logo';

export const fixture = XLogo.defaultProps;

export const stories = {
	'Logo' ({createProps}) {
		return <XLogo {...createProps(['seed'])} />
	}
}

export const knobs = (data, {text, number}) => {
	return {
		seed: text('Seed', data.seed),
		thickness: number('Thickness', data.thickness, {
			range: true,
			min: 0,
			max: 50,
			step: 1,
		}),
	};
}

export const module = module;
