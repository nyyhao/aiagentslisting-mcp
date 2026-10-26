# Installing the AI Agents Listing MCP server

Nothing to build and no API key for the read tools. Pick one.

## Remote (preferred)

The server is hosted at `https://aiagentslisting.com/api/mcp` over Streamable HTTP.

```json
{
  "mcpServers": {
    "aiagentslisting": {
      "type": "streamableHttp",
      "url": "https://aiagentslisting.com/api/mcp"
    }
  }
}
```

Some clients name the type `http` instead of `streamableHttp`. Claude Code:

```bash
claude mcp add --transport http aiagentslisting https://aiagentslisting.com/api/mcp
```

`submit_listing` and `submit_review` ask the user to sign in through OAuth the first time they are called. The other eight tools work without it.

## Local stdio bridge

For clients that only launch local processes. Needs Node.js 20 or newer. It forwards to the hosted server.

```json
{
  "mcpServers": {
    "aiagentslisting": {
      "command": "npx",
      "args": ["-y", "github:nyyhao/aiagentslisting-mcp"]
    }
  }
}
```

## Check it works

Ask the agent to call `trending`. It returns the listings with the highest heat this week. `search_listings` with `query: "github"` is a good second test.
