export interface MetricCard {
  title: string
  value: string
  change: number
  isPositive: boolean
  icon: React.ReactNode
  color: string
}

export interface RecentOrder {
  id: string
  customer: string
  date: string
  amount: number
  status: 'completed' | 'processing' | 'pending'
}

export interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  growth: number
}

export interface SalesData {
  month: string
  sales: number
  revenue: number
}
