
import { resolve } from 'path'
import {createBundleRenderer} from "vue-server-renderer";
import serverRender from "../lib/server-render";
import clientManifestResp from '../../public/dist/vue-ssr-client-manifest.json'

export const prod = app => {

	app.use(async (ctx, next) => {
		try {

			const renderer = createBundleRenderer(resolve(__dirname, '../server-build/vue-ssr-server-bundle.json'),
			{
				inject: false,
				clientManifest: clientManifestResp
			});

			await serverRender(ctx, renderer);
		} catch (error) {
			console.log(error);
		}
	});
}
