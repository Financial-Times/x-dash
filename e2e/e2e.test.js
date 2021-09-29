/**
 * @jest-environment node
 */

const { h } = require('@financial-times/x-engine') // required for <GreetingComponent>
const { Serialiser, HydrationData } = require('@financial-times/x-interaction')
const puppeteer = require('puppeteer')
const ReactDOMServer = require('react-dom/server')
const express = require('express')
import React from 'react'
import { GreetingComponent } from './common'

describe('x-interaction-e2e', () => {
	let browser
	let page
	let app
	let server

	beforeAll(async () => {
		app = express()
		server = app.listen(3004)
		app.use(express.static(__dirname))
		browser = await puppeteer.launch()
		page = await browser.newPage()
	})

	it('attaches the event listener to SSR components on hydration', async () => {
		const ClientComponent = () => {
			// main.js is the transpiled version of index.js, which contains the registered GreetingComponent, and invokes hydrate
			return <script type="module" src="./main.js" charset="utf-8"></script>
		}

		const serialiser = new Serialiser()
		const htmlString = ReactDOMServer.renderToString(
			<>
				<GreetingComponent serialiser={serialiser} />
				<HydrationData serialiser={serialiser} />
				<ClientComponent />
			</>
		)

		app.get('/', (req, res) => {
			res.send(htmlString)
		})

		// go to page and click button
		await page.goto('http://localhost:3004')
		await page.waitForSelector('.greeting-button')
		await page.click('.greeting-button')
		const text = await page.$eval('.greeting-text', (e) => e.textContent)
		expect(text).toContain('hello world')
	})

	afterAll(async () => {
		try {
			;(await browser) && browser.close()
			await server.close()
		} catch (e) {
			console.log(e)
		}
	})
})
