import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import EvaluationService from "../../services/EvaluationService"

type RecallRow = {
  user_id: number
  k1: number
  k3: number
  k5: number
}

const RecallPage = () => {
  const [data, setData] = useState<RecallRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await EvaluationService.getRecall()

      setData(result)

    } catch (err) {
      console.error(err)
      setError("Gagal mengambil data recall")
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout func={() => {}}>

      <div className="px-6 py-10 max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-white text-2xl font-bold mb-6">
          Recall Evaluation
        </h1>

        {/* LOADING */}
        {loading && (
          <div className="text-gray-400">Loading...</div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="text-red-400">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && data.length === 0 && (
          <div className="text-gray-400">
            Tidak ada data
          </div>
        )}

        {/* TABLE */}
        {!loading && !error && data.length > 0 && (
          <div className="overflow-x-auto">

            <table className="w-full border border-white/10 rounded-xl overflow-hidden">

              {/* HEADER */}
              <thead className="bg-[#1e293b] text-gray-300 text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">User ID</th>
                  <th className="px-4 py-3 text-center">K = 1</th>
                  <th className="px-4 py-3 text-center">K = 3</th>
                  <th className="px-4 py-3 text-center">K = 5</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="text-gray-200 text-sm">

                {data.map((row) => (
                  <tr
                    key={row.user_id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3">
                      {row.user_id}
                    </td>

                    <td className="px-4 py-3 text-center text-green-400 font-medium">
                      {row.k1.toFixed(3)}
                    </td>

                    <td className="px-4 py-3 text-center text-blue-400 font-medium">
                      {row.k3.toFixed(3)}
                    </td>

                    <td className="px-4 py-3 text-center text-purple-400 font-medium">
                      {row.k5.toFixed(3)}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </MainLayout>
  )
}

export default RecallPage