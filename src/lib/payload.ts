import { getPayload as getPayloadLocal } from 'payload'

import configPromise from '@payload-config'

export const getPayload = async () => getPayloadLocal({ config: configPromise })
