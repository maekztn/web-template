import config from './config'

interface Common {
  dir: { [prop: string]: string },
  ext: { [prop: string]: string },
  srcPaths: { [prop: string]: string },
  ignorePaths: { [prop: string]: string },
  styleIncludePaths: string[],
}

const common: Common = {
  dir: {
    assets: 'assets',
    includes: 'includes',
    scripts: 'scripts',
    styles: 'styles'
  },
  ext: {
    html: '.html',
    includes: '.ejs',
    scripts: '.ts',
    styles: '.scss'
  },
  srcPaths: {},
  ignorePaths: {},
  styleIncludePaths: ['node_modules']
}

common.srcPaths = {
  html: `${config.srcDir}/**/*${common.ext.html}`,
  scripts: `${config.srcDir}/${common.dir.assets}/${common.dir.scripts}/**/*${common.ext.scripts}`,
  styles: `${config.srcDir}/${common.dir.assets}/${common.dir.styles}/**/*${common.ext.styles}`,
  includes: `/${common.dir.includes}/**/*${common.ext.includes}`
}

common.ignorePaths = {
  html: '',
  scripts: `${config.srcDir}/${common.dir.assets}/${common.dir.scripts}/**/_*${common.ext.scripts}`,
  styles: `${config.srcDir}/${common.dir.assets}/${common.dir.styles}/**/_*${common.ext.styles}`
}

common.styleIncludePaths.unshift(`${config.srcDir}/${common.dir.assets}/${common.dir.styles}`)

export default common
