import { useNavigate } from "react-router";
import type { NewsType } from "../Types/NewsType";

const NewsCard = ({id,title,content}:NewsType) => {
    const navigate = useNavigate()
   const handleReadMore = () => {
        navigate(`/news/${id}`)
    }
    return (
      <div className="max-w-md w-full border border-blue-900/40 rounded-xl p-6 bg-[#030f26] shadow-lg">
       
        <h2 className="text-white text-xl font-semibold mb-3 line-clamp-1">
          {title}
        </h2>

        <p className="text-blue-200 text-sm leading-relaxed mb-6 line-clamp-3">
       {content}
        </p>

        <button
         onClick={handleReadMore}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition">
          Read More
        </button>

      </div>
  
  );
}

export default NewsCard