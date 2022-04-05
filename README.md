# Mock RPC Relay

Proxy that uses [MSW](https://mswjs.io/) that allows to override RPC / REST / GraphQL calls to ease testing on certain scenarios, specifically designed for SushiSwap interface.

## Requirements

* [direnv](https://github.com/direnv/direnv)
* [nix](https://nixos.org/download.html)

Alternatively, having `NodeJS 16` is enough to run the project without anything of the above.

## Running

It will open connection at port 8080

```shell
npm run server 
```

> Note: for ipv6, use [http://[::1]:8080](http://[::1]:8080)

## License

 Copyright 2021 CommodityStream LLC

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
