import type { ProjectStatus } from '@/data/types'

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  shipped: '已上线',
  'in-progress': '进行中',
  archived: '已归档',
  concept: '概念设计',
}

export const STATUS_TONE: Record<ProjectStatus, 'brand' | 'neutral' | 'success' | 'warning'> = {
  shipped: 'success',
  'in-progress': 'brand',
  archived: 'neutral',
  concept: 'warning',
}
