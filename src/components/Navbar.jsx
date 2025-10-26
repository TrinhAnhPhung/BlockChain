// src/components/Navbar.jsx - Blockchain Integrated Version
import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaPills } from 'react-icons/fa';
import MetaMaskConnect from './MetaMaskConnect';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { openCart, getTotalItems } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: "${searchQuery}" (Feature coming soon)`);
  };

  return (
    <nav className="glass sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo/Tên thương hiệu */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FaPills className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Propharm</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              Blockchain
            </span>
          </div>

          {/* Search Bar và Danh mục */}
          <div className="flex items-center space-x-4 ml-8 flex-1 max-w-2xl">
            {/* Dropdown Categories */}
            <div className="relative">
              <select className="px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-medium text-gray-700 appearance-none cursor-pointer hover:bg-white/80 transition-all duration-200">
                <option>All Categories</option>
                <option>Flu medicine</option>
                <option>Cough medicine</option>
                <option>Pain relief</option>
                <option>Vitamins</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-500" />
              </div>

              <input
                type="text"
                placeholder="Search medicine, medical products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm placeholder-gray-500 hover:bg-white/80 transition-all duration-200"
              />
            </form>
          </div>

           {/* Icons/User */}
           <div className="ml-4 flex items-center md:ml-6 space-x-3">
             {/* Wishlist Icon */}
             <button 
               onClick={() => alert('Wishlist feature (Frontend-Only Demo)')}
               className="p-3 rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
             >
               <FiHeart className="h-6 w-6" strokeWidth={2} />
             </button>

             {/* Cart Icon */}
             <button 
               onClick={openCart}
               className="relative p-3 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
             >
               <FiShoppingCart className="h-6 w-6" strokeWidth={2} />
               {getTotalItems() > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                   {getTotalItems()}
                 </span>
               )}
             </button>

             {/* MetaMask Connect */}
             <MetaMaskConnect />
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

