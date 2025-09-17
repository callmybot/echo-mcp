import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

const transport = new StdioClientTransport({
  command: 'node',
  args: ['./src/main.mjs'],
})

const client = new Client({
  name: 'example-client',
  version: '1.0.0',
})

await client.connect(transport)

console.log(await client.listTools())

const result = await client.callTool({
  name: 'echo',
  arguments: {
    message: 'Hello!',
  },
})

console.log(result)

await client.close()
