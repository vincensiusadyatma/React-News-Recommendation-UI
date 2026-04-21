import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import MainLayout from "../layouts/MainLayout"
import { GetNewsDetail, GetRecommendation, SubmitFeedback } from "../services/NewsService"
import type { NewsType } from "../Types/NewsType"
import NewsModal from "../components/NewsModal"
import NewsRankModal from "../components/NewsRankModal"

type UCBItem = {
  news_id: number
  title: string
  score?: number
}

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

const NewsDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [news, setNews] = useState<NewsType | null>(null)
  const [recommendations, setRecommendations] = useState<NewsType[]>([])
  const [loading, setLoading] = useState(true)


  const [selectedNews, setSelectedNews] = useState<NewsType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)

 
  const [allRanked, setAllRanked] = useState<RankedItem[]>([])
  const [openRanked, setOpenRanked] = useState(false)


  const [feedbacks, setFeedbacks] = useState<Record<number, number>>({})
  const [submitting, setSubmitting] = useState(false)

  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (!id) return

        const newsId = Number(id)

   
        const data = await GetNewsDetail(newsId)
        setNews(data)

    
        const reco = await GetRecommendation(newsId, 3)

        if (!reco) return


        if (reco.recommendations) {
          const normalized: NewsType[] = reco.recommendations.map(
            (item: UCBItem) => ({
              id: item.news_id,
              title: item.title,
              content: ""
            })
          )
          setRecommendations(normalized)
        }

     
        if (reco.all_ranked) {
          setAllRanked(reco.all_ranked)
        }

      } catch (error) {
        console.log("FETCH ERROR:", error)
        setRecommendations([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])


  const handleFeedback = (newsId: number, value: number) => {
    setFeedbacks(prev => ({
      ...prev,
      [newsId]: value
    }))
  }

  const handleSubmitFeedback = async () => {
    const entries = Object.entries(feedbacks)
    if (entries.length === 0) return

    try {
      setSubmitting(true)

      await Promise.all(
        entries.map(([newsId, feedback]) =>
          SubmitFeedback(1, Number(newsId), feedback)
        )
      )

      alert("Feedback berhasil dikirim")
      setFeedbacks({})

    } catch (err) {
      console.log(err)
      alert("Gagal kirim feedback")
    } finally {
      setSubmitting(false)
    }
  }

  // ================= MODAL =================
  const handleOpenModal = async (item: NewsType) => {
    if (!item.id) return

    try {
      setIsModalOpen(true)
      setModalLoading(true)
      setSelectedNews(null)

      const detail = await GetNewsDetail(item.id)
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

  // ================= LOADING =================
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

  // ================= MAIN =================
  return (
    <MainLayout func={() => {}}>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-400 hover:text-blue-300 text-sm"
        >
          ← Back
        </button>

        {/* ================= TITLE + LIKE DISLIKE ================= */}
        <div className="flex items-start justify-between mb-6 gap-4">

          <h1 className="text-3xl font-bold text-white leading-snug">
            {news.title}
          </h1>

          {news.id && (
            <div className="flex items-center gap-2 shrink-0 mt-1">

              {/* LIKE */}
              <button
                onClick={() => handleFeedback(news.id!, 1)}
                className={`px-2 py-1 rounded text-xs border transition cursor-pointer
                  ${
                    feedbacks[news.id!] === 1
                      ? "bg-green-400 text-black border-green-400"
                      : "border-green-400 text-green-400 hover:bg-green-400/20"
                  }`}
                title="Like"
              >
                👍
              </button>

              {/* DISLIKE */}
              <button
                onClick={() => handleFeedback(news.id!, 0)}
                className={`px-2 py-1 rounded text-xs border transition cursor-pointer
                  ${
                    feedbacks[news.id!] === 0
                      ? "bg-red-400 text-black border-red-400"
                      : "border-red-400 text-red-400 hover:bg-red-400/20"
                  }`}
                title="Dislike"
              >
                👎
              </button>

            </div>
          )}

        </div>

        {/* CONTENT */}
        <div className="text-blue-200 text-base leading-7 text-justify space-y-4">
          {(news.content || "").split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* ================= REKOMENDASI ================= */}
        <div className="mt-10">

          <h3 className="text-white text-lg font-semibold mb-4">
            Rekomendasi Berita
          </h3>

          {recommendations.length > 0 ? (
            <>
              <div className="flex flex-col gap-2">

                {recommendations.map((item) => {
                  if (!item.id) return null

                  return (
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

                        <button
                          onClick={() => handleFeedback(item.id!, 1)}
                          className={`px-1.5 py-0.5 rounded text-[11px] border 
                            ${
                              feedbacks[item.id!] === 1
                                ? "bg-green-400 text-black border-green-400"
                                : "border-green-400 text-green-400"
                            }`}
                        >
                          👍
                        </button>

                        <button
                          onClick={() => handleFeedback(item.id!, 0)}
                          className={`px-1.5 py-0.5 rounded text-[11px] border 
                            ${
                              feedbacks[item.id!] === 0
                                ? "bg-red-400 text-black border-red-400"
                                : "border-red-400 text-red-400"
                            }`}
                        >
                          👎
                        </button>

                      </div>
                    </div>
                  )
                })}

              </div>

              {Object.keys(feedbacks).length > 0 && (
                <div className="mt-4 text-right">
                  <button
                    onClick={handleSubmitFeedback}
                    disabled={submitting}
                    className={`px-4 py-2 rounded text-sm ${
                      submitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {submitting ? "Mengirim..." : "Submit Feedback"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-400 text-sm">
              Tidak ada rekomendasi
            </p>
          )}

        </div>
      </div>

  
      <button
        onClick={() => setOpenRanked(true)}
        className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg text-sm"
      >
        Rank
      </button>

      {/* MODALS */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedNews}
        loading={modalLoading}
      />

      <NewsRankModal
        isOpen={openRanked}
        onClose={() => setOpenRanked(false)}
        data={allRanked}
      />

    </MainLayout>
  )
}

export default NewsDetailPage