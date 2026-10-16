import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { execFileSync } from 'child_process'

const projectMediaManifestPlugin = () => ({
  name: 'project-media-manifest',
  apply: 'serve',
  configureServer(server) {
    const projectMediaRoot = path.resolve(__dirname, 'public/images/projects')
    const manifestScriptPath = path.resolve(__dirname, 'scripts/generate-project-media-manifest.mjs')
    const normalizedMediaRoot = projectMediaRoot.replace(/\\/g, '/')
    let generationTimer = null

    const generateManifest = () => {
      execFileSync(process.execPath, [manifestScriptPath], { stdio: 'inherit' })
    }

    const scheduleGeneration = (filePath) => {
      const normalizedFilePath = (filePath ?? '').replace(/\\/g, '/')

      if (!normalizedFilePath.startsWith(normalizedMediaRoot)) {
        return
      }

      if (generationTimer) {
        clearTimeout(generationTimer)
      }

      generationTimer = setTimeout(() => {
        try {
          generateManifest()
          // Ensure updated project data is reflected immediately in the browser.
          server.ws.send({ type: 'full-reload' })
        } catch (error) {
          console.error('[project-media-manifest] Failed to regenerate manifest', error)
        }
      }, 150)
    }

    try {
      generateManifest()
    } catch (error) {
      console.error('[project-media-manifest] Initial generation failed', error)
    }

    server.watcher.add(projectMediaRoot)

    ;['add', 'change', 'unlink', 'addDir', 'unlinkDir'].forEach((eventName) => {
      server.watcher.on(eventName, scheduleGeneration)
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), projectMediaManifestPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
