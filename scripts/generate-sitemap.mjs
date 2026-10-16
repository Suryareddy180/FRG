import fs from 'fs'
import path from 'path'

const siteUrl = 'https://fortunerisegroups.in'
const projectDataFile = path.resolve('src/data/projects.js')
const outputFile = path.resolve('public/sitemap.xml')

const toSlug = (title) => title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const unique = (values) => [...new Set(values)]

const readProjectCatalog = () => {
  if (!fs.existsSync(projectDataFile)) {
    throw new Error(`Missing project data file: ${projectDataFile}`)
  }

  const fileContent = fs.readFileSync(projectDataFile, 'utf8')
  const titleMatches = [...fileContent.matchAll(/title:\s*(['"])(.*?)\1/g)].map((match) => match[2])
  const solutionCategoriesMatch = fileContent.match(/const\s+solutionCategories\s*=\s*\[([\s\S]*?)\]/)
  const categoryMatches = solutionCategoriesMatch
    ? [...solutionCategoriesMatch[1].matchAll(/(['"])(.*?)\1/g)].map((match) => match[2])
    : []

  return {
    projectTitles: unique(titleMatches),
    categorySlugs: unique(categoryMatches.map((category) => toSlug(category)))
  }
}

const formatUrlTag = (loc, lastmod, changefreq, priority) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`

const buildSitemap = () => {
  const { projectTitles, categorySlugs } = readProjectCatalog()
  const lastmod = new Date().toISOString().slice(0, 10)

  const staticPages = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/blog', changefreq: 'weekly', priority: '0.9' },
    { path: '/faq', changefreq: 'monthly', priority: '0.8' },
    { path: '/projects', changefreq: 'weekly', priority: '0.9' },
    { path: '/services', changefreq: 'monthly', priority: '0.9' },
    { path: '/clients', changefreq: 'monthly', priority: '0.8' },
    { path: '/team', changefreq: 'monthly', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.9' }
  ]

  const categoryPages = categorySlugs.map((slug) => ({
    path: `/projects/${slug}`,
    changefreq: 'weekly',
    priority: '0.8'
  }))

  const projectPages = projectTitles.map((title) => ({
    path: `/project/${toSlug(title)}`,
    changefreq: 'monthly',
    priority: '0.7'
  }))

  const allPages = [...staticPages, ...categoryPages, ...projectPages]

  const body = allPages
    .map(({ path: pagePath, changefreq, priority }) => formatUrlTag(`${siteUrl}${pagePath}`, lastmod, changefreq, priority))
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

  fs.writeFileSync(outputFile, xml, 'utf8')
  console.log(`[generate-sitemap] Wrote ${allPages.length} URLs to ${outputFile}`)
}

buildSitemap()
