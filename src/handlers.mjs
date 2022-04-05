import { ethers } from 'ethers'
import { rest } from 'msw'
import fetch from 'node-fetch'

const RELAY = 'https://api.sushirelay.com/v1'
const ORIGIN = 'https://app.sushi.com'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST',
  'Access-Control-Allow-Headers':
    'Accept,Accept-Encoding,Accept-Language,Access-Control-Request-Headers,Access-Control-Request-Method,Authorization,Cache-Control,Content-Type,Connection,DNT,Host,If-Modified-Since,Origin,Referer,Keep-Alive,User-Agent,X-CustomHeader,X-Requested-With,X-Manifold-Signature',
}

const METHOD_HANDLER = new Map()
METHOD_HANDLER.set('*', handleAllMethods)
METHOD_HANDLER.set('eth_sendRawTransaction', handleEthSendRawTransaction)
METHOD_HANDLER.set('manifold_transactionStatus', handleManifoldTransactionStatus)

function handleAllMethods(req, res, ctx) {
  console.log(`message="Incoming request" batch-req=${batchReq} proxied=true body=`, req.body)
  return fetch(RELAY, {
    headers: { 'Content-Type': 'application/json', origin: ORIGIN },
    method: 'POST',
    body: req.body,
  })
}

function handleEthSendRawTransaction(req, res, ctx) {
  const [rawTx] = req.body.params
  const tx = ethers.utils.parseTransaction(rawTx)

  console.log(`message="Incoming request" method=${req.body.method} tx=`, tx)

  return res(ctx.status(200), ctx.set(CORS), ctx.json({ jsonrpc: '2.0', id: req.body.id, result: tx.hash }))
}

async function handleManifoldTransactionStatus(req, res, ctx) {
  const [hash, state = 'chain-inclusion'] = req.body.params

  console.log(`message="Incoming request" method=${req.body.method} hash=${hash} state=${state}`)

  let json = undefined

  switch (state) {
    case 'chain-inclusion':
    case 'relayed-ok':
    case 'relayed-not-ok':
    case 'received':
    case 'empty-events':
      const raw = (await import(`../data/manifold_transactionStatus/${state}.json`, { assert: { type: 'json' } }))
        .default
      const replaced = JSON.stringify(raw).replaceAll('<REPLACE_TX_HASH>', hash).replaceAll('<REPLACE_DATE>', new Date().toISOString())
      json = JSON.parse(replaced)
      break
    case 'tx-status-not-found':
      json = (await import(`../data/manifold_transactionStatus/${state}.json`, { assert: { type: 'json' } })).default
      break
    case '500': // Internal Server Error
      return res(ctx.status(state), ctx.set(CORS))
  }

  return res(ctx.status(200), ctx.set(CORS), ctx.json(json))
}

export default [
  // handles CORS preflight
  rest.options('/*', (req, res, ctx) => res(ctx.status(204), ctx.set(CORS))),

  // handles RPC
  rest.post(
    '/',
    (req, res, ctx) =>
      METHOD_HANDLER.has(req.body.method)
        ? METHOD_HANDLER.get(req.body.method)(req, res, ctx)
        : METHOD_HANDLER.get('*')(req, res, ctx) // get default handler otherwise
  ),
]
