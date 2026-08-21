import { spawn } from "node:child_process";
import { copyFile, mkdir, rm } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const outputDir = path.resolve("android");
const outputPath = path.join(outputDir, "impostor-veneco.apk");
const temporaryPath = `${outputPath}.download`;

function runBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      npx,
      [
        "--yes",
        "eas-cli@latest",
        "build",
        "--platform",
        "android",
        "--profile",
        "preview",
        "--json",
      ],
      { stdio: ["inherit", "pipe", "inherit"] },
    );

    let output = "";
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => (output += chunk));
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`EAS Build termino con codigo ${code}.`));
    });
  });
}

try {
  console.log("Iniciando build de Android en EAS...");
  const builds = JSON.parse(await runBuild());
  const downloadUrl = builds[0]?.artifacts?.applicationArchiveUrl;

  if (!downloadUrl) throw new Error("EAS no devolvio una URL para descargar el APK.");

  console.log("Descargando APK...");
  const response = await fetch(downloadUrl);
  if (!response.ok || !response.body) {
    throw new Error(`La descarga fallo con HTTP ${response.status}.`);
  }

  await mkdir(outputDir, { recursive: true });
  await pipeline(Readable.fromWeb(response.body), createWriteStream(temporaryPath));
  await copyFile(temporaryPath, outputPath);
  console.log(`APK listo: ${outputPath}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await rm(temporaryPath, { force: true });
}
