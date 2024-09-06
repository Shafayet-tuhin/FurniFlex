import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import SingleProducts from './SingleProducts';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [drop, setDrop] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); // New state for category filter
    const navigate = useNavigate();
    const { products } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14;

    // Function to handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to the first page when category changes
    };

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setDrop(value.length > 0);
    };

    const inputSuggestion = (item) => {
        setSearchTerm(item.name);
        setDrop(false);
    };

 
    const filteredItems = products.filter((item) => {
        const matchesCategory = selectedCategory
            ? item.category === selectedCategory
            : true;
        const matchesSearch = searchTerm
            ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="p-4 mb-32">
            <div className="bg-[url('./assets/Menu/banner.png')] w-full lg:mt-8 lg:mb-32 mb-8 bg-cover bg-center flex justify-center items-center">
                <p className="text-[#23272F] font-semibold text-xl md:text-3xl lg:text-[4rem]">
                    Choose the best <span className="text-[#db8e36]">Products</span> for you
                </p>
            </div>

            <p className="text-[#23272F] font-semibold text-2xl md:text-3xl lg:text-[2.5rem] text-center">
                Browse Our <span className="text-[#14C9C9]">Products</span>
            </p>

            <hr className="border-2 mt-8 w-1/2 mx-auto" />

            <div className="flex flex-col lg:flex-row gap-8">
              
                <div className="lg:w-1/3">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('')}
                                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-slate-300 ${selectedCategory === '' && 'bg-black text-white'}`}
                                >
                                    All Products
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('rocking')}
                                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-slate-300 ${selectedCategory === 'rocking' && 'bg-black text-white'}`}
                                >
                                    Rocking Chairs
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('lounge')}
                                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-slate-300 ${selectedCategory === 'lounge' && 'bg-black text-white'}`}
                                >
                                    Lounge Chairs
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('side')}
                                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-slate-300 ${selectedCategory === 'side' && 'bg-black text-white'}`}
                                >
                                    Side Chairs
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="lg:w-2/3">
                    <div className="flex justify-center mt-8 relative">
                        <input
                            type="text"
                            placeholder="Search Products Here"
                            className="input input-bordered w-full max-w-lg text-center"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onFocus={() => setDrop(searchTerm.length > 0)}
                            onBlur={() => setTimeout(() => setDrop(false), 100)}
                        />
                        {drop && (
                            <div className="absolute top-full mt-2 w-full z-50 max-w-md bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
                                {products
                                    .filter((item) =>
                                        item.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                            onMouseDown={() => inputSuggestion(item)}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 mr-2"
                                            />
                                            <div className="font-abc">
                                                <p className="text-sm font-semibold">{item.name}</p>
                                                <p className="text-sm text-orange-500">
                                                    ${item.discount_price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                        {filteredItems.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
                            <SingleProducts key={item._id} item={item} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {!searchTerm && (
                        <div className="flex justify-center mt-8">
                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => handleClick(number)}
                                    className={`mx-1 px-4 py-2 border rounded-lg text-lg ${
                                        currentPage === number
                                            ? 'bg-black text-white'
                                            : 'bg-white text-black'
                                    }`}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
