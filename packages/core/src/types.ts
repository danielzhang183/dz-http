export type FlatObjectTuple<T> = { [K in keyof T]: T[K] }
export type RequiredByKey<T, K extends keyof T = keyof T> = FlatObjectTuple<Required<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>

export type Awaitable<T> = T | Promise<T>
export type Arrayable<T> = T | T[]
export type AutoCompleteTemplate = string
export type AutoCompleteFunction = (input: string) => Awaitable<string[]>

export type BlocklistRule = string | RegExp
export type Feature = 'code' | 'header' | 'portocal' | 'security'

export interface Code {
  title: string
  body: string
  features: Array<Feature>
}

export interface Header {
  title: string
  body: string
  features: Array<Feature>
}

export interface Portocal {
  title: string
  body: string
  features: Array<Feature>
}

export interface Security {
  title: string
  body: string
  features: Array<Feature>
}

export interface ConfigBase {
  codes?: Code[]
  headers?: Header[]
  portocals?: Portocal[]
  securities?: Security[]
  /**
   * Rules to exclude the selectors for your design system (to narrow down the possibilities).
   */
  blocklist?: BlocklistRule[]
  autocomplete?: {
    /**
     * Custom functions / templates to provide autocomplete suggestions
     */
    templates?: Arrayable<AutoCompleteFunction | AutoCompleteTemplate>
  }
}

export interface UserConfig extends ConfigBase { }

export interface UserConfigDefaults extends ConfigBase { }

export interface ResolvedConfig extends Omit<
  RequiredByKey<UserConfig, 'codes' | 'headers' | 'portocals' | 'securities' | 'blocklist'>, 'autocomplete'
> {
  presets: Preset[]
  codes: Code[]
  headers: Header[]
  portocals: Portocal[]
  securities: Security[]
  autocomplete: {
    templates: (AutoCompleteFunction | AutoCompleteTemplate)[]
  }
}

export interface Preset extends ConfigBase {
  name: string
}
