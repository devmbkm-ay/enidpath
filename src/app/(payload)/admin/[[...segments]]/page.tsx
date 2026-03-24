import { RootPage } from '@payloadcms/next/views'

import config from '../../../../../payload.config'
import { importMap } from '../importMap'

type PageProps = {
  params: Promise<{
    segments?: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

const Page = async ({ params, searchParams }: PageProps) => {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  return (
    <RootPage
      config={Promise.resolve(config)}
      importMap={importMap}
      params={Promise.resolve({
        segments: Array.isArray(resolvedParams.segments) ? resolvedParams.segments : [],
      })}
      searchParams={Promise.resolve(
        Object.fromEntries(
          Object.entries(resolvedSearchParams).filter(([, value]) => value !== undefined),
        ) as Record<string, string | string[]>,
      )}
    />
  )
}

export default Page
