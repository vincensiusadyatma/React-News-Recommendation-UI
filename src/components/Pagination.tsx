import type { PaginationPropsType } from "../Types/PaginationPropsType"

const Pagination = ({ page, totalPage, setPage }: PaginationPropsType) => {

  const pages = []

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i)
  }

   return (
    <div className="flex justify-center items-center gap-2 mt-10">

      {/* Prev */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-2 border rounded-lg transition
            ${page === p
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white hover:bg-gray-100"
            }
          `}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPage}
        className="px-3 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40"
      >
        Next
      </button>

    </div>
  )
}



export default Pagination