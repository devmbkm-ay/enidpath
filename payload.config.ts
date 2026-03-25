import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'select',
          options: ['about', 'services', 'why-choose', 'contact', 'courses'],
          unique: true,
          required: true,
        },
        {
          name: 'heroTitle',
          type: 'text',
        },
        {
          name: 'heroSubtitle',
          type: 'textarea',
        },
        {
          name: 'content',
          type: 'richText',
        },
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
      slug: 'SiteSettings',
      label: 'Site Settings',
      fields: [
        { name: 'siteTitle', type: 'text', defaultValue: 'EnidPath International' },
        { name: 'contactEmail', type: 'text' },
        { name: 'contactPhone', type: 'text' },
        { name: 'whatsappNumber', type: 'text' },
        { name: 'address', type: 'textarea' },
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
