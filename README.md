# AI Agents Listing MCP server

An MCP server for [AI Agents Listing](https://aiagentslisting.com), a directory of AI agents, MCP servers and agent skills. Your agent can search the directory, browse it by category, pricing and access model, see what is trending, find alternatives to a product and compare listings side by side.

- **Remote:** `https://aiagentslisting.com/api/mcp` (Streamable HTTP). Read tools need no account and no API key.
- **Stdio:** `npx -y github:nyyhao/aiagentslisting-mcp` for clients that only run local servers. It forwards to the hosted server.
- **Auth:** only `submit_listing` and `submit_review` need a signed-in user, over OAuth with a consent screen. Connect to the remote URL for those; the stdio bridge is read-only in practice.

Full docs: [aiagentslisting.com/mcp](https://aiagentslisting.com/mcp)

## Install

**Claude Code**

```bash
claude mcp add --transport http aiagentslisting https://aiagentslisting.com/api/mcp
```

**Claude Desktop, Cursor, Windsurf, VS Code and other clients with `mcpServers` JSON**

```json
{
  "mcpServers": {
    "aiagentslisting": {
      "type": "http",
      "url": "https://aiagentslisting.com/api/mcp"
    }
  }
}
```

**Stdio-only clients**

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

## Tools

| Tool | Auth | What it does |
| --- | --- | --- |
| `search_listings` | none | Searches published AI agents, MCP servers and skills by name, tagline or description, optionally filtered by type. |
| `get_listing` | none | One listing in full by slug: description, links, categories, pricing and access model. |
| `discover` | none | Browses by vertical, category, pricing model, access model and industry. For asks like "open-source MCP servers for databases" or "free coding agents". |
| `trending` | none | Listings gaining momentum, ranked by heat (a 0-100 engagement score), upvotes or new reviews over a rolling window. |
| `new_launches` | none | The most recently published listings. |
| `find_alternatives` | none | Alternatives to a product, by slug, website URL or name. Works for products that are not listed too: the closest listings by topic come back. |
| `compare` | none | 2-5 listings side by side on pricing, access model, categories, heat, upvotes and rating. |
| `list_categories` | none | Category ids a submission can be filed under. |
| `submit_listing` | OAuth | Submits a product on behalf of the connected user. It enters the same human review queue as a web submission. |
| `submit_review` | OAuth | Leaves a 1-5 star review on a listing for the connected user, labeled on the page as agent-submitted. |

Rankings are by community engagement only. Paid listings carry a `featured` flag and never get a better position for it.

## Try it

> What MCP servers for Postgres are trending this week?

> Find open-source alternatives to Cursor and compare the top three.

> Which free coding agents were listed in the last 14 days?

## Self-check

```bash
curl -s https://aiagentslisting.com/api/mcp \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  -H 'mcp-protocol-version: 2025-06-18' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## License

MIT for this bridge. The directory data is served by aiagentslisting.com and is not part of this repository.
