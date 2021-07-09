import { Compilation, Compiler } from "webpack";

interface Iassets {
	js: Array<string>;
	css: Array<string>;
	other: Array<string>;
}
class webpackPluginRuntimeAssets {
	apply(compiler: Compiler) {
		compiler.hooks.emit.tap(
			"webpackPluginRuntimeAssets",
			(stats) => {
				const assets: Iassets = {
					js: [],
					css: [],
					other: [],
				};
				let runtimeChunks: Array<string> = [];
				for (const [, {files}] of stats.namedChunks) {
					runtimeChunks = [...runtimeChunks, ...files];
				}

				runtimeChunks.forEach((e) => {
					assets[defineFileExtension(e)].push(
						stats.outputOptions.publicPath + e,
					);
				});

				// generator json file
				const assetsData = JSON.stringify(assets, null, 2);
				// @ts-ignore: Unreachable code error
				stats.assets["bundle.json"] = {
					source: () => assetsData,
					size: () => assetsData.length,
				};
			},
		);
	}
}

function defineFileExtension(filename: string): keyof Iassets {
	const _fileExt = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);

	if (_fileExt.startsWith("js")) {
		return "js";
	}
	if (_fileExt.startsWith("css")) {
		return "css";
	}
	return "other";
}

export default webpackPluginRuntimeAssets;
