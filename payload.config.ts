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
      upload: true,
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
        { name: 'heroBadge', type: 'text', admin: { description: 'Optional badge text displayed above the hero title.' } },
        { name: 'heroTitle', type: 'text', admin: { description: 'Main heading shown at the top of the page.' } },
        { name: 'heroSubtitle', type: 'textarea', admin: { description: 'Supporting text shown below the hero title.' } },
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
      admin: {
        description: 'Control the homepage hero, stats, feature cards, and homepage CTA sections.',
        group: 'Website Content',
      },
      label: 'Home Page',
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
      admin: {
        description: 'Manage shared business details, navigation links, and footer content used across the website.',
        group: 'Business Settings',
      },
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
