import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "readytodev-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler("tools/list", async () => {
  return {
    tools: [
      {
        name: "get_products",
        description: "Get list of all products in the portfolio",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_product_details",
        description: "Get detailed information about a specific product",
        inputSchema: {
          type: "object",
          properties: {
            slug: {
              type: "string",
              description: "The product slug",
            },
          },
          required: ["slug"],
        },
      },
    ],
  };
});

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_products") {
    // Return list of products
    return {
      content: [
        {
          type: "text",
          text: "Products: product-01, product-02, product-03, product-04",
        },
      ],
    };
  } else if (name === "get_product_details") {
    const slug = args.slug;
    // Mock data - in real implementation, read from JSON or files
    return {
      content: [
        {
          type: "text",
          text: `Details for ${slug}: This is a fictional product with documentation and demo. Status: prototype, Category: devtools.`,
        },
      ],
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP server running on stdio");