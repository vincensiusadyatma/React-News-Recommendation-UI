import React from "react"
import { useNavigate } from "react-router"

type RankedItem = {
  news_id: number
  title: string
  cbf_score: number
  ucb_score: number
  mean_reward: number
  views: number
  clicks: number
  V_j: number
}

type Props = {
  isOpen: boolean
  onClose: () => void
  data: RankedItem[]
}

const NewsRankedModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleNavigate = (id: number) => {
    onClose()
    navigate(`/news/${id}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div className="relative bg-gray-900 text-white w-[90%] max-w-5xl max-h-[80vh] rounded-lg shadow-lg p-5 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            All Ranked Recommendation
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-auto max-h-[65vh] border border-white/10 rounded">
          <table className="w-full text-xs text-center border-collapse">
            {/* HEADER */}
            <thead className="bg-white/10 sticky top-0">
              <tr>
                <th className="px-2 py-2">No</th>
                <th className="px-2 py-2">Title</th>
                <th className="px-2 py-2">CBF</th>
                <th className="px-2 py-2">Views</th>
                <th className="px-2 py-2">UCB</th>
                <th className="px-2 py-2">Aksi</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {data.map((item, index) => {
                const isTop = index < 5
                return (
                  <tr
                    key={item.news_id}
                    className={`
                      transition
                      ${isTop 
                        ? "border-2 border-green-500 bg-green-500/10" 
                        : "border-t border-white/10 hover:bg-white/5"
                      }
                    `}
                  >
                    {/* RANK */}
                    <td className="px-2 py-1 font-semibold">
                      {index + 1}
                    </td>

                    {/* TITLE */}
                    <td className="px-2 py-1 max-w-[250px] truncate">
                      {item.title}
                    </td>

                    {/* CBF */}
                    <td className="px-2 py-1">
                      {item.cbf_score.toFixed(4)}
                    </td>

                    {/* VIEWS */}
                    <td className="px-2 py-1">
                      {item.views}
                    </td>

                    {/* UCB */}
                    <td className="px-2 py-1">
                      {item.ucb_score.toFixed(4)}
                    </td>

                    {/* AKSI */}
                  <td className="px-2 py-1 text-center">
                    <button
                      onClick={() => handleNavigate(item.news_id)}
                      className="text-blue-400 hover:text-blue-300 transition cursor-pointer"
                      title="Lihat Detail"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 inline-block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12 18 19.5 12 19.5 2.25 12 2.25 12z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </td>

                  </tr>
                )
              })}
            </tbody>
          </table>

          {data.length === 0 && (
            <div className="text-center text-gray-400 py-6">
              Tidak ada data ranking
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default NewsRankedModal