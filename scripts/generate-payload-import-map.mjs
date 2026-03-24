import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { generateImportMap } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootDir = path.resolve(dirname, '..')

const { default: configPromise } = await import(pathToFileURL(path.resolve(rootDir, 'payload.config.ts')).href)
const config = await configPromise

process.env.ROOT_DIR = rootDir

await generateImportMap(config, { log: true })
