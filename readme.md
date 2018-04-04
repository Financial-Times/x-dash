<h1 align="center">
	<img src="https://avatars2.githubusercontent.com/t/2642512?s=280&v=4" width="140" alt="x-dash"><br>
	x-dash
</h1>

## What is this?

x-dash is an experiment in building new shared frontend components for FT.com and the FT Apps.

### How is that not Origami?

Origami components are designed to work across the whole of FT and our sub-brands, making as few assumptions as possible about the tech stack that will be consuming them. Origami components don't contain templating, just styles and behaviour. It's up to each individual app to produce markup for components.

x-dash aims to complement Origami by providing easily reusable and composable templates, flexibly enough to work across Next and Apps apps.

## Developer guide

This is a [Lerna](https://github.com/lerna/lerna) monorepo. To get started hacking on x-dash, clone it and `make install` as usual. Lerna will install and link together all the individual packages.

To add a new package, run `npm run add-package -- package-name`.
