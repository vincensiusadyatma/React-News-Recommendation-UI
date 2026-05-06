export type UserMetricDetail = {
  user_id: number
  precision: Record<string, number>
  recall: Record<string, number>
  f1_score: Record<string, number>
  average_precision: Record<string, number>
  map: number
}