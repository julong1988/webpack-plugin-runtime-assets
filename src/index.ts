interface Iassets {
  js: string[];
  css: string[];
  other: string[];
}
class webpackPluginRuntimeAssets {
  apply (compiler: any) {
    compiler.hooks.emit.tap(
      'webpackPluginRuntimeAssets',
      (stats: any) => {
        const assets: Iassets = {
          js: [],
          css: [],
          other: [],
        };
        let runtimeChunks: any = [];
        for (const [, { files }] of stats.namedChunks) {
          runtimeChunks = [...runtimeChunks, ...files]
        }

        runtimeChunks.forEach((e: any) => {
          assets[defineFileExtension(e)].push(stats.outputOptions.publicPath + e);
        });

        // generator json file
        const assetsData = JSON.stringify(assets, null, 2)
        stats.assets[`bundle.json`] = {
          source: () => assetsData,
          size: () => assetsData.length
        }
      }
    );
  }
}

function defineFileExtension (filename: string): keyof Iassets {
  const _fileExt = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);

  if (_fileExt.startsWith('js')) {
    return 'js'
  }
  if (_fileExt.startsWith('css')) {
    return 'css'
  }
  return 'other'
}

export default webpackPluginRuntimeAssets;