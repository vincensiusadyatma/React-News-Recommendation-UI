import type { EvaluationByK } from "./EvaluationByK"
import type { EvaluationSummary
    
 } from "./EvaluationSummary"
export type SyncResponse = {
  message: string
  total_rows: number
  summary_by_k: EvaluationByK[]
  global_summary: EvaluationSummary
}
