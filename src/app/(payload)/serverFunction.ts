'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'

import configPromise from '@payload-config'
import { importMap } from './admin/importMap'

export const payloadAdminServerFunction: ServerFunctionClient = async (args) =>
  handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
