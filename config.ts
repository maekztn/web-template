const srcDir = 'src'
const distDir = '../dist'
const publicDir = '../public'
const baseDir = '/'
const proxy = {
  // '/': 'localhost'
}
const siteData = {
  host: 'https://example.com',
  baseDir,
  title: 'example'
}

export default {
  srcDir,
  baseDir,
  publicDir,
  outDir: `${distDir}${baseDir}`.replace('./', '/'),
  proxy,
  siteData
}
