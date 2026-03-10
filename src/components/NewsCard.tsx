const NewsCard = () => {
    return (
      <div className="max-w-md w-full border border-blue-900/40 rounded-xl p-6 bg-[#030f26] shadow-lg">
       
        <h2 className="text-white text-xl font-semibold mb-3">
          UI/UX Review Check
        </h2>

        <p className="text-blue-200 text-sm leading-relaxed mb-6">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to "Naviglio" where you can enjoy the main night life
          in Barcelona.
        </p>

        <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition">
          Read More
        </button>

      </div>
  
  );
}

export default NewsCard