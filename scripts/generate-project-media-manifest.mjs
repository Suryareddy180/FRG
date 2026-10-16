import fs from 'fs'
import path from 'path'

const projectsRoot = path.resolve('public/images/projects')
const outputFile = path.resolve('src/data/projectMediaManifest.js')

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const videoExtensions = new Set(['.mp4'])

const toPosix = (value) => value.replace(/\\/g, '/')

const toPublicUrl = (relativePath) => {
  const encodedPath = toPosix(relativePath)
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return `/images/projects/${encodedPath}`
}

const collectFilesRecursively = (directoryPath) => {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true })

  return entries.flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name)

    if (entry.isDirectory()) {
      return collectFilesRecursively(entryPath)
    }

    return [entryPath]
  })
}

if (!fs.existsSync(projectsRoot)) {
  throw new Error(`Projects directory not found: ${projectsRoot}`)
}

const allFiles = collectFilesRecursively(projectsRoot)
const manifest = {}
let fallbackImage = '/images/projects/noimage.jpg'

for (const absoluteFilePath of allFiles) {
  const relativePath = toPosix(path.relative(projectsRoot, absoluteFilePath))
  const extension = path.extname(relativePath).toLowerCase()

  const isImage = imageExtensions.has(extension)
  const isVideo = videoExtensions.has(extension)

  if (!isImage && !isVideo) {
    continue
  }

  const pathSegments = relativePath.split('/')
  const [folderName] = pathSegments

  if (pathSegments.length === 1) {
    if (isImage && folderName.toLowerCase() === 'noimage.jpg') {
      fallbackImage = toPublicUrl(relativePath)
    }
    continue
  }

  if (!manifest[folderName]) {
    manifest[folderName] = []
  }

  manifest[folderName].push({
    path: relativePath,
    src: toPublicUrl(relativePath),
    type: isImage ? 'image' : 'video'
  })
}

for (const folderName of Object.keys(manifest)) {
  manifest[folderName].sort((left, right) => left.path.localeCompare(right.path))
}

const outputContent = `export const projectFallbackImage = ${JSON.stringify(fallbackImage)}\n\nexport const projectMediaManifest = ${JSON.stringify(manifest, null, 2)}\n`

fs.mkdirSync(path.dirname(outputFile), { recursive: true })
fs.writeFileSync(outputFile, outputContent, 'utf8')

console.log(`[generate-project-media-manifest] Wrote ${Object.keys(manifest).length} folders to ${outputFile}`)
