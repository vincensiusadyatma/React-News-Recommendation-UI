import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import EvaluationService from "../../services/EvaluationService"

type MapRow = {
  user_id: number
  k1: number
  k3: number
  k5: number
}

const MapPage = () => {
  const [data, setData] = useState<MapRow[]>([])
  const [mapValue, setMapValue] = useState<number>(0) // ✅ GLOBAL MAP
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // =========================
      // GET AP PER USER
      // =========================
      const result = await EvaluationService.getMAP()

      if (!Array.isArray(result)) {
        throw new Error("Format data tidak valid")
      }

      const safeData: MapRow[] = result.map((row: any) => ({
        user_id: Number(row.user_id),
        k1: Number(row.k1 ?? 0),
        k3: Number(row.k3 ?? 0),
        k5: Number(row.k5 ?? 0)
      }))

      setData(safeData)

      // =========================
      // HITUNG MAP GLOBAL (dari data frontend)
      // =========================
      let total = 0
      let count = 0

      safeData.forEach((row) => {
        total += row.k1 + row.k3 + row.k5
        count += 3
      })

      const map = count > 0 ? total / count : 0
      setMapValue(map)

    } catch (err) {
      console.error("MAP ERROR:", err)
      setError("Gagal mengambil data Average Precision")
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout func={() => {}}>

      <div className="px-6 py-10 max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-white text-2xl font-bold mb-6">
          Average Precision per K
        </h1>

        {/* ========================= */}
        {/* MAP CARD */}
        {/* ========================= */}
        {!loading && !error && (
          <div className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl shadow-lg">
            <h2 className="text-white text-sm mb-2">
              Mean Average Precision (MAP)
            </h2>
            <div className="text-white text-3xl font-bold">
              {(mapValue * 100).toFixed(2)}%
            </div>
          </div>
        )}

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

                    <td className="px-4 py-3 text-center text-purple-400 font-semibold">
                      {row.k1.toFixed(3)}
                    </td>

                    <td className="px-4 py-3 text-center text-indigo-400 font-semibold">
                      {row.k3.toFixed(3)}
                    </td>

                    <td className="px-4 py-3 text-center text-pink-400 font-semibold">
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

export default MapPage