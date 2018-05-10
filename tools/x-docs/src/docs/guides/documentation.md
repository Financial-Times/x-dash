# Documentation

The documentation you're reading right now is generated from Markdown files around the monorepo, as well as various dynamic pages that are built from React components.

`x-docs` uses the static site generator [Gatsby](https://gatsbyjs.org). You don't need to learn Gatsby to get started writing documentation.

## Running the documentation site locally

The documentation site runs with the rest of the development server on [`localhost:8000`](http://localhost:8000). When you start the server from `npm start`, it asks if you want to open the documentation or the component explorer in the browser, but it will be running even if you selected component explorer. As a shortcut to running the development server and opening the documentation in the browser, you can run `npm start -- start --open=docs`.

## Markdown processing

A Markdown file from any package in the monorepo will be included if it's in a folder called `docs` or `src/docs` (including nested subfolders). Each package's `readme.md` will also be included. The file paths will be turned into URLs as follows:

| Path                                   | URL                             |
| -------------------------------------- | ------------------------------- |
| `packages/x-foo/readme.md`             | `/packages/x-foo`               |
| `packages/x-foo/docs/path/to/index.md` | `/packages/x-foo/path/to`       |
| `packages/x-foo/docs/path/to/foo.md`   | `/packages/x-foo/path/to/foo`   |
| `components/x-bar/docs/path/to/bar.md` | `/components/x-bar/path/to/bar` |
| `tools/x-docs/src/docs/path/to/foo.md` | `/path/to/foo`                  |

That is, `docs`, `src/docs`, `index.md`, `readme.md` and `tools/x-docs` are removed from the path.

If you create a Markdown file that would have the same URL as another file, Gatsby will output a warning to the console, and only one of the files will be available as a page. Which file is chosen is not clearly defined and may not be the same every time, so this situation should be avoided.
