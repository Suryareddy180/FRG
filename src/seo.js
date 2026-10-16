import { getCategoryBySlug, getProjectBySlug } from '@/data/projects'

const SITE_NAME = 'FRG Landscapes'
const SITE_URL = 'https://fortunerisegroups.in'
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`

const DEFAULT_SEO = {
  title: 'Landscaping Company in Hyderabad | FRG Landscapes',
  description:
    'FRG Landscapes designs and builds premium residential, commercial, farmhouse, resort, and industrial landscapes across Hyderabad, Telangana, and Andhra Pradesh.',
  keywords:
    'landscaping services, landscaping company, garden landscaping, landscape contractors, professional landscaping services, residential landscaping, commercial landscaping, landscaping services hyderabad, landscaping services in hyderabad, garden landscaping hyderabad, landscape contractors hyderabad, landscaping company hyderabad, commercial landscaping hyderabad, terrace garden hyderabad, lawn maintenance hyderabad, garden development hyderabad, landscaping services secunderabad, landscaping services gachibowli, landscaping services kukatpally, landscaping services jubilee hills, landscaping services banjara hills',
  path: '/',
  type: 'website'
}

const ensureLeadingSlash = (value) => (value.startsWith('/') ? value : `/${value}`)

const toAbsoluteUrl = (path) => `${SITE_URL}${ensureLeadingSlash(path)}`

const createMeta = (selector, attrs) => {
  let node = document.head.querySelector(selector)

  if (!node) {
    node = document.createElement('meta')
    document.head.appendChild(node)
  }

  Object.entries(attrs).forEach(([key, value]) => {
    node.setAttribute(key, value)
  })
}

const upsertLink = (rel, href) => {
  const selector = `link[rel="${rel}"]`
  let node = document.head.querySelector(selector)

  if (!node) {
    node = document.createElement('link')
    node.setAttribute('rel', rel)
    document.head.appendChild(node)
  }

  node.setAttribute('href', href)
}

const upsertJsonLd = (id, payload) => {
  let node = document.head.querySelector(`script#${id}`)

  if (!node) {
    node = document.createElement('script')
    node.type = 'application/ld+json'
    node.id = id
    document.head.appendChild(node)
  }

  node.textContent = JSON.stringify(payload)
}

const slugToLabel = (slug) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const buildRouteSeo = (to) => {
  const base = {
    ...DEFAULT_SEO,
    path: to.path
  }

  if (to.name === 'Home') {
    return {
      ...base,
      title: 'Landscaping Company in Hyderabad | FRG Landscapes',
      description:
        'FRG Landscapes creates premium outdoor spaces in Hyderabad with custom landscape design, execution, and maintenance for homes, businesses, farmhouses, and resorts.',
      keywords:
        'landscaping services, landscaping company, garden landscaping, landscape contractors, professional landscaping services, residential landscaping, commercial landscaping, landscaping services hyderabad, landscaping services in hyderabad, garden landscaping hyderabad, landscape contractors hyderabad, landscaping company hyderabad, commercial landscaping hyderabad, terrace garden hyderabad, lawn maintenance hyderabad, garden development hyderabad, landscaping services secunderabad, landscaping services gachibowli, landscaping services kukatpally, landscaping services jubilee hills, landscaping services banjara hills',
      type: 'website'
    }
  }

  if (to.name === 'Services') {
    return {
      ...base,
      title: 'Landscape Design Services in Hyderabad | FRG Landscapes',
      description:
        'Explore FRG Landscapes services for commercial, residential, farmhouse, resort, industrial, and real estate landscape development in Hyderabad.',
      keywords:
        'landscape services hyderabad, residential landscaping, commercial landscaping, resort landscaping, industrial landscape design',
      type: 'website'
    }
  }

  if (to.name === 'Projects') {
    const categorySlug = typeof to.params.category === 'string' ? to.params.category : ''
    const category = categorySlug ? getCategoryBySlug(categorySlug) : null
    const categoryLabel = category?.label ?? slugToLabel(categorySlug)

    if (categoryLabel) {
      return {
        ...base,
        title: `${categoryLabel} Landscaping Projects in Hyderabad | FRG Landscapes`,
        description: `View ${categoryLabel.toLowerCase()} landscaping projects by FRG Landscapes across Hyderabad and surrounding regions.`,
        keywords: `${categoryLabel.toLowerCase()} landscaping hyderabad, ${categoryLabel.toLowerCase()} landscape design, FRG ${categoryLabel.toLowerCase()} projects`,
        type: 'website'
      }
    }

    return {
      ...base,
      title: 'Landscape Project Portfolio | FRG Landscapes Hyderabad',
      description:
        'Browse FRG Landscapes portfolio of completed residential, commercial, industrial, farmhouse, and resort landscape projects.',
      keywords:
        'landscape portfolio hyderabad, completed landscaping projects, garden design projects, FRG portfolio',
      type: 'website'
    }
  }

  if (to.name === 'ProjectDetail') {
    const projectSlug = typeof to.params.projectSlug === 'string' ? to.params.projectSlug : ''
    const project = projectSlug ? getProjectBySlug(projectSlug) : null

    if (project) {
      return {
        ...base,
        title: `${project.title} | ${project.category} Landscape Project | FRG Landscapes`,
        description: `${project.summary} Explore project gallery, category insights, and landscape execution details by FRG Landscapes.`,
        keywords: `${project.title.toLowerCase()}, ${project.category.toLowerCase()} landscape project, landscaping in ${project.location.toLowerCase()}, FRG projects`,
        image: project.image ? `${SITE_URL}${project.image}` : DEFAULT_IMAGE,
        type: 'article'
      }
    }
  }

  if (to.name === 'Team') {
    return {
      ...base,
      title: 'Landscape Team in Hyderabad | FRG Landscapes',
      description:
        'Meet the FRG Landscapes team behind high-quality, nature-inspired landscape design and execution across Telangana and Andhra Pradesh.',
      keywords: 'landscape team hyderabad, landscaping experts, FRG Landscapes team',
      type: 'profile'
    }
  }

  if (to.name === 'Clients') {
    return {
      ...base,
      title: 'Our Clients | FRG Landscapes',
      description:
        'Discover the developers, businesses, and private clients who trust FRG Landscapes for premium outdoor and landscape development.',
      keywords: 'landscape company clients, FRG clients, trusted landscaping company hyderabad',
      type: 'website'
    }
  }

  if (to.name === 'Blog') {
    return {
      ...base,
      title: 'Landscape Design Blog and Case Studies | FRG Landscapes',
      description:
        'Read practical landscape case studies from FRG projects across Hyderabad, including residential, commercial, farmhouse, resort, and industrial spaces.',
      keywords:
        'landscaping blog hyderabad, landscape design case studies, residential landscaping ideas, commercial landscaping insights, FRG projects blog',
      type: 'website'
    }
  }

  if (to.name === 'FAQ') {
    return {
      ...base,
      title: 'Landscaping FAQ | FRG Landscapes Hyderabad',
      description:
        'Find answers about landscape design costs, timelines, maintenance, service locations, and project process from FRG Landscapes in Hyderabad.',
      keywords:
        'landscaping faq hyderabad, landscape design cost hyderabad, landscape maintenance questions, terrace garden faq, FRG Landscapes faq',
      type: 'website'
    }
  }

  if (to.name === 'Contact') {
    return {
      ...base,
      title: 'Contact FRG Landscapes | Hyderabad Office',
      description:
        'Contact FRG Landscapes for landscape design and execution in Hyderabad. Visit our office in Kukatpally or call for a consultation.',
      keywords: 'contact landscaping company hyderabad, FRG office kukatpally, landscape consultation',
      type: 'website'
    }
  }

  return base
}

const buildJsonLd = (seo) => {
  const pageUrl = toAbsoluteUrl(seo.path)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LandscapeDesigner',
        '@id': `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        telephone: '+91-9867890999',
        email: 'connect@fortunerisegroups.in',
        image: DEFAULT_IMAGE,
        areaServed: ['Telangana', 'Andhra Pradesh'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Phase 2, Shanthi Nilayam, 15-25/648, Kukatpally Housing Board Colony, KPHB Phase 2, Kukatpally',
          addressLocality: 'Hyderabad',
          addressRegion: 'Telangana',
          postalCode: '500072',
          addressCountry: 'IN'
        },
        sameAs: []
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: 'en-IN'
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: {
          '@id': `${SITE_URL}/#website`
        },
        about: {
          '@id': `${SITE_URL}/#business`
        }
      }
    ]
  }
}

export const applyRouteSeo = (to) => {
  const seo = buildRouteSeo(to)
  const pageTitle = `${seo.title} | ${SITE_NAME}`.replace(` | ${SITE_NAME} | ${SITE_NAME}`, ` | ${SITE_NAME}`)
  const canonicalUrl = toAbsoluteUrl(seo.path)
  const imageUrl = seo.image ?? DEFAULT_IMAGE

  document.title = pageTitle
  document.documentElement.lang = 'en'

  createMeta('meta[name="description"]', { name: 'description', content: seo.description })
  createMeta('meta[name="keywords"]', { name: 'keywords', content: seo.keywords })
  createMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' })

  createMeta('meta[property="og:type"]', { property: 'og:type', content: seo.type })
  createMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
  createMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
  createMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
  createMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
  createMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })

  createMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  createMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle })
  createMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description })
  createMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl })

  upsertLink('canonical', canonicalUrl)
  upsertJsonLd('frg-json-ld', buildJsonLd(seo))
}
