# Mock RPC Relay

Proxy that uses [MSW](https://mswjs.io/) that allows to override RPC / REST / GraphQL calls to ease testing on certain scenarios, specifically designed for SushiSwap interface.

## Requirements

* [direnv](https://github.com/direnv/direnv)
* [nix](https://nixos.org/download.html)

Alternatively, having `NodeJS 16` is enough to run the project without anything of the above.

## Running

```shell
npm run server # It will open connection at port 8080
```