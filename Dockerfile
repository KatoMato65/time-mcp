FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# System deps + Node.js + pnpm + mcp-proxy
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates \
      curl \
      git \
    && curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g pnpm@10.14.0 mcp-proxy@6.1.10 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app

# Clone the repo
RUN git clone https://github.com/KatoMato65/time-mcp.git .

# Install runtime deps
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

# Some MCP repos rely on the script being executable (yours defines it as a bin)
RUN chmod +x ./index.js || true

# Run via mcp-proxy (as in your build spec)
CMD ["mcp-proxy", "node", "./index.js"]
