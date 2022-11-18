export

  export const defaultConfig = defineConfig<{}>({
    details: true,
    presets: [

    ],
  })

export default defineConfig<{}>({
  ...defaultConfig,
  presets: [
    ...defaultConfig.presets as any,
  ],
})
