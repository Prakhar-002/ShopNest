

/*
?   Node modules
*/

const CategoryForm = ({
      value,
      setValue,
      handleSubmit,
      buttonText = "Submit",
      handleDelete,
}) => {
      return (
            <div className="p-5 bg-[#0f0f0f] rounded-2xl shadow-lg text-white border border-white/5 backdrop-blur-sm">
                  <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                              type="text"
                              className="py-3 px-4 w-full rounded-lg bg-[#181818] text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                              placeholder="Write category name"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                        />

                        <div className="flex justify-between space-x-3">
                              <button
                                    type="submit"
                                    className="flex-1 bg-pink-600/90 hover:bg-pink-500 text-white py-2.5 px-4 rounded-lg shadow hover:shadow-pink-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/60"
                              >
                                    {buttonText}
                              </button>

                              {handleDelete && (
                                    <button
                                          type="button"
                                          onClick={handleDelete}
                                          className="flex-1 bg-red-600/90 hover:bg-red-500 text-white py-2.5 px-4 rounded-lg shadow hover:shadow-red-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400/60"
                                    >
                                          Delete
                                    </button>
                              )}
                        </div>
                  </form>
            </div>
      );
};

export default CategoryForm;