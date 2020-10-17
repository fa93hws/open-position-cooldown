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
    let filePath: string;
    if (['.js', '.css'].includes(path.extname(file.path))) {
      const md5sum = crypto.createHash('md5');
      const filename = md5sum.update(file.contents).digest('hex').slice(0, 16);
      filePath = path.join(
        path.dirname(file.path),
        filename + path.extname(file.path),
      );
    } else {
      filePath = file.path;
    }
    return {
      path: filePath,
      contents: file.contents,
    };
  });
}

function assertExists({
  filePath,
  name,
  existsSync = fs.existsSync,
}: {
  filePath: string;
  name: string;
  existsSync?: typeof fs.existsSync;
}) {
  if (!existsSync(filePath)) {
    throw new Error(`${name} ${filePath} does not exist`);
  }
}

export function generateHtml({
  templatePath,
  files,
  outdir,
  existsSync = fs.existsSync,
  writeFileSync = fs.writeFileSync,
}: {
  templatePath: string;
  files: readonly string[];
  outdir: string;
  existsSync?: typeof fs.existsSync;
  writeFileSync?: typeof fs.writeFileSync;
}) {
  assertExists({ filePath: templatePath, name: 'templatePath', existsSync });
  assertExists({ filePath: outdir, name: 'outdir', existsSync });
  files.forEach((file, idx) =>
    assertExists({ filePath: file, name: `file[${idx}]`, existsSync }),
  );
  const templateContent = fs.readFileSync(templatePath, { encoding: 'utf-8' });
  const jsFiles = files
    .filter((f) => path.extname(f) === '.js')
    .map((f) => path.relative(outdir, f));
  const cssFiles = files
    .filter((f) => path.extname(f) === '.css')
    .map((f) => path.relative(outdir, f));
  const htmlOutputContent = template(templateContent)({ jsFiles, cssFiles });
  writeFileSync(path.join(outdir, 'index.html'), htmlOutputContent);
}

export function copyAssets({
  from,
  to,
  copyFileSync = fs.copyFileSync,
}: {
  from: string;
  to: string;
  copyFileSync?: typeof fs.copyFileSync;
}) {
  assertExists({ filePath: from, name: 'from' });
  ensureFolder(to);
  fs.readdirSync(from, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name)
    .forEach((file) =>
      copyFileSync(path.join(from, file), path.join(to, file)),
    );
}
