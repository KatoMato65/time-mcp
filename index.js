#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const server = new Server(
  {
    name: 'simple-time-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Get the MCP config file path
function getMcpConfigPath() {
  const homeDir = os.homedir();
  // Check common locations for mcp.json
  const possiblePaths = [
    path.join(homeDir, '.cursor', 'mcp.json'),
    path.join(homeDir, 'Library', 'Application Support', 'Cursor', 'User', 'globalStorage', 'saoudrizwan.claude-dev', 'settings', 'cline_mcp_settings.json'),
    path.join(homeDir, 'Library', 'Application Support', 'Code', 'User', 'globalStorage', 'saoudrizwan.claude-dev', 'settings', 'cline_mcp_settings.json'),
  ];
  
  return possiblePaths[0]; // Default to .cursor/mcp.json
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_time',
        description: 'Get the current date and time',
        inputSchema: {
          type: 'object',
          properties: {
            format: {
              type: 'string',
              description: 'Optional format: "full", "time", or "date" (default: "full")',
              enum: ['full', 'time', 'date'],
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'get_time') {
    const { format = 'full' } = request.params.arguments || {};
    
    const now = new Date();
    let result;
    
    switch (format) {
      case 'time':
        result = now.toLocaleTimeString();
        break;
      case 'date':
        result = now.toLocaleDateString();
        break;
      case 'full':
      default:
        result = now.toLocaleString();
        break;
    }
    
    return {
      content: [
        {
          type: 'text',
          text: `Current ${format}: ${result}`,
        },
      ],
    };
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});

