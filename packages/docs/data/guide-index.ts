
import type { GuideItem } from 'types'

export const guideIndex: GuideItem[] = [
  {
  type: "guide",
  name: "codes",
  title: "Response Status code",
  keywords: ["response","status","code"],
  component: () => import('../guides/codes.md')
},
  {
  type: "guide",
  name: "comparison",
  title: "Protocal Comparison",
  keywords: ["http","protocal","comparison"],
  component: () => import('../guides/comparison.vue')
},
  {
  type: "guide",
  name: "headers",
  title: "Header Fields",
  keywords: ["header"],
  component: () => import('../guides/headers.md')
}
]

