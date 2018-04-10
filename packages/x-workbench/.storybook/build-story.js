import React from 'react';
import BuildService from './build-service';
import { storiesOf } from '@storybook/react';
import * as knobsAddon from '@storybook/addon-knobs/react';

/**
 * Create Props
 * @param {{ [key: string]: any }} defaultData
 * @param {String[]} allowedKnobs
 * @param {Function} hydrateKnobs
 */
function createProps(defaultData, allowedKnobs, hydrateKnobs) {
	// Inject knobs add-on into given dependency container
	const knobs = hydrateKnobs(defaultData, knobsAddon);
	// Mix the available knob props into default data
	const mixedProps = { ...defaultData, ...knobs };

	return allowedKnobs.reduce((map, prop) => {
		if (mixedProps.hasOwnProperty(prop)) {
			const value = mixedProps[prop];

			// Knobs are functions which need calling to register them
			if (typeof value === 'function') {
				map[prop] = value();
			} else {
				map[prop] = value;
			}
		}

		return map;
	}, {});
}

/**
 * Build Story
 * @param {String} name
 * @param {{ [key: string]: string }} dependencies
 * @param {Function} component
 * @param {Function} knobs
 * @param {{ title: String, data: {}, knobs: String[], m: module }} story
 */
function buildStory (name, dependencies, component, knobs, story) {
	const storybook = storiesOf(name, story.m);

	storybook.addDecorator(knobsAddon.withKnobs);

	storybook.add(story.title, () => {
		const props = createProps(story.data, story.knobs, knobs);

		return (
			<div class="story-container">
				<BuildService dependencies={dependencies} />
				{component(props)}
			</div>
		);
	});

	return storybook;
}

export default buildStory;
