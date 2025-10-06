// lib/ai/tools/tool-agents.ts
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import type { Tool } from 'ai';
import { z } from 'zod';
import { DEFAULT_SERVER_URLS, type ChatAgentId } from '@/lib/agents-config';

const convertToZodSchema = (inputSchema: any): z.ZodSchema => {
  if (!inputSchema || typeof inputSchema !== 'object') {
    return z.object({});
  }

  const properties = inputSchema.properties || {};
  const required = inputSchema.required || [];
  
  const zodFields: Record<string, z.ZodSchema> = {};
  
  for (const [key, prop] of Object.entries(properties)) {
    const property = prop as any;
    let zodType: z.ZodSchema;
    
    switch (property.type) {
      case 'string':
        zodType = z.string();
        break;
      case 'number':
        zodType = z.number();
        break;
      case 'boolean':
        zodType = z.boolean();
        break;
      case 'array':
        zodType = z.array(z.any());
        break;
      default:
        zodType = z.any();
    }
    
    if (property.description) {
      zodType = zodType.describe(property.description);
    }
    
    if (!required.includes(key)) {
      zodType = zodType.optional();
    }
    
    zodFields[key] = zodType;
  }
  
  return z.object(zodFields);
};

async function getTool(serverUrl: string) {
  const mcpClient = new Client(
    { name: 'WebClient', version: '1.0.0' },
    { capabilities: { tools: {}, resources: {}, prompts: {} } },
  );

  const transport = new StreamableHTTPClientTransport(
    new URL(serverUrl),
    {} // headers
  );

  await mcpClient.connect(transport);
  console.log('MCP client connected to:', serverUrl);

  let toolsResponse;
  try {
    toolsResponse = await mcpClient.listTools();
  } catch (error) {
    console.error('Error discovering tools:', error);
    toolsResponse = { tools: [] };
  }

  const toolObject = toolsResponse.tools.reduce(
    (acc: { [key: string]: Tool }, tool: any) => {
      acc[tool.name] = {
        description: tool.description || `Execute ${tool.name}`,
        parameters: convertToZodSchema(tool.inputSchema),
        execute: async (args: any) => {
          try {
            const result = await mcpClient.callTool({
              name: tool.name,
              arguments: args,
            });
            return result;
          } catch (error) {
            console.error(`Error executing tool ${tool.name}:`, error);
            throw error;
          }
        },
      };
      return acc;
    },
    {} as { [key: string]: Tool },
  );

  return toolObject;
}

export const getTools = async (
  agentId?: ChatAgentId,
  overrideUrl?: string
): Promise<{ [key: string]: Tool }> => {
  const resolveUrl = (id: ChatAgentId) =>
    overrideUrl ?? DEFAULT_SERVER_URLS.get(id) ?? '';

  if (!agentId || agentId === 'all') {
    // Connect to all agents
    const urls = Array.from(DEFAULT_SERVER_URLS.keys()).map((id) =>
      resolveUrl(id),
    );
    const toolsByAgent = await Promise.all(urls.map(getTool));
    
    return toolsByAgent.reduce(
      (all: Record<string, Tool>, tools: { [key: string]: Tool }, idx: number) => {
        const id = Array.from(DEFAULT_SERVER_URLS.keys())[idx];
        Object.entries(tools).forEach(([toolName, tool]) => {
          all[`${id}-${toolName}`] = tool;
        });
        return all;
      },
      {} as Record<string, Tool>,
    );
  }

  const serverUrl = resolveUrl(agentId);
  if (!serverUrl) {
    console.error(`No server URL configured for agent "${agentId}"`);
    return {};
  }
  
  return getTool(serverUrl);
};