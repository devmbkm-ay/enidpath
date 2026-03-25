import { getPayload as getPayloadLocal } from 'payload'
import configPromise from '@payload-config'

/**
 * Global cache for Payload to avoid creating too many instances.
 */
let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

export const getPayload = async () => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayloadLocal({ config: configPromise })
  }

  try {
    cached.client = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.client
}
