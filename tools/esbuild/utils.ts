import * as fs from 'fs';
import * as path from 'path';
import { OutputFile } from 'esbuild';
import * as crypto from 'crypto';
import { template } from 'lodash';

export const enum BUILD_MODE {
  PROD = 'production',
  DEV = 'development',
}

export function ensureFolder(target: string): void {
  fs.rmdirSync(target, { recursive: true });
  fs.mkdirSync(target, { recursive: true });
}

export function hashOutputs(outputFiles: readonly OutputFile[]): OutputFile[] {
  return outputFiles.map((file) => {
    const md5sum = crypto.createHash('md5');
    const filename = md5sum.update(file.contents).digest('hex').slice(0, 16);
    const filePath = path.join(
      path.dirname(file.path),
      filename + path.extname(file.path),
    );
    return {
      path: filePath,
      contents: file.contents,
    };
  });
}

function assertExists(filePath: string, name: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${name} ${filePath} does not exist`);
  }
}

export function generateHtml({
  templatePath,
  files,
  outdir,
}: {
  templatePath: string;
  files: readonly string[];
  outdir: string;
}) {
  assertExists(templatePath, 'templatePath');
  assertExists(outdir, 'outdir');
  files.forEach((file, idx) => assertExists(file, `file[${idx}]`));
  const templateContent = fs.readFileSync(templatePath, { encoding: 'utf-8' });
  const jsFiles = files
    .filter((f) => path.extname(f) === '.js')
    .map((f) => path.relative(outdir, f));
  const cssFiles = files
    .filter((f) => path.extname(f) === '.css')
    .map((f) => path.relative(outdir, f));
  const htmlOutputContent = template(templateContent)({ jsFiles, cssFiles });
  fs.writeFileSync(path.join(outdir, 'index.html'), htmlOutputContent);
}

export function copyAssets(from: string, to: string) {
  assertExists(from, 'from');
  ensureFolder(to);
  fs.readdirSync(from, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name)
    .forEach((file) =>
      fs.copyFileSync(path.join(from, file), path.join(to, file)),
    );
}
