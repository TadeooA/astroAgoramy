export type PlanItem = {
  id: number
  name: string
  price: string
  duration: string
  features: string[]
  isRecommended: boolean
  isPopular?: boolean
}

export type Benefit = {
  icon: any
  title: string
  description: string
}
