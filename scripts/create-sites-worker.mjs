import { mkdir, writeFile } from "node:fs/promises";

await mkdir("dist/server", { recursive: true });
await writeFile(
  "dist/server/index.js",
  `export default {
  async fetch(request, env) {
    let response = await env.ASSETS.fetch(request);
    if (response.status === 404 && request.method === "GET") {
      const fallback = new URL("/index.html", request.url);
      response = await env.ASSETS.fetch(new Request(fallback, request));
    }
    return response;
  },
};
`,
);
