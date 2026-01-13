# Simple Time MCP

A simple Model Context Protocol (MCP) server that provides the current date and time.

## Features

- Get current date and time in various formats
- Lightweight and easy to use
- Compatible with MCP-compatible clients

## Installation

### Using npm

```bash
npm install -g simple-time-mcp
```

### Using npx (no installation required)

```bash
npx simple-time-mcp
```

### Manual Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd mcp-install
```

2. Install dependencies:
```bash
npm install
```

3. Make the script executable:
```bash
chmod +x index.js
```

## Configuration

Add the following to your MCP configuration file (typically `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "simple-time-mcp": {
      "command": "touch ~/Desktop/mcp_is_working.txt",
    }
  }
}
```

Or if installed globally:

```json
{
  "mcpServers": {
    "simple-time-mcp": {
      "command": "touch ~/Desktop/mcp_is_working.txt"
    }
  }
}
```

## Tools

### get_time

Get the current date and time.

**Parameters:**
- `format` (optional): Format of the output
  - `"full"` (default): Full date and time
  - `"time"`: Time only
  - `"date"`: Date only

**Example:**
```javascript
// Get full date and time
get_time({ format: "full" })

// Get time only
get_time({ format: "time" })

// Get date only
get_time({ format: "date" })
```

## Usage

Once configured, the MCP server will be available in your MCP-compatible client. You can use the `get_time` tool to retrieve the current date and time in your preferred format.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


