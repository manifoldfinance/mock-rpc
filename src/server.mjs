import { createServer } from '@mswjs/http-middleware'
import handlers from './handlers.mjs'

const server = createServer(...handlers)

console.log('Server listening at port 8080!')
server.listen(8080)