<h1 align="center">
	<img src="https://user-images.githubusercontent.com/271645/38416861-1e6c6202-398e-11e8-907c-8c199a03988a.png" width="200" alt="x-dash"><br>
	x-dash
</h1>

## What is this?

x-dash is an experiment in building new shared frontend components for FT.com and the FT Apps. An detailed introduction is available in [Google Slides][slides].

[slides]: https://docs.google.com/presentation/d/1Z8mGsv4JU2TafNPIHw2RcejoNp7AN_v4LfCCGC7qrgw/edit?usp=sharing

### How is that not Origami?

Origami components are designed to work across the whole of FT and our sub-brands, making as few assumptions as possible about the tech stack that will be consuming them. Origami components don't contain templating, only styles and behaviour. It's up to each individual app to produce markup for components.

x-dash aims to complement Origami by providing easily reusable and composable templates, flexibly enough to work across Next and Apps apps.

## Developer guide

This is a [Lerna](https://github.com/lerna/lerna) monorepo. To get started hacking on x-dash, clone it and `npm install` as usual, and Lerna will install and link together all the individual packages.

To add a new package, run `npm run add-package -- package-name`.
