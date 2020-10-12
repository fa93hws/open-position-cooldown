import { resolve, join } from 'path';

export const repoRoot = resolve(__dirname, '..');
export const publicFolder = join(repoRoot, 'public');
export const srcFolder = join(repoRoot, 'src');
export const publicAssetsFolder = join(publicFolder, 'assets');
export const buildOutputFolder = join(repoRoot, 'target');
export const buildArtifactFolder = join(buildOutputFolder, 'static');
export const buildAssetsFolder = join(buildOutputFolder, 'assets');
