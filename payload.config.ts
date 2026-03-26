import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { plugin as importExportPlugin } from 'payload-plugin-import-export'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const isDevelopment = process.env.NODE_ENV === 'development'

function getMongoTimeoutMs() {
  const rawValue = Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS)

  if (Number.isFinite(rawValue) && rawValue > 0) {
    return rawValue
  }

  return isDevelopment ? 3000 : 10000
}

function getSiteUrl() {
  return process.env.SITE_URL || 'http://localhost:3000'
}

function joinSiteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl()).toString()
}

function getPagePath(slug?: string | null) {
  if (!slug) {
    return '/'
  }

  return slug === 'home' ? '/' : `/${slug}`
}

const iconOptions = [
  'award',
  'book-open',
  'clock',
  'credit-card',
  'eye',
  'file-text',
  'globe',
  'graduation-cap',
  'headphones',
  'heart',
  'lightbulb',
  'message-circle',
  'shield',
  'target',
  'trending-up',
  'user-check',
  'users',
]

const pageTabCondition =
  (...slugs: string[]) =>
  (data: { slug?: string } | undefined) =>
    Boolean(data?.slug && slugs.includes(data.slug))

const textItemsField = (name: string, label: string) => ({
  name,
  label,
  type: 'array' as const,
  fields: [{ name: 'text', type: 'text' as const, required: true }],
})

const linkItemsField = (name: string, label: string) => ({
  name,
  label,
  type: 'array' as const,
  fields: [
    { name: 'label', type: 'text' as const, required: true },
    { name: 'href', type: 'text' as const, required: true },
  ],
})

const paragraphItemsField = (name: string, label: string) => ({
  name,
  label,
  type: 'array' as const,
  fields: [{ name: 'text', type: 'textarea' as const, required: true }],
})

const ctaFields = [
  { name: 'ctaTitle', type: 'text' as const },
  { name: 'ctaBody', type: 'textarea' as const },
  { name: 'ctaPrimaryLabel', type: 'text' as const },
  { name: 'ctaPrimaryHref', type: 'text' as const },
  { name: 'ctaSecondaryLabel', type: 'text' as const },
  { name: 'ctaSecondaryHref', type: 'text' as const },
]

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Logo: '/src/components/admin/Logo.tsx#Logo',
        Icon: '/src/components/admin/Icon.tsx#Icon',
      },
    },
    importMap: {
      baseDir: dirname,
    },
    user: 'Users',
  },
  collections: [
    {
      slug: 'Users',
      admin: {
        description: 'Manage admin accounts and login access for the CMS.',
        group: 'Administration',
        useAsTitle: 'email',
      },
      auth: true,
      fields: [],
    },
    {
      slug: 'Media',
      admin: {
        description: 'Upload and organise website images before using them on pages.',
        group: 'Website Content',
      },
      labels: {
        singular: 'Media Item',
        plural: 'Media Library',
      },
      upload: {
        staticDir: path.resolve(dirname, 'public/Media'),
      },
      fields: [
        {
          admin: {
            description: 'Describe the image for accessibility and SEO.',
          },
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'CourseItems',
      labels: {
        singular: 'Course',
        plural: 'Courses',
      },
      admin: {
        description: 'Manage the course catalogue shown on the Courses page.',
        group: 'Academic Content',
        livePreview: {
          url: () => joinSiteUrl('/courses'),
        },
        preview: () => joinSiteUrl('/courses'),
        useAsTitle: 'name',
      },
      fields: [
        {
          admin: {
            description: 'This is the course title shown on the public website.',
          },
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          admin: {
            description: 'Choose the academic level used for filtering on the Courses page.',
          },
          name: 'level',
          type: 'select',
          options: ['IGCSE', 'IELTS', 'Level 3', 'Level 4', 'Level 5', 'Level 4 & 5', 'Level 6', 'Level 7'],
          required: true,
        },
        {
          admin: {
            description: 'Optional: add a short credits label such as 60 Credits.',
          },
          name: 'credits',
          type: 'text',
        },
      ],
    },
    {
      slug: 'Programmes',
      admin: {
        description: 'Manage the study programme cards shown on the Study page.',
        group: 'Academic Content',
        livePreview: {
          url: () => joinSiteUrl('/study'),
        },
        preview: () => joinSiteUrl('/study'),
        useAsTitle: 'title',
      },
      labels: {
        singular: 'Programme',
        plural: 'Programmes',
      },
      fields: [
        {
          admin: {
            description: 'Select the programme type shown on the public Study page.',
          },
          name: 'level',
          type: 'select',
          options: ['BA Pathway', 'MBA Pathway'],
          required: true,
        },
        {
          admin: {
            description: 'This is the main programme title shown to visitors.',
          },
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          admin: {
            description: 'A short paragraph that explains the programme.',
          },
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          admin: {
            description: 'Add the bullet points shown inside each programme card.',
          },
          name: 'features',
          type: 'array',
          fields: [{ name: 'feature', type: 'text' }],
        },
      ],
    },
    {
      slug: 'Pages',
      admin: {
        description: 'Edit the main website pages such as About, Services, Contact, Courses, and Study.',
        group: 'Website Content',
        livePreview: {
          url: ({ data }) => joinSiteUrl(getPagePath(typeof data?.slug === 'string' ? data.slug : undefined)),
        },
        preview: (doc) => joinSiteUrl(getPagePath(typeof doc?.slug === 'string' ? doc.slug : undefined)),
        useAsTitle: 'title',
      },
      labels: {
        singular: 'Website Page',
        plural: 'Website Pages',
      },
      fields: [
        {
          admin: {
            description: 'Internal page name for editors.',
          },
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          admin: {
            description: 'Choose which website page this content entry controls.',
          },
          name: 'slug',
          label: 'Page Identifier',
          type: 'select',
          options: ['about', 'services', 'why-choose', 'contact', 'courses', 'study'],
          unique: true,
          required: true,
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Hero & CTA',
              admin: {
                description: 'Controls the top banner text and the main call-to-action buttons shown on this page.',
              },
              fields: [
                { name: 'heroBadge', type: 'text', admin: { description: 'Optional badge text displayed above the hero title.' } },
                { name: 'heroTitle', type: 'text', admin: { description: 'Main heading shown at the top of the page.' } },
                { name: 'heroSubtitle', type: 'textarea', admin: { description: 'Supporting text shown below the hero title.' } },
                {
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'Media',
                  admin: {
                    description: 'Optional background image for the page hero. For EnidPath, prefer imagery featuring African students when it fits the page.',
                  },
                },
                ...ctaFields,
              ],
            },
            {
              label: 'About',
              admin: {
                description: 'Controls the company overview, mission, vision, values, and partnership section on the About page.',
                condition: pageTabCondition('about'),
              },
              fields: [
                { name: 'overviewTitle', type: 'text' },
                paragraphItemsField('overviewParagraphs', 'Overview Paragraphs'),
                { name: 'missionTitle', type: 'text' },
                { name: 'missionBody', type: 'textarea' },
                { name: 'visionTitle', type: 'text' },
                { name: 'visionBody', type: 'textarea' },
                { name: 'valuesSectionTitle', type: 'text' },
                { name: 'valuesSectionSubtitle', type: 'textarea' },
                {
                  name: 'coreValues',
                  type: 'array',
                  fields: [
                    { name: 'icon', type: 'select', options: iconOptions },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
                { name: 'partnershipTitle', type: 'text' },
                { name: 'partnershipBody', type: 'textarea' },
                { name: 'partnershipButtonLabel', type: 'text' },
                { name: 'partnershipButtonHref', type: 'text' },
              ],
            },
            {
              label: 'Services',
              admin: {
                description: 'Controls the services grid, process steps, and support messaging on the Services page.',
                condition: pageTabCondition('services'),
              },
              fields: [
                { name: 'serviceNoteText', type: 'textarea' },
                { name: 'servicesSectionTitle', type: 'text' },
                { name: 'servicesSectionSubtitle', type: 'textarea' },
                {
                  name: 'serviceCards',
                  type: 'array',
                  fields: [
                    { name: 'icon', type: 'select', options: iconOptions },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    textItemsField('features', 'Features'),
                  ],
                },
                { name: 'processSectionTitle', type: 'text' },
                { name: 'processSectionSubtitle', type: 'textarea' },
                {
                  name: 'processSteps',
                  type: 'array',
                  fields: [
                    { name: 'step', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
              ],
            },
            {
              label: 'Why Choose Us',
              admin: {
                description: 'Controls the reasons, student expectations, testimonial, and commitment areas on the Why Choose Us page.',
                condition: pageTabCondition('why-choose'),
              },
              fields: [
                { name: 'reasonsSectionTitle', type: 'text' },
                { name: 'reasonsSectionSubtitle', type: 'textarea' },
                {
                  name: 'reasons',
                  type: 'array',
                  fields: [
                    { name: 'icon', type: 'select', options: iconOptions },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
                { name: 'expectationsTitle', type: 'text' },
                { name: 'expectationsBody', type: 'textarea' },
                textItemsField('expectationPoints', 'Expectation Points'),
                { name: 'testimonialQuote', type: 'textarea' },
                { name: 'testimonialAuthor', type: 'text' },
                { name: 'testimonialRole', type: 'text' },
                { name: 'commitmentTitle', type: 'text' },
                { name: 'commitmentBody', type: 'textarea' },
                textItemsField('commitmentBadges', 'Commitment Badges'),
              ],
            },
            {
              label: 'Contact',
              admin: {
                description: 'Controls the contact form intro, contact information section, WhatsApp copy, and trust banner on the Contact page.',
                condition: pageTabCondition('contact'),
              },
              fields: [
                { name: 'formTitle', type: 'text' },
                { name: 'formSubtitle', type: 'textarea' },
                { name: 'contactInfoTitle', type: 'text' },
                { name: 'contactInfoSubtitle', type: 'textarea' },
                { name: 'whatsappTitle', type: 'text' },
                { name: 'whatsappBody', type: 'textarea' },
                { name: 'trustBannerText', type: 'textarea' },
              ],
            },
            {
              label: 'Courses',
              admin: {
                description: 'Controls the course page filter label, level descriptions, and the disclaimer shown below the course listings.',
                condition: pageTabCondition('courses'),
              },
              fields: [
                { name: 'filterLabel', type: 'text' },
                {
                  name: 'levelDescriptions',
                  type: 'array',
                  fields: [
                    {
                      name: 'level',
                      type: 'select',
                      options: ['IGCSE', 'IELTS', 'Level 3', 'Level 4', 'Level 5', 'Level 4 & 5', 'Level 6', 'Level 7'],
                      required: true,
                    },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
                { name: 'disclaimerText', type: 'textarea' },
              ],
            },
            {
              label: 'Study',
              admin: {
                description: 'Controls the OBS notice, about section, benefits, and affordability messaging on the Study page.',
                condition: pageTabCondition('study'),
              },
              fields: [
                { name: 'noticeTitle', type: 'text' },
                { name: 'noticeBody', type: 'textarea' },
                { name: 'aboutTitle', type: 'text' },
                paragraphItemsField('aboutParagraphs', 'About Paragraphs'),
                { name: 'programmesSectionTitle', type: 'text' },
                { name: 'programmesSectionSubtitle', type: 'textarea' },
                { name: 'benefitsSectionTitle', type: 'text' },
                { name: 'benefitsSectionSubtitle', type: 'textarea' },
                {
                  name: 'studyBenefits',
                  type: 'array',
                  fields: [
                    { name: 'icon', type: 'select', options: iconOptions },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
                { name: 'affordabilityTitle', type: 'text' },
                { name: 'affordabilityBody', type: 'textarea' },
              ],
            },
            {
              label: 'Extra Content',
              admin: {
                description: 'Optional rich text content reserved for future flexible content or custom page additions.',
              },
              fields: [{ name: 'content', type: 'richText' }],
            },
          ],
        },
      ],
    },
  ],
  globals: [
    {
      slug: 'HomeSettings',
      admin: {
        description: 'Control the homepage hero, stats, feature cards, and homepage CTA sections.',
        group: 'Website Content',
        livePreview: {
          url: () => joinSiteUrl('/'),
        },
        preview: () => joinSiteUrl('/'),
      },
      label: 'Home Page',
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Hero',
              admin: {
                description: 'Controls the homepage hero heading, background image, trust indicators, and stats strip.',
              },
              fields: [
                {
                  admin: {
                    description: 'Main heading shown on the homepage hero section.',
                  },
                  name: 'heroTitle',
                  type: 'text',
                  required: true,
                  defaultValue: 'Your Gateway to UK Higher Education',
                },
                {
                  admin: {
                    description: 'Supporting text shown below the homepage hero title.',
                  },
                  name: 'heroSubtitle',
                  type: 'textarea',
                  required: true,
                  defaultValue: 'Access affordable, accredited BA and MBA pathway programmes from Online Business School (UK).',
                },
                {
                  admin: {
                    description: 'Select the image displayed in the homepage hero background.',
                  },
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'Media',
                },
                textItemsField('trustIndicators', 'Trust Indicators'),
                {
                  name: 'stats',
                  type: 'array',
                  fields: [
                    { name: 'value', type: 'text' },
                    { name: 'label', type: 'text' },
                    { name: 'sublabel', type: 'text' },
                  ],
                },
              ],
            },
            {
              label: 'Features',
              admin: {
                description: 'Controls the feature cards that explain the value of partnering with EnidPath on the homepage.',
              },
              fields: [
                { name: 'featuresSectionTitle', type: 'text' },
                { name: 'featuresSectionSubtitle', type: 'textarea' },
                {
                  name: 'features',
                  type: 'array',
                  fields: [
                    { name: 'icon', type: 'select', options: iconOptions },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
              ],
            },
            {
              label: 'Partnership & CTA',
              admin: {
                description: 'Controls the homepage partnership message, badges, and closing call-to-action section.',
              },
              fields: [
                { name: 'partnershipTitle', type: 'text' },
                { name: 'partnershipBody', type: 'textarea' },
                textItemsField('partnershipBadges', 'Partnership Badges'),
                ...ctaFields,
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'SiteSettings',
      admin: {
        description: 'Manage shared business details, navigation links, and footer content used across the website.',
        group: 'Business Settings',
        livePreview: {
          url: () => joinSiteUrl('/'),
        },
        preview: () => joinSiteUrl('/'),
      },
      label: 'Site Settings',
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Branding',
              admin: {
                description: 'Controls the site name and key header branding labels used across the website.',
              },
              fields: [
                { name: 'siteTitle', type: 'text', defaultValue: 'EnidPath International' },
                { name: 'siteShortName', type: 'text', defaultValue: 'EnidPath' },
                { name: 'siteSuffix', type: 'text', defaultValue: 'International' },
                { name: 'headerPartnerLabel', type: 'text', defaultValue: 'Online Business School (UK)' },
                { name: 'headerCtaLabel', type: 'text', defaultValue: 'Start Your Journey' },
              ],
            },
            {
              label: 'Contact',
              admin: {
                description: 'Controls the business contact details and office hours shown across the website.',
              },
              fields: [
                { name: 'contactEmail', type: 'text' },
                { name: 'contactPhone', type: 'text' },
                { name: 'whatsappNumber', type: 'text' },
                { name: 'address', type: 'textarea' },
                textItemsField('officeHours', 'Office Hours'),
              ],
            },
            {
              label: 'Navigation',
              admin: {
                description: 'Controls the main header navigation and footer link groups used throughout the site.',
              },
              fields: [
                linkItemsField('headerNavigation', 'Header Navigation'),
                linkItemsField('footerQuickLinks', 'Footer Quick Links'),
                linkItemsField('footerResourceLinks', 'Footer Resource Links'),
              ],
            },
            {
              label: 'Footer',
              admin: {
                description: 'Controls the footer description, disclaimer, and external partner link.',
              },
              fields: [
                { name: 'footerDescription', type: 'textarea' },
                { name: 'footerPartnerLabel', type: 'text', defaultValue: 'Online Business School (UK)' },
                { name: 'footerDisclaimer', type: 'textarea' },
                { name: 'footerExternalLabel', type: 'text', defaultValue: 'Online Business School' },
                { name: 'footerExternalHref', type: 'text', defaultValue: 'https://www.onlinebusinessschool.com' },
              ],
            },
          ],
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'super-secret-key-123',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1/enidpath',
    connectOptions: {
      connectTimeoutMS: getMongoTimeoutMs(),
      serverSelectionTimeoutMS: getMongoTimeoutMs(),
      socketTimeoutMS: getMongoTimeoutMs(),
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        Media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
    importExportPlugin({
      enabled: true,
      excludeCollections: ['Users'],
    }),
  ],
  sharp,
})
