#!/usr/bin/env node
// stdio bridge to the AI Agents Listing MCP server at https://aiagentslisting.com/api/mcp.
//
// Clients that speak Streamable HTTP should point at that URL directly; this
// exists for clients and sandboxes that only launch local stdio servers. It
// forwards tools unchanged, so it never drifts from the hosted server.
import { readFileSync } from 'node:fs';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const endpoint = new URL(process.env.AIAGENTSLISTING_MCP_URL || 'https://aiagentslisting.com/api/mcp');

// Connected on first use, not at startup: a client can initialize and list
// capabilities while offline, and a dropped connection is retried on the next call.
let remote = null;
async function upstream() {
    if (remote) return remote;
    const client = new Client({ name: 'aiagentslisting-mcp-stdio', version });
    client.onclose = () => { remote = null; };
    await client.connect(new StreamableHTTPClientTransport(endpoint));
    remote = client;
    return client;
}

const server = new Server(
    { name: 'aiagentslisting', title: 'AI Agents Listing', version, websiteUrl: 'https://aiagentslisting.com' },
    {
        capabilities: { tools: {} },
        instructions: 'AI Agents Listing is a directory of AI agents, MCP servers and agent skills. search_listings, discover, trending, new_launches, find_alternatives and compare read it without an account; submit_listing and submit_review need a signed-in connection, so use the hosted URL for those. Rankings are by engagement only; the featured flag marks paid listings and never moves them.',
    },
);

server.setRequestHandler(ListToolsRequestSchema, async (req) => (await upstream()).listTools(req.params));
server.setRequestHandler(CallToolRequestSchema, async (req) => (await upstream()).callTool(req.params));

await server.connect(new StdioServerTransport());
