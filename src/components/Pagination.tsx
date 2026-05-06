import type { PaginationPropsType } from "../Types/PaginationPropsType"

const Pagination = ({ page, totalPage, setPage }: PaginationPropsType) => {

  const generatePages = () => {
    const pages: (number | string)[] = []

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i)
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPage)
      } else if (page >= totalPage - 2) {
        pages.push(1, "...", totalPage - 3, totalPage - 2, totalPage - 1, totalPage)
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPage)
      }
    }

    return pages
  }

  const pages = generatePages()

  return (
    <div className="flex justify-center items-center gap-2 mt-10 text-white">

      {/* PREV */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {pages.map((p, index) => (
        <button
          key={index}
          onClick={() => typeof p === "number" && setPage(p)}
          disabled={p === "..."}
          className={`
            px-3 py-2 rounded-lg border transition
            ${p === page
              ? "bg-white text-black border-white"
              : "bg-white/10 border-white/20 hover:bg-white/20 text-white"
            }
            ${p === "..." && "cursor-default opacity-50"}
          `}
        >
          {p}
        </button>
      ))}

      {/* NEXT */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPage}
        className="px-3 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next
      </button>

    </div>
  )
}

export default Pagination