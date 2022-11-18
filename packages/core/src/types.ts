export type Awaitable<T> = T | Promise<T>
export type AutoCompleteTemplate = string
export type AutoCompleteFunction = (input: string) => Awaitable<string[]>

export interface UserConfig {

}

export interface UserConfigDefaults {

}

export interface ResolvedConfig {

}
