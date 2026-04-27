import ApiConfig from "../config/ApiConfig"


export type MetricRow = {
  user_id: number
  k1: number
  k3: number
  k5: number
}

export type EvaluationSummary = {
  precision: number
  recall: number
  f1_score: number
  map: number
}

export type EvaluationByK = {
  k: number
  precision: number
  recall: number
  f1_score: number
}

export type SyncResponse = {
  message: string
  total_rows: number
  summary_by_k: EvaluationByK[]
  global_summary: EvaluationSummary
}


async function fetchJSON(url: string, options?: RequestInit) {
  const res = await fetch(url, options)
  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.message || "Request failed")
  }

  return data
}


class EvaluationService {

  static async syncEvaluation(): Promise<SyncResponse> {
    const data = await fetchJSON(
      `${ApiConfig.BASE_URL}/evaluation/sync`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    return {
      message: data?.message || "Success",
      total_rows: data?.total_rows || 0,
      summary_by_k: data?.summary_by_k || [],
      global_summary: data?.global_summary || {
        precision: 0,
        recall: 0,
        f1_score: 0,
        map: 0
      }
    }
  }

  private static async getMetric(endpoint: string): Promise<MetricRow[]> {
    const data = await fetchJSON(`${ApiConfig.BASE_URL}${endpoint}`)

    if (!Array.isArray(data)) return []

    return data.map((row: unknown) => {
      const r = row as Record<string, unknown>

      return {
        user_id: Number(r.user_id),
        k1: Number(r.k1 ?? 0),
        k3: Number(r.k3 ?? 0),
        k5: Number(r.k5 ?? 0)
      }
    })
  }


  static async getRecall(): Promise<MetricRow[]> {
    return this.getMetric("/evaluation/recall")
  }

  static async getPrecision(): Promise<MetricRow[]> {
    return this.getMetric("/evaluation/precision")
  }

  static async getF1(): Promise<MetricRow[]> {
    return this.getMetric("/evaluation/f1")
  }

  static async getMAP(): Promise<MetricRow[]> {
    return this.getMetric("/evaluation/ap")
  }
}

export default EvaluationService