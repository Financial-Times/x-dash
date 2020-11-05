import React from 'react'
import { storiesOf } from '@storybook/react'
import { Increment } from '../src/Increment'

storiesOf('x-increment', module)
	.add('Sync', () => {
		const data = {
			count: 1,
			id: 'base-increment-static-id'
		}

		return <Increment {...data} />
	})
	.add('Async', () => {
		const data = {
			count: 1,
			timeout: 1000,
			id: 'base-increment-static-id'
		}

		return <Increment {...data} />
	})
