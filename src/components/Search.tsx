interface SearchBarProps {  
  inputQuery: string
  setInputQuery: (query: string) => void
  onSearch: () => void
}

const Search = ({ inputQuery, setInputQuery, onSearch }: SearchBarProps) => {

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form 
      onSubmit={handleSearch}
      className="flex items-center gap-3 w-full max-w-xl mx-auto"
    >

      <input
        type="text"
        placeholder="Search news..."
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>

    </form>
  )
}

export default Search