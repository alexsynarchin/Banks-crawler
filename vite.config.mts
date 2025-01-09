// @ts-ignore
import path from 'path'
// @ts-ignore
import {defineConfig} from 'vite'
import laravel from 'laravel-vite-plugin';
// @ts-ignore
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-ignore

// @ts-ignore
import AutoImport from 'unplugin-auto-import/vite'

function resolve(dir: any) {
    return path.join(
        __dirname,
        '/resources/js',
        dir
    );
}
const host = 'http://banki-scrawler.loc';
export default defineConfig({


    base: '/build/',
    //define global var
    define: {
        //fix "path" module issue
        'process.platform': null,
        'process.version': null,
        'import.meta.env': {
        }
    },
    plugins: [
        vue(),
        vueJsx(),
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),

        //https://github.com/antfu/unplugin-auto-import/blob/HEAD/src/types.ts
        AutoImport({
            // resolvers: [ElementPlusResolver()],
            imports: [
                'vue',
                'vue-router'
            ],
            eslintrc: {
                enabled: true, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
            dts: true //auto generation auto-imports.d.ts file
        }),
    ],
    resolve: {
        alias: {
            '@': path.join(__dirname, '/resources/js'),
            //remove i18n waring
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    build: {
        //  outDir manifest.json
        manifest: 'manifest.json',
        outDir: 'public/build',
        chunkSizeWarningLimit: 5000,
        //remote console.log in prod
        terserOptions: {
            //detail to look https://terser.org/docs/api-reference#compress-options
            compress: {
                drop_console: false,
                pure_funcs: ['console.log', 'console.info'],
                drop_debugger: true
            }
        },
        rollupOptions: {

            input: 'resources/js/app.js',

        },

    },

    css: {
        postcss: {
            //remove build charset warning
            plugins: [
                {
                    postcssPlugin: 'internal:charset-removal',
                    AtRule: {
                        charset: (atRule) => {
                            if (atRule.name === 'charset') {
                                atRule.remove()
                            }
                        }
                    }
                }
            ]
        },
        preprocessorOptions: {
            //define global scss variable
            scss: {
                api: 'modern-compiler',
                silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'abs-percent', 'import'],
                additionalData: `@use "@/styles/variables.scss" as *;`
            }
        }
    },

})
