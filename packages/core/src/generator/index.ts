import { version } from '../../package.json'
import { resolveConfig } from '../config'
import type { ResolvedConfig, UserConfig, UserConfigDefaults } from '../types'
import { isString } from '../utils'
import { createNanoEvents } from '../utils/events'

interface StringifiedUtil {

}

export class HttpGenerator {
  public version = version
  private _cache = new Map<string, StringifiedUtil[] | null>()
  public config: ResolvedConfig
  public blocked = new Set<string>()
  public events = createNanoEvents<{
    config: (config: ResolvedConfig) => void
  }>()

  constructor(
    public userConfig: UserConfig = {},
    public defaults: UserConfigDefaults = {},
  ) {
    this.config = resolveConfig(userConfig, defaults)
    this.events.emit('config', this.config)
  }

  parseToken(raw: string) {
    if (this.blocked.has(raw))
      return

    const cacheKey = raw

    if (this._cache.has(cacheKey))
      return this._cache.get(cacheKey)

    if (this.isBlocked(raw)) {
      this.blocked.add(raw)
      this._cache.set(cacheKey, null)
    }
  }

  isBlocked(raw: string) {
    return !raw || this.config.blocklist.some(e => isString(e) ? e === raw : e.test(raw))
  }
}

export function createGenerator(
  config?: UserConfig,
  defaults?: UserConfigDefaults,
) {
  return new HttpGenerator(config, defaults)
}
