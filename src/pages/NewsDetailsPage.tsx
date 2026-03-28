import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import MainLayout from "../layouts/MainLayout"
import { GetNewsDetail, GetRecommendation } from "../services/NewsService"
import type { NewsType } from "../Types/NewsType"

const NewsDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [news, setNews] = useState<NewsType | null>(null)
  const [recommendations, setRecommendations] = useState<NewsType[]>([])
  const [loading, setLoading] = useState(true)


  const [selectedNews, setSelectedNews] = useState<NewsType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (!id) return

        const data = await GetNewsDetail(Number(id))
        setNews(data)

        const reco = await GetRecommendation(Number(id), 3)
        const normalized = reco.data.map((item: NewsType) => ({
          id: item.id,     
          title: item.title,
          content: ""    
        }))

        setRecommendations(normalized)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])


  const handleOpenModal = async (item: NewsType) => {
    try {
      setIsModalOpen(true)
      setModalLoading(true)
      setSelectedNews(null)

      const detail = await GetNewsDetail(Number(item.id))

      setSelectedNews(detail)

    } catch (err) {
      console.log(err)
    } finally {
      setModalLoading(false)
    }
  }


  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedNews(null)
    setModalLoading(false)
  }


  if (loading) {
    return (
      <MainLayout func={() => {}}>
        <div className="flex justify-center items-center h-[60vh] text-white text-lg">
          Loading news...
        </div>
      </MainLayout>
    )
  }


  if (!news) {
    return (
      <MainLayout func={() => {}}>
        <div className="flex justify-center items-center h-[60vh] text-white text-lg">
          News not found
        </div>
      </MainLayout>
    )
  }


  return (
    <MainLayout func={() => {}}>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-400 hover:text-blue-300 text-sm"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-white mb-6 leading-snug">
          {news.title}
        </h1>

        <div className="text-blue-200 text-base leading-7 text-justify space-y-4">
          {(news.content || "").split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>



        {/* ================= REKOMENDASI CARD================= */}
        <div className="mt-10">
          <h3 className="text-white text-lg font-semibold mb-4">
            Rekomendasi Berita
          </h3>

          {recommendations.length > 0 ? (
            <div className="flex flex-col gap-2">

              {recommendations.map((item: NewsType) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-white/30 rounded-md px-3 py-2 hover:bg-white/5 transition w-full"
                >
                  <h4 className="text-white text-sm font-medium line-clamp-1 flex-1 pr-4">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 shrink-0">

                    <button
                      onClick={() => handleOpenModal(item)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded text-[11px]"
                    >
                      Detail
                    </button>

                    <button className="border border-green-400 text-green-400 px-1.5 py-0.5 rounded text-[11px] hover:bg-green-400/10">
                      👍
                    </button>

                    <button className="border border-red-400 text-red-400 px-1.5 py-0.5 rounded text-[11px] hover:bg-red-400/10">
                      👎
                    </button>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <p className="text-gray-400 text-sm">Tidak ada rekomendasi</p>
          )}

        </div>

      </div>

      {/* ================= MODAL DETAIL ================= */}
      {isModalOpen && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#020a1a] max-w-2xl w-full mx-4 rounded-lg p-6 border border-white/20 shadow-lg"
          >

            {/* HEADER */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-white text-xl font-semibold">
                {selectedNews?.title || "Loading..."}
              </h2>

              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="text-blue-200 text-sm leading-6 max-h-[60vh] overflow-y-auto space-y-3">

              {(modalLoading || !selectedNews) ? (
                <p className="text-gray-400">Loading...</p>
              ) : (
                selectedNews.content.split("\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))
              )}

            </div>

            {/* FOOTER */}
            <div className="mt-6 text-right">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm"
              >
                Tutup
              </button>
            </div>

          </div>

        </div>
      )}

    </MainLayout>
  )
}

export default NewsDetailPage