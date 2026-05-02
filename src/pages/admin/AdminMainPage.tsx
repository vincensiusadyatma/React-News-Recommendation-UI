import { useNavigate } from "react-router"
import { useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import EvaluationService from "../../services/EvaluationService"

const AdminMainPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSync = async () => {
    try {
      setLoading(true)

      const result = await EvaluationService.syncEvaluation()

     
      if (!result || !result.global_summary) {
        throw new Error("Response tidak valid dari server")
      }

      const { precision, recall, f1_score, map } = result.global_summary


      const perKText = result.summary_by_k
        .map(k => `K=${k.k} → P:${k.precision.toFixed(2)} R:${k.recall.toFixed(2)}`)
        .join("\n")

      alert(
        `Sync Berhasil!\n\n` +

        `=== GLOBAL ===\n` +
        `Precision : ${precision.toFixed(3)}\n` +
        `Recall    : ${recall.toFixed(3)}\n` +
        `F1 Score  : ${f1_score.toFixed(3)}\n` +
        `MAP       : ${map.toFixed(3)}\n\n` +

        `=== PER K ===\n${perKText}\n\n` +

        `Total Rows: ${result.total_rows}`
      )

    } catch (err) {
      console.error("SYNC ERROR:", err)

      if (err instanceof Error) {
        alert(`${err.message}`)
      } else {
        alert("Gagal sync evaluation")
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout func={() => {}}>

      <div className="px-6 py-10 max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-bold">
            Evaluation Dashboard
          </h1>

          <button
            onClick={handleSync}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                loading
                  ? "bg-slate-600 text-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg hover:scale-[1.02]"
              }`}
          >
            {loading ? "Syncing..." : "Sync Evaluation"}
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Card
            title="Precision"
            color="text-blue-400"
            onClick={() => navigate("/admin/precision")}
            icon={
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="14" cy="14" r="10"/>
                <path d="M14 8v6l4 2"/>
              </svg>
            }
          />

          <Card
            title="Recall"
            color="text-green-400"
            onClick={() => navigate("/admin/recall")}
            icon={
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 14a10 10 0 1 1 3 7"/>
                <polyline points="4 14 4 20 10 20"/>
              </svg>
            }
          />

          <Card
            title="Mean Average Precision"
            color="text-purple-400"
            onClick={() => navigate("/admin/map")}
            icon={
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="10" width="4" height="8"/>
                <rect x="10" y="6" width="4" height="12"/>
                <rect x="16" y="3" width="4" height="15"/>
              </svg>
            }
          />

          <Card
            title="F1 Score"
            color="text-red-400"
            onClick={() => navigate("/admin/f1")}
            icon={
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z"/>
                <path d="M4 12h16M12 4v16"/>
              </svg>
            }
          />
        <div className="md:col-span-2">
          <Card
            title="Manage News"
            color="text-indigo-400"
            onClick={() => navigate("/admin/manage")}
            icon={
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h10"/>
              </svg>
            }
          />
        </div>

        </div>

      </div>

    </MainLayout>
  )
}


type CardProps = {
  title: string
  color: string
  icon: React.ReactNode
  onClick: () => void
}

const Card = ({ title, color, icon, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#1e293b] border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
    >

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 text-sm">{title}</h3>
        <div className={color}>{icon}</div>
      </div>

      <div className={`text-lg font-semibold ${color}`}>
        View Detail →
      </div>

    </div>
  )
}

export default AdminMainPage