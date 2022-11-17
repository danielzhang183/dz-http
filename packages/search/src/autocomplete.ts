import type { HttpGenerator } from '@dz-http/core'

export function createAutocomplete(http: HttpGenerator) {
  reset()

  return {
    suggest,
    suggestInFile,
    cache,
    reset,
  }

  async function suggest() {

  }

  async function suggestInFile() {

  }

  function reset() {

  }

  function cache() {

  }
}
