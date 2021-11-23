import React from 'react'
import { Increment } from '../src/Increment'

export default {
	title: 'x-increment'
}

export const Sync = () => {
	const data = {
		count: 1,
		id: 'base-increment-static-id'
	}

	return <Increment {...data} />
}

export const Async = () => {
	const data = {
		count: 1,
		timeout: 1000,
		id: 'base-increment-static-id'
	}

	return <Increment {...data} />
}
