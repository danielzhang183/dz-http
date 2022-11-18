import { version } from '../../package.json'
import { resolveConfig } from '../config'
import type { ResolvedConfig, UserConfig, UserConfigDefaults } from '../types'
import { createNanoEvents } from '../utils/events'

// interface StringifiedUtil {

// }

export class HttpGenerator {
  public version = version
  // private _cache = new Map<string, StringifiedUtil[] | null>()
  public config: ResolvedConfig
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
}
