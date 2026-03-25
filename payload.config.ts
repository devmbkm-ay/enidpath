import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
    importMap: {
      baseDir: dirname,
    },
    user: 'Users',
  },
  collections: [
    {
      slug: 'Users',
      auth: true,
      fields: [],
    },
    {
      slug: 'Media',
      upload: true,
      fields: [
        {
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
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'level',
          type: 'select',
          options: ['IGCSE', 'IELTS', 'Level 3', 'Level 4', 'Level 5', 'Level 4 & 5', 'Level 6', 'Level 7'],
          required: true,
        },
        {
          name: 'credits',
          type: 'text',
        },
      ],
    },
    {
      slug: 'Programmes',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        { name: 'level', type: 'select', options: ['BA Pathway', 'MBA Pathway'], required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'features',
          type: 'array',
          fields: [{ name: 'feature', type: 'text' }],
        },
      ],
    },
    {
      slug: 'Pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'slug',
          type: 'select',
          options: ['about', 'services', 'why-choose', 'contact', 'courses', 'study'],
          unique: true,
          required: true,
        },
        { name: 'heroBadge', type: 'text' },
        { name: 'heroTitle', type: 'text' },
        { name: 'heroSubtitle', type: 'textarea' },
        { name: 'content', type: 'richText' },

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

        { name: 'formTitle', type: 'text' },
        { name: 'formSubtitle', type: 'textarea' },
        { name: 'contactInfoTitle', type: 'text' },
        { name: 'contactInfoSubtitle', type: 'textarea' },
        { name: 'whatsappTitle', type: 'text' },
        { name: 'whatsappBody', type: 'textarea' },
        { name: 'trustBannerText', type: 'textarea' },

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

        ...ctaFields,
      ],
    },
  ],
  globals: [
    {
      slug: 'HomeSettings',
      label: 'Home Page',
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          required: true,
          defaultValue: 'Your Gateway to UK Higher Education',
        },
        {
          name: 'heroSubtitle',
          type: 'textarea',
          required: true,
          defaultValue: 'Access affordable, accredited BA and MBA pathway programmes from Online Business School (UK).',
        },
        {
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
        { name: 'partnershipTitle', type: 'text' },
        { name: 'partnershipBody', type: 'textarea' },
        textItemsField('partnershipBadges', 'Partnership Badges'),
        ...ctaFields,
      ],
    },
    {
      slug: 'SiteSettings',
      label: 'Site Settings',
      fields: [
        { name: 'siteTitle', type: 'text', defaultValue: 'EnidPath International' },
        { name: 'siteShortName', type: 'text', defaultValue: 'EnidPath' },
        { name: 'siteSuffix', type: 'text', defaultValue: 'International' },
        { name: 'headerPartnerLabel', type: 'text', defaultValue: 'Online Business School (UK)' },
        { name: 'headerCtaLabel', type: 'text', defaultValue: 'Start Your Journey' },
        { name: 'contactEmail', type: 'text' },
        { name: 'contactPhone', type: 'text' },
        { name: 'whatsappNumber', type: 'text' },
        { name: 'address', type: 'textarea' },
        textItemsField('officeHours', 'Office Hours'),
        { name: 'footerDescription', type: 'textarea' },
        { name: 'footerPartnerLabel', type: 'text', defaultValue: 'Online Business School (UK)' },
        { name: 'footerDisclaimer', type: 'textarea' },
        linkItemsField('headerNavigation', 'Header Navigation'),
        linkItemsField('footerQuickLinks', 'Footer Quick Links'),
        linkItemsField('footerResourceLinks', 'Footer Resource Links'),
        { name: 'footerExternalLabel', type: 'text', defaultValue: 'Online Business School' },
        { name: 'footerExternalHref', type: 'text', defaultValue: 'https://www.onlinebusinessschool.com' },
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
  }),
  sharp,
})
