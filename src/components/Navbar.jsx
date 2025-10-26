// src/components/Navbar.jsx - Frontend Only Version
import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaPills } from 'react-icons/fa';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // In frontend-only version, we'll just show an alert
    alert(`Searching for: "${searchQuery}" (Frontend-Only Demo)`);
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
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
              Frontend Only
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
               onClick={() => alert('Shopping cart feature (Frontend-Only Demo)')}
               className="relative p-3 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
             >
               <FiShoppingCart className="h-6 w-6" strokeWidth={2} />
               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">3</span>
             </button>

             {/* Demo Notice */}
             <div className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
               <span className="text-sm font-medium">Demo Mode</span>
             </div>

             {/* User Avatar */}
             <div className="ml-2 relative">
               <button 
                 onClick={() => alert('User profile feature (Frontend-Only Demo)')}
                 className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
               >
                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                   Demo
                 </div>
                 <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
               </button>
             </div>
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

