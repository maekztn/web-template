import fs from 'fs'
import path from 'path'

type ReadSubDir = (publicDir: string) => Promise<string[]>
const readSubDir:ReadSubDir = (publicDir) => {
  const folderPath = path.resolve(__dirname, publicDir)
  return new Promise((resolve, reject) => {
    let result: string[] = []
    let execCounter = 0
    const readTopDir = (folderPath) => {
      execCounter += 1
      fs.readdir(folderPath, function(err, items) {
        if (err) {
          reject(err)
        }

        items = items.map((itemName) => {
          return path.join(folderPath, itemName)
        })

        items.forEach((itemPath) => {
          const itemRelativePath = path.relative(
            publicDir,
            itemPath.slice(0, itemPath.length - path.extname(itemPath).length)
          )
          result.push(itemRelativePath)
          if (fs.statSync(itemPath).isDirectory()) {
            //フォルダなら再帰呼び出し
            readTopDir(itemPath)
          }
        })
        execCounter -= 1
        if (execCounter === 0) {
          resolve(result)
        }
      })
    }
    readTopDir(folderPath)
  })
}

export function IgnorePublicPlugin(ignoreFiles) {
  let config

  return {
    name: 'ignore-public',
    configResolved(_config) {
      config = _config
    },
    buildEnd() {
      readSubDir(config.publicDir).then(
        files => {
          for (const file of files) {
            for (const ignoreFile of ignoreFiles) {
              const reg = new RegExp(`${ignoreFile}$`)
              if (reg.test(file)) {
                const removeTarget = path.resolve(`${config.root}/${config.build.outDir}/${file}`)
                fs.rm(
                  removeTarget,
                  { recursive: true },
                  () => {
                    console.log(`remove: ${removeTarget}`)
                  }
                )
              }
            }
          }
        }
      )
    }
  }
}
