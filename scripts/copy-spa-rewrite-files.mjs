import fs from 'fs'
import path from 'path'

const filesToCopy = ['.htaccess', '_redirects', 'web.config']

for (const fileName of filesToCopy) {
  const sourcePath = path.resolve('public', fileName)
  const destinationPath = path.resolve('dist', fileName)

  if (!fs.existsSync(sourcePath)) {
    continue
  }

  fs.copyFileSync(sourcePath, destinationPath)
  console.log(`[copy-spa-rewrite-files] Copied ${fileName}`)
}
