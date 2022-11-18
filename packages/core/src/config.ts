import type { ResolvedConfig, UserConfig, UserConfigDefaults } from './types'

export function resolveConfig(
  userConfig: UserConfig = {},
  defaults: UserConfigDefaults = {},
): ResolvedConfig {
  const config = Object.assign({}, defaults, userConfig) as UserConfigDefaults

  return config
}
