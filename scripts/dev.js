import { spawn } from "node:child_process";

const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

const processes = [
  spawn("node", ["server/index.js"], {
    stdio: "inherit",
    shell: true
  }),
  spawn(pnpmCommand, ["exec", "vite", "--host", "127.0.0.1"], {
    stdio: "inherit",
    shell: true
  })
];

function stopAll(signal) {
  for (const child of processes) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
}

for (const child of processes) {
  child.on("exit", (code, signal) => {
    if (signal) {
      stopAll(signal);
      return;
    }

    if (code && code !== 0) {
      stopAll("SIGTERM");
      process.exitCode = code;
    }
  });
}

process.on("SIGINT", () => {
  stopAll("SIGINT");
});

process.on("SIGTERM", () => {
  stopAll("SIGTERM");
});
