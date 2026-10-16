import { projectFallbackImage, projectMediaManifest } from '@/data/projectMediaManifest'

const projectCatalog = [
  { title: 'Yoshitha 2024', category: 'Realestate' },
  { title: 'Vinuthuna Pharma', category: 'Industrial' },
  { title: 'Subrahmanyam Farmhouse', category: 'Farmhouse' },
  { title: 'Vidyanand Terrace Garden, Begumpet', category: 'Private Residences' },
  { title: 'Villa No. 4, Kollur', category: 'Residences' },
  { title: 'Sree Kalpa Luxor', category: 'Realestate' },
  { title: 'Sathvik Reddy', category: 'Commercial' },
  { title: 'Sanjeevani 2024', category: 'Realestate' },
  { title: 'Pradeep Bandaru Farmhouse, Bhongir', category: 'Farmhouse' },
  { title: 'Iconic 2024', category: 'Realestate' },
  { title: 'Divine County', category: 'Realestate' },
  { title: 'Dundigal Layout', category: 'Resorts' },
  { title: 'Dr. Reddy 2024', category: 'Industrial' },
  { title: 'Dr. Lalitha Hatkar Villa', category: 'Residences' },
  { title: 'Anil Reddy Farmhouse', category: 'Farmhouse' },
  { title: 'Aditya Reddy', category: 'Residences' },
  { title: 'Mohan Reddy Layout and Parks 21-02-2026', category: 'Resorts' },
  { title: "Nani's Kitchen", category: 'Commercial' },
  { title: 'Kurnool Farmhouse', category: 'Farmhouse' },
  { title: 'Lavasa Lake View Farm House', category: 'Farmhouse' },
  { title: 'Jaya Grand', category: 'Realestate' },
  { title: 'KVR', category: 'Realestate' },
  { title: 'IT Tower', category: 'Commercial' },
  { title: 'Mrs. Sathvik 2024', category: 'Commercial' },
  { title: 'Mr. Vivek Farmhouse', category: 'Farmhouse' }
]

const fallbackImage = projectFallbackImage

export const buildSlug = (title) => title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const inferLocation = (title) => {
  const parts = title.split(',').map((part) => part.trim())
  return parts[1] ?? 'Hyderabad'
}

const getProjectMediaEntries = (folderName) => projectMediaManifest[folderName] ?? []

const getProjectCoverImage = (folderName) => getProjectMediaEntries(folderName)
  .find((item) => item.type === 'image')?.src ?? fallbackImage

const solutionCategories = [
  'Realestate',
  'Industrial',
  'Farmhouse',
  'Residences',
  'Commercial',
  'Resorts',
]

export const allProjects = projectCatalog.map(({ title, category }, index) => ({
  id: index + 1,
  title,
  slug: buildSlug(title),
  category,
  categorySlug: buildSlug(category),
  location: inferLocation(title),
  year: (title.match(/(20\d{2}|21-02-2026)/)?.[0] ?? 'Ongoing').toString(),
  summary: `${title} is part of the Fortune Rise Groups portfolio, with a dedicated detail page and gallery ready for project imagery.`,
  image: getProjectCoverImage(title),
  folderName: title
}))

export const projectCategories = solutionCategories
  .filter((category) => allProjects.some((project) => project.category === category))
  .map((label) => ({
    label,
    slug: buildSlug(label)
  }))

export const featuredProjects = allProjects.slice(0, 6)

export const getProjectBySlug = (slug) => allProjects.find((project) => project.slug === slug)

export const getCategoryBySlug = (slug) => projectCategories.find((category) => category.slug === slug)

export const getProjectsByCategory = (categorySlug) => allProjects
  .filter((project) => project.categorySlug === categorySlug)

export const getProjectGallery = (project) => {
  return getProjectMediaEntries(project.folderName)
    .map(({ src, type }) => ({ src, type }))
}