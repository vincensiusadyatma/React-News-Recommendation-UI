import type { NewsType } from "../Types/NewsType"

type Props = {
  isOpen: boolean
  onClose: () => void
  data: NewsType | null
  loading: boolean
}

const NewsModal = ({ isOpen, onClose, data, loading }: Props) => {
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#020a1a] max-w-2xl w-full mx-4 rounded-lg p-6 border border-white/20 shadow-lg"
      >

        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-white text-xl font-semibold">
            {data?.title || "Loading..."}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="text-blue-200 text-sm leading-6 max-h-[60vh] overflow-y-auto scrollbar-hide space-y-3">
          {loading || !data ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            (data.content || "").split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsModal