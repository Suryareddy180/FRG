import { getCategoryBySlug, getProjectBySlug } from '@/data/projects'

const SITE_NAME = 'Fortune Rise Groups'
const SITE_BRAND_SHORT = 'FRG Landscapes'
const SITE_URL = 'https://fortunerisegroups.in'
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`

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

export const businessSchema = {
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  alternateName: SITE_BRAND_SHORT,
  legalName: 'Fortune Rise Groups',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: `${SITE_URL}/favicon.png`,
  telephone: '+91-9867890999',
  email: 'connect@fortunerisegroups.in',
  priceRange: '₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer, UPI',
  description:
    'Fortune Rise Groups delivers premium landscape architecture, 3D landscape designing, garden development, and maintenance services across Hyderabad, Telangana, and Andhra Pradesh.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Phase 2, Shanthi Nilayam, 15-25/648, Kukatpally Housing Board Colony, KPHB Phase 2, Kukatpally',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500072',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 17.4938,
    longitude: 78.3995
  },
  areaServed: [
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'City', name: 'Secunderabad' },
    { '@type': 'AdministrativeArea', name: 'Telangana' },
    { '@type': 'AdministrativeArea', name: 'Andhra Pradesh' }
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00'
    }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Landscaping & Gardening Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '3D Landscape Designing Services',
          description: 'Custom 3D modeling and conceptual landscape planning for residential, commercial, and farmhouse estates.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Landscape Contractors',
          description: 'Turnkey landscape execution and hardscape-softscape contracting across Hyderabad.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Garden Maintenance Services',
          description: 'Comprehensive pruning, nutrient care, lawn rejuvenation, and rock garden maintenance services.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Terrace Landscape Gardening & Roof Gardening Services',
          description: 'Engineered lightweight drainage, automated drip irrigation, and luxury terrace garden installations.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Architects For Farm House Landscapes',
          description: 'Estate master planning, natural plantations, and farmhouse outdoor design by certified landscape architects.'
        }
      }
    ]
  }
}

const buildRouteSeo = (to) => {
  const path = to.path

  if (to.name === 'Home') {
    return {
      title: 'Landscape Contractors & Gardening Services in Hyderabad | Fortune Rise Groups',
      description:
        'Fortune Rise Groups delivers premium landscape gardening, 3D landscape designing, garden maintenance, and landscape contractor services in Hyderabad.',
      keywords:
        'Landscape Contractors, Garden Landscaping Services, Landscape Gardening, Gardening Services, Garden Maintenance Services, 3D Landscape Designing Services, Garden Designers, Garden Developers, Designer Landscape Services, Landscape Designing Services, Hyderabad',
      path,
      type: 'website',
      breadcrumbs: [{ name: 'Home', path: '/' }]
    }
  }

  if (to.name === 'Services') {
    return {
      title: 'Landscape Designing Services & Consultants in Hyderabad | Fortune Rise Groups',
      description:
        'Expert landscape designing services and landscape consultants in Hyderabad. Providing 3D landscape designing, outdoor landscape design, and complete garden development.',
      keywords:
        'Landscape Designing Services, Landscape Design Consultants, Landscape Consultants, 3D Landscape Designing Services, Outdoor Landscape Designing Services, Indoor Landscape Designing Services, Garden Landscaping Services, Landscape Contractors Hyderabad',
      path,
      type: 'website',
      serviceSchema: {
        name: 'Landscape Designing & Garden Development Services',
        description:
          'Comprehensive 3D landscape designing, garden developers, landscape contracting, and outdoor planning for residential, commercial, and farmhouse projects.'
      },
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' }
      ]
    }
  }

  if (to.name === 'Projects') {
    const categorySlug = typeof to.params.category === 'string' ? to.params.category : ''
    const category = categorySlug ? getCategoryBySlug(categorySlug) : null
    const categoryLabel = category?.label ?? slugToLabel(categorySlug)

    if (categorySlug === 'farmhouse') {
      return {
        title: 'Architects For Farm House & Landscape Designers | Fortune Rise Groups',
        description:
          'Specialized architects for farm house landscapes and rural estate retreats in Hyderabad. Master planning, rock garden maintenance, and lush outdoor designs.',
        keywords:
          'Architects For Farm House, Architects For Landscape, Landscape Designers For Farmhouse, Rock Garden Maintenance Services, Landscape Gardening Hyderabad',
        path,
        type: 'website',
        serviceSchema: {
          name: 'Farmhouse Landscape Architecture & Design',
          description: 'Bespoke farmhouse master planning, estate planting, rock gardens, and natural water features.'
        },
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: 'Farmhouse', path: '/projects/farmhouse' }
        ]
      }
    }

    if (categorySlug === 'residences') {
      return {
        title: 'Gardening Services For Residential & Terrace Gardens | Fortune Rise Groups',
        description:
          'Tailored gardening services for residential villas and luxury homes. Terrace landscape gardening, roof gardening services, and indoor landscape designing.',
        keywords:
          'Gardening Services For Residential, Terrace Landscape Gardening, Roof Gardening Services, Indoor Gardening Services, Indoor Landscape Designing Services, Garden Designers',
        path,
        type: 'website',
        serviceSchema: {
          name: 'Residential Landscaping & Terrace Gardening',
          description: 'Custom private villa gardens, rooftop gardens, terrace landscape execution, and indoor plant styling.'
        },
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: 'Residences', path: '/projects/residences' }
        ]
      }
    }

    if (categorySlug === 'commercial') {
      return {
        title: 'Commercial Landscape Contractors & Office Gardening | Fortune Rise Groups',
        description:
          'Premier commercial landscape contractors in Hyderabad offering office gardening services, corporate gift plant dealers, and landscape maintenance services.',
        keywords:
          'Office Gardening Services, Corporate Gift Plant Dealers, Landscape Contractors, Garden Maintenance Services, Commercial Landscaping Hyderabad',
        path,
        type: 'website',
        serviceSchema: {
          name: 'Commercial & Office Landscape Contracting',
          description: 'High-footfall corporate outdoor landscapes, shaded walkways, office greening, and corporate plants.'
        },
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: 'Commercial', path: '/projects/commercial' }
        ]
      }
    }

    if (categorySlug === 'realestate') {
      return {
        title: 'Real Estate Garden Developers & Lawn Grass Suppliers | Fortune Rise Groups',
        description:
          'Master landscape developers for gated communities and real estate layouts in Hyderabad. Premium lawn grass dealers, distributors, and park development.',
        keywords:
          'Garden Developers, Lawn Grass Dealers, Lawn Grass Distributors, Landscape Contractors, Garden Landscaping Services, Real Estate Landscape Design',
        path,
        type: 'website',
        serviceSchema: {
          name: 'Real Estate Landscape Development & Lawn Turfing',
          description: 'Master planning for gated community parks, central avenue plantations, and lawn grass distribution.'
        },
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: 'Realestate', path: '/projects/realestate' }
        ]
      }
    }

    if (categoryLabel) {
      return {
        title: `${categoryLabel} Landscape Projects in Hyderabad | Fortune Rise Groups`,
        description: `Explore ${categoryLabel.toLowerCase()} landscape architecture and garden execution projects delivered by Fortune Rise Groups across Hyderabad and Telangana.`,
        keywords: `${categoryLabel.toLowerCase()} landscaping hyderabad, ${categoryLabel.toLowerCase()} landscape design, Fortune Rise Groups projects`,
        path,
        type: 'website',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: 'Category', path }
        ]
      }
    }

    return {
      title: 'Landscape Architecture & Gardening Portfolio | Fortune Rise Groups',
      description:
        'Browse Fortune Rise Groups portfolio of completed landscape gardening, farmhouse retreats, residential villas, and commercial outdoor spaces in Hyderabad.',
      keywords:
        'Designer Landscape Services, Landscape Contractors, 3D Landscape Designing Services, Outdoor Landscape Designing Services, Landscape Gardening Portfolio',
      path,
      type: 'website',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' }
      ]
    }
  }

  if (to.name === 'ProjectDetail') {
    const projectSlug = typeof to.params.projectSlug === 'string' ? to.params.projectSlug : ''
    const project = projectSlug ? getProjectBySlug(projectSlug) : null

    if (project) {
      const pageTitle = `${project.title} - ${project.category} Landscaping | Fortune Rise Groups`
      return {
        title: pageTitle.length > 68 ? `${project.title} | Fortune Rise Groups` : pageTitle,
        description: `${project.title} located in ${project.location}: executed by Fortune Rise Groups featuring bespoke ${project.category.toLowerCase()} landscape design and development.`,
        keywords: `${project.title.toLowerCase()}, ${project.category.toLowerCase()} landscaping, landscape design ${project.location.toLowerCase()}, Fortune Rise Groups`,
        image: project.image ? `${SITE_URL}${project.image}` : DEFAULT_IMAGE,
        path,
        type: 'article',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.title, path }
        ]
      }
    }
  }

  if (to.name === 'Team') {
    return {
      title: 'Landscape Architects & Consultants in Hyderabad | Fortune Rise Groups',
      description:
        'Meet the certified landscape architects and design consultants at Fortune Rise Groups with 14+ years experience in residential, commercial, and farmhouse landscaping.',
      keywords:
        'Architects For Landscape, Architects For Farm House, Landscape Consultants, Landscape Design Consultants, Landscape Designers For Farmhouse',
      path,
      type: 'profile',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Team', path: '/team' }
      ]
    }
  }

  if (to.name === 'Clients') {
    return {
      title: 'Trusted Landscape Contractors for Leading Clients | Fortune Rise Groups',
      description:
        'Discover leading developers, corporate brands, and villa owners who trust Fortune Rise Groups for premium landscape design and garden development in Hyderabad.',
      keywords:
        'Landscape Contractors Hyderabad, Commercial Landscape Contractors, Trusted Landscaping Company, Fortune Rise Groups Clients',
      path,
      type: 'website',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Clients', path: '/clients' }
      ]
    }
  }

  if (to.name === 'Blog') {
    return {
      title: 'Landscape Design Insights & Gardening Case Studies | Fortune Rise Groups',
      description:
        'Practical landscape architecture case studies from Hyderabad. Read about native planting, water-smart irrigation, commercial footfall planning, and garden maintenance.',
      keywords:
        'Landscape Gardening, Landscape Design Consultants, Garden Landscaping Services, Native Planting Hyderabad, Landscape Case Studies',
      path,
      type: 'website',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' }
      ]
    }
  }

  if (to.name === 'FAQ') {
    return {
      title: 'Garden Maintenance & Landscaping FAQ | Fortune Rise Groups',
      description:
        'Get clear answers about landscape design costs, garden maintenance services, lawn grass turfing, terrace gardening, timelines, and execution in Hyderabad.',
      keywords:
        'Garden Maintenance Services, Landscape Garden Maintenance Services, Rock Garden Maintenance Services, Lawn Grass Dealers, 3D Landscape Designing Services, FAQ',
      path,
      type: 'website',
      isFaq: true,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' }
      ]
    }
  }

  if (to.name === 'Contact') {
    return {
      title: 'Contact Landscape Contractors in Hyderabad | Fortune Rise Groups',
      description:
        'Contact Fortune Rise Groups for consultation, 3D landscape designing, or garden maintenance. Visit our Kukatpally office or call +91-9867890999.',
      keywords:
        'Contact Landscape Contractors, Landscape Consultants Hyderabad, Landscape Design Consultants Kukatpally, Fortune Rise Groups Office',
      path,
      type: 'website',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  }

  return {
    title: 'Landscaping & Gardening Services in Hyderabad | Fortune Rise Groups',
    description:
      'Fortune Rise Groups delivers premium landscape architecture, 3D landscape designing, and garden maintenance services across Hyderabad, Telangana, and Andhra Pradesh.',
    keywords:
      'Landscape Contractors, Garden Landscaping Services, Landscape Gardening, Garden Maintenance Services, Hyderabad',
    path,
    type: 'website',
    breadcrumbs: [{ name: 'Home', path: '/' }]
  }
}

const buildBreadcrumbsSchema = (breadcrumbs) => {
  if (!breadcrumbs || !breadcrumbs.length) return null

  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: toAbsoluteUrl(crumb.path)
    }))
  }
}

const faqSchemaData = {
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What landscaping services does Fortune Rise Groups provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We handle end-to-end landscape work including 3D landscape designing, hardscape and softscape execution, terrace garden development, roof gardening, automated irrigation layouts, and long-term garden maintenance services for residential, commercial, farmhouse, and industrial spaces.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you work only in Hyderabad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our primary design and execution operations are in Hyderabad, Secunderabad, Gachibowli, Kukatpally, Jubilee Hills, and Banjara Hills. We also take up large residential, resort, and farmhouse projects across Telangana and Andhra Pradesh.'
      }
    },
    {
      '@type': 'Question',
      name: 'How is the cost of a landscaping project estimated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing is calculated based on site square footage, design complexity, 3D visualization requirements, natural stone and hardscape selection, plant palettes, irrigation automation, and long-term maintenance expectations. Following an on-site consultation, we deliver a transparent itemized estimate.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can you redesign an existing garden or rock garden instead of starting from scratch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We regularly upgrade existing spaces by refreshing plant palettes, rejuvenating lawn grass, installing rock garden features, upgrading irrigation, and introducing durable paving without unnecessary structural disruption.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you provide ongoing landscape and garden maintenance services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer structured monthly and quarterly maintenance plans covering seasonal pruning, organic soil nourishment, pest monitoring, lawn mowing, rock garden upkeep, and automated drip irrigation checks.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you design and execute farmhouse landscapes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our experienced landscape architects and designers specialize in farmhouse master planning, entry tree canopies, organic fruit orchards, swimming pool surrounds, and leisure sit-outs across Hyderabad and outskirts.'
      }
    }
  ]
}

const buildJsonLd = (seo) => {
  const pageUrl = toAbsoluteUrl(seo.path)
  const graph = [
    businessSchema,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: SITE_BRAND_SHORT,
      description:
        'Professional landscape contractors, 3D landscape design, and garden maintenance services in Hyderabad, Telangana.',
      inLanguage: 'en-IN',
      publisher: {
        '@id': `${SITE_URL}/#business`
      }
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
      },
      inLanguage: 'en-IN'
    }
  ]

  const breadcrumbsSchema = buildBreadcrumbsSchema(seo.breadcrumbs)
  if (breadcrumbsSchema) {
    breadcrumbsSchema['@id'] = `${pageUrl}#breadcrumb`
    graph.push(breadcrumbsSchema)
  }

  if (seo.serviceSchema) {
    graph.push({
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: seo.serviceSchema.name,
      description: seo.serviceSchema.description,
      provider: {
        '@id': `${SITE_URL}/#business`
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Telangana & Andhra Pradesh'
      }
    })
  }

  if (seo.isFaq) {
    graph.push({
      ...faqSchemaData,
      '@id': `${pageUrl}#faq`
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  }
}

export const applyRouteSeo = (to) => {
  const seo = buildRouteSeo(to)
  const canonicalUrl = toAbsoluteUrl(seo.path)
  const imageUrl = seo.image ?? DEFAULT_IMAGE

  document.title = seo.title
  document.documentElement.lang = 'en'

  createMeta('meta[name="description"]', { name: 'description', content: seo.description })
  createMeta('meta[name="keywords"]', { name: 'keywords', content: seo.keywords })
  createMeta('meta[name="robots"]', {
    name: 'robots',
    content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
  })

  // Open Graph
  createMeta('meta[property="og:type"]', { property: 'og:type', content: seo.type })
  createMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title })
  createMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
  createMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
  createMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
  createMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
  createMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_IN' })

  // Twitter Card
  createMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  createMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title })
  createMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description })
  createMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl })

  upsertLink('canonical', canonicalUrl)
  upsertJsonLd('frg-json-ld', buildJsonLd(seo))
}
