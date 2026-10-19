/**
 * Cloudflare Workers Builds deployment entrypoint.
 *
 * In Workers Builds -> Settings -> Variables and Secrets, configure:
 *   IP_HASH_KEY     (Secret)
 *   ADMIN_PASSWORD  (Secret)
 * Deploy command: node scripts/deploy.mjs
 *
 * Never print secret values or commit them to the repository.
 */
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const names = ["IP_HASH_KEY", "ADMIN_PASSWORD"];
const missing = names.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(
    "Missing Cloudflare BUILD secrets: " + missing.join(", ") + ".\n" +
    "Add these under Workers & Pages -> k-net -> Settings -> Builds -> Variables and Secrets " +
    "(not only Runtime Variables and Secrets), then redeploy.\n" +
    "Build deploy command must be: node scripts/deploy.mjs"
  );
  process.exit(1);
}

const dir = await mkdtemp(join(tmpdir(), "knet-deploy-"));
const path = join(dir, "secrets.json");
try {
  await writeFile(path, JSON.stringify(Object.fromEntries(names.map((n) => [n, process.env[n]]))), { mode: 0o600 });
  // Wrangler uploads secrets with this deployment. They never enter Git history.
  const status = await new Promise((resolve, reject) => {
    const child = spawn("npx", ["--yes", "wrangler", "deploy", "--secrets-file", path], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", reject);
    child.on("close", (code) => resolve(code ?? 1));
  });
  process.exitCode = status;
} finally {
  await rm(dir, { recursive: true, force: true });
}
