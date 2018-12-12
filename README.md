**Note: THE FILECOIN PROJECT IS STILL EXTREMELY CONFIDENTIAL. Do not share or discuss the project outside of designated preview channels (chat channels, Discourse forum, GitHub, emails to Filecoin team), not even with partners/spouses/family members. If you have any questions, please email [legal@protocol.ai](mailto:legal@protocol.ai).**

# Filecoin Explorer (filecoin-explorer)

[![CircleCI](https://circleci.com/gh/filecoin-project/filecoin-explorer.svg?style=svg&circle-token=3b2c3a7a34d3e6927d9f49d518e9228478c72911)](https://circleci.com/gh/filecoin-project/filecoin-explorer)

> Filecoin block explorer

An open source Filecoin block explorer written in JavaScript.

## Table of Contents

- [Development](#development)
  - [Install Node](#install-node)
  - [Clone](#clone)
  - [Install Dependencies](#install-dependencies)
  - [Launch the Development Server](#launch-the-development-server)
  - [Linting](#linting)
- [Usage](#usage)
  - [Start a Filecoin Node](#start-a-filecoin-node)
  - [Launch the JavaScript Client](#launch-the-javascript-client)
- [Contribute](#contribute)
- [License](#license)

## Development

Check the docs for [`create-react-app`](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md)

### Install Node

The build process for filecoin-explorer requires at least Node version 8.0.0, which you can download [here][1].

### Clone

```sh
> git clone git@github.com:filecoin-project/filecoin-explorer.git
```

### Install Dependencies

filecoin-explorer's dependencies are managed by Yarn, which you can download [here][2]. To install filecoin-explorer's
build and development dependencies, run:

```sh
> cd filecoin-explorer
> yarn install
```

### Launch the Development Server

During development, the filecoin-explorer is served from a locally running [webpack-dev-server][6]. The development
server is configured to automatically reload source files as they are changed. To launch the server, run:

```sh
> yarn start
```

#### Important: Access-Control-Allow-Origin Headers

By default, HTTP responses from the go-filecoin node will have their [`Access-Control-Allow-Origin`][5] header set to
`http://localhost:8080`. If want to serve the filecoin-explorer from a different host or port, you'll need to
reconfigure the go-filecoin daemon accordingly.

### Linting

This project uses [StandardJS][7] for linting and code-formatting. To use StandardJS, run:

```sh
> yarn lint
```

If you want starndard to fix your issues for you, run:

```sh
> yarn lint-fix
```

## Usage

### Start a Filecoin Node

The Filecoin Explorer JavaScript application communicates via HTTP requests with a locally-running Filecoin node. For
instructions on building a Filecoin node, review the [go-filecoin README][4]. Then, run:

```sh
> ./go-filecoin daemon
```

### Launch the JavaScript Client

With the development server running (see _Launch the Development Server_, above), open your web browser and navigate to
[http://localhost:8080](http://localhost:8080). From here, you can explore the Filecoin blockchain.

## Contribute

See [the contribute file](CONTRIBUTING.md).

If editing the readme, please conform to the [standard-readme][3] specification.

[1]: https://nodejs.org/en/download/releases/
[2]: https://yarnpkg.com/en/docs/install
[3]: https://github.com/RichardLitt/standard-readme
[4]: https://github.com/filecoin-project/go-filecoin
[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[6]: https://github.com/webpack/webpack-dev-server
[7]: https://github.com/standard/standard

## License

The Filecoin Project is dual-licensed under Apache 2.0 and MIT terms:

- Apache License, Version 2.0, ([LICENSE-APACHE](https://github.com/filecoin-project/filecoin-explorer/blob/master/LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license ([LICENSE-MIT](https://github.com/filecoin-project/filecoin-explorer/blob/master/LICENSE-MIT) or http://opensource.org/licenses/MIT)
