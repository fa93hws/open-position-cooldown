import { resolve, join } from 'path';

export const repoRoot = resolve(__dirname, '..');
export const publicFolder = join(repoRoot, 'public');
export const srcFolder = join(repoRoot, 'src');
export const publicAssetsFolder = join(publicFolder, 'assets');
export const getBuildArtifactFolder = (buildOutputFolder: string) =>
  join(buildOutputFolder, 'static');
export const getBuildAssetsFolder = (buildOutputFolder: string) =>
  join(buildOutputFolder, 'assets');
