FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# Node.js 24 + pnpm + mcp-proxy (+ git to clone)
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates \
      curl \
      git \
    && curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g pnpm@10.14.0 mcp-proxy@6.2.0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app

# Pin to the commit you used in the logs (optional — remove checkout to track main)
RUN git clone https://github.com/KatoMato65/time-mcp.git . \
    && git checkout d23cca764fe317b4bcaf8cf41e0b5fffceda700c

# Install deps (no build step exists)
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

# Run the MCP server through mcp-proxy
CMD ["mcp-proxy", "node", "./index.js"]
