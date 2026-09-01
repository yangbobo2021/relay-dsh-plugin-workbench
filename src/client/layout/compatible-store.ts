import type * as Store from '@deepseek-ai/dsh-client-store'

// The public synchronous module resolver is supplied by DSH's client factory.
declare const require: (name: string) => typeof Store
let store: typeof Store
try {
  store = require('@deepseek-ai/dsh-client-store')
} catch (error) {
  // Only an absent table entry permits a fallback. Do not hide initialization errors.
  if (!(error instanceof Error) || !error.message.includes('require("@deepseek-ai/dsh-client-store") missed the module table')) throw error
  store = require('@deepseek-ai/dsh-client-runtime/client')
}
export const defineStore: typeof Store.defineStore = store.defineStore
