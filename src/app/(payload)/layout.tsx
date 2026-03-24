import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

import './globals.css'
import config from '../../../payload.config'
import { importMap } from './admin/importMap'

const Layout = async ({ children }: { children: React.ReactNode }) => (
  <RootLayout
    config={Promise.resolve(config)}
    importMap={importMap}
    serverFunction={handleServerFunctions}
  >
    {children}
  </RootLayout>
)

export default Layout
