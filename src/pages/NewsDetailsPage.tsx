import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import MainLayout from "../layouts/MainLayout"
import { GetNewsDetail } from "../services/NewsService"
import type { NewsType } from "../Types/NewsType"

const NewsDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [news, setNews] = useState<NewsType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (!id) return

        const data = await GetNewsDetail(Number(id))
        setNews(data)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

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
          className="mb-8 text-blue-400 hover:text-blue-300 transition"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-white mb-8 leading-snug">
          {news.title}
        </h1>

        <div className="text-blue-200 text-lg leading-8 text-justify space-y-5">
          {news.content.split("\n").map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>

      </div>

    </MainLayout>
  )
}

export default NewsDetailPage