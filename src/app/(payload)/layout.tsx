import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import '@payloadcms/next/css'
import configPromise from '@payload-config'
import { importMap } from './admin/importMap'
import { payloadAdminServerFunction } from './serverFunction'

export const dynamic = 'force-dynamic'

type Args = {
  children: React.ReactNode
}

const Layout = async ({ children }: Args) => {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={payloadAdminServerFunction}
    >
      {children}
    </RootLayout>
  )
}

export default Layout
