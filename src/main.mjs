import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const server = new McpServer({
  name: 'echo-server',
  version: '1.0.0',
})

server.registerTool(
  'echo',
  {
    title: 'Echo Tool',
    description: 'Echoes back the provided message',
    inputSchema: { message: z.string() },
  },
  async ({ message }) => ({
    content: [{ type: 'text', text: `Tool echo: ${message}` }],
  }),
)

const transport = new StdioServerTransport()
await server.connect(transport)
