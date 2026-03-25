import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { getPayload } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootDir = path.resolve(dirname, '..')

const email = process.env.BOOTSTRAP_ADMIN_EMAIL
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD

if (!email || !password) {
  console.error(
    'Missing BOOTSTRAP_ADMIN_EMAIL or BOOTSTRAP_ADMIN_PASSWORD. Example: BOOTSTRAP_ADMIN_EMAIL=admin@example.com BOOTSTRAP_ADMIN_PASSWORD=change-me npm run payload:bootstrap-admin',
  )
  process.exit(1)
}

process.env.ROOT_DIR = rootDir

const { default: configPromise } = await import(
  pathToFileURL(path.resolve(rootDir, 'payload.config.ts')).href
)

const config = await configPromise
const payload = await getPayload({ config })

const existingUsers = await payload.find({
  collection: 'Users',
  limit: 1,
  overrideAccess: true,
})

if (existingUsers.totalDocs > 0) {
  console.log('A Payload admin user already exists. Skipping bootstrap.')
  process.exit(0)
}

const user = await payload.create({
  collection: 'Users',
  data: {
    email,
    password,
  },
  overrideAccess: true,
})

console.log(`Created first Payload admin user: ${user.email}`)
