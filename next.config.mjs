import path from "node:path";
import { fileURLToPath } from "node:url";

const projektRoot = path.dirname(fileURLToPath(import.meta.url));

// turbopack.root verhindert, dass Turbopack den Eltern-Ordner webseiten/
// als Workspace-Root nimmt (bekannter Fallstrick bei Geschwister-Projekten)
const nextConfig = {
  turbopack: { root: projektRoot },
  outputFileTracingRoot: projektRoot,
};

export default nextConfig;
