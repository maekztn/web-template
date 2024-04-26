import { defineConfig } from 'vite'
import { globSync } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import checker from 'vite-plugin-checker'
import sassGlobImports from 'vite-plugin-sass-glob-import'
import liveReload from 'vite-plugin-live-reload'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { IgnorePublicPlugin } from './vite.plugins/ignorePublic'

import config from './config'
import common from './common'

const inputGlobs = [
  globSync(common.srcPaths.html, { ignore: common.ignorePaths.html }),
  globSync(common.srcPaths.scripts, { ignore: common.ignorePaths.scripts }),
  globSync(common.srcPaths.styles, { ignore: common.ignorePaths.styles })
]

const inputArray = inputGlobs.map(glob => {
  return glob.map(file => {
    return [
      path.relative('src', file.slice(0, file.length - path.extname(file).length)),
      fileURLToPath(new URL(file, import.meta.url))
    ]
  })
})

const inputObject = Object.fromEntries(inputArray.flat())
console.log(inputObject)

const abstractsPath = path.resolve(__dirname, `${config.srcDir}/${common.dir.assets}/${common.dir.styles}/abstracts/import`)

export default defineConfig({
  root: config.srcDir,
  base: config.baseDir,
  publicDir: config.publicDir,
  build: {
    outDir: config.distDir,
    assetsDir: 'assets/scripts',
    emptyOutDir: true,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      input: inputObject,
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    proxy: config.proxy,
    watch: {
      usePolling: true
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: common.styleIncludePaths,
        additionalData: `@import "${abstractsPath}";`
      }
    }
  },
  plugins: [
    checker({ typescript: true }),
    sassGlobImports(),
    liveReload([common.dir.includes, common.ignorePaths.styles]),
    ViteEjsPlugin(
      config.siteData,
      {
        ejs: {
          root: common.dir.includes
        }
      }
    ),
    IgnorePublicPlugin(['.gitkeep'])
  ]
})
