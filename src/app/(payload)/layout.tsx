import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

import config from '../../../payload.config'
import { importMap } from './admin/importMap'

const payloadServerFunction = async (...args: Parameters<typeof handleServerFunctions>) => {
  'use server'

  return handleServerFunctions(...args)
}

const Layout = async ({ children }: { children: React.ReactNode }) => (
  <RootLayout
    config={Promise.resolve(config)}
    importMap={importMap}
    serverFunction={payloadServerFunction}
  >
    {children}
  </RootLayout>
)

export default Layout
