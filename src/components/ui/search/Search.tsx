const Search = () => {
    return (
        <div className="flex items-center gap-x-5">
            <button className="cursor-pointer size-10 flex items-center justify-center border-2 border-solid text-gray-800 border-gray-800 rounded-xl hover:bg-gray-800 hover:text-white">
                <i className="fa-solid fa-magnifying-glass" />
            </button>
            <input id="search" className="px-5 py-2 h-10 outline-none border-2 border-solid text-gray-800 border-gray-800 rounded-xl" type="text" placeholder="Search..." />
        </div>
    );
};

export default Search;