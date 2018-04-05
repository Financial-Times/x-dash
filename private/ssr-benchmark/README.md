# JSX Server-Side Rendering Benchmark

Time to render x-dash components with compatible runtimes. The runtimes currently included are:

- [Hyperapp](https://github.com/hyperapp/hyperapp)<sup>\*</sup>
- [Inferno](https://infernojs.org/)
- [Nerv](https://github.com/NervJS/nerv)
- [Preact](https://preactjs.com/)
- [Rax](https://alibaba.github.io/rax/)
- [React](https://reactjs.org/)
- [VHTML](https://github.com/developit/vhtml)<sup>†</sup>

Tests were run with [Apache Bench](https://httpd.apache.org/docs/2.4/programs/ab.html).

\* Usage of Hyperapp depends on the modification of higher-order components to accept `children` as a second argument rather than receiving them appended to `props`.

† The current release of the VHTML module has compatibility issues and is therefore not viable for production use without modifications.

## Installation

Requires Node.js and NPM to be installed. Once that is done, install the dependencies with:

```sh
$ npm install
```

You'll also need the [Apache Benchmarking Tool](https://httpd.apache.org/docs/2.4/programs/ab.html) to run the tests themselves. If you're on a device running MacOS this should be preinstalled.

## Running the benchmark

Currently the x-engine module requires configuring via `package.json` so each test must be run individually. Tests are run like so:

```sh
# start server
$ export NODE_ENV=production; node app.js

# run benchmark for target runtime
$ ab -k -n10000 -c50 http://127.0.0.1:3000/inferno
```
