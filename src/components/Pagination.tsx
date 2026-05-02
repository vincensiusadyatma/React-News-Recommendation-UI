import type { PaginationPropsType } from "../Types/PaginationPropsType"

const Pagination = ({ page, totalPage, setPage }: PaginationPropsType) => {

  const pages = []

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i)
  }

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
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`
            px-3 py-2 rounded-lg border transition
            ${page === p
              ? "bg-white text-black border-white"
              : "bg-white/10 border-white/20 hover:bg-white/20 text-white"
            }
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