// src/App.jsx - Frontend Only Version
import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import ProductSection from './components/ProductSection';

// Dữ liệu mẫu cho Frontend-Only Version
const fluProducts = [
  { 
    id: 1,
    name: 'Dextromethorphan 10mg', 
    price: 12.90, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.5,
    description: 'Effective cough suppressant for dry cough relief'
  },
  { 
    id: 2,
    name: 'Coldacmin', 
    price: 8.98, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.2,
    description: 'Multi-symptom cold relief medication'
  },
  { 
    id: 3,
    name: 'Decolgen', 
    price: 3.32, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.0,
    description: 'Fast-acting decongestant for nasal congestion'
  },
  { 
    id: 4,
    name: 'Paracetamol 500mg', 
    price: 24.78, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.8,
    description: 'Pain relief and fever reducer'
  },
];

const coughProducts = [
  { 
    id: 5,
    name: 'Cidetuss', 
    price: 2.00, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.1,
    description: 'Natural cough syrup with honey'
  },
  { 
    id: 6,
    name: 'Methorphan', 
    price: 1.99, 
    imageUrl: '/api/placeholder/300/200',
    rating: 3.9,
    description: 'Cough suppressant for persistent cough'
  },
  { 
    id: 7,
    name: 'Bisolvon', 
    price: 0.89, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.3,
    description: 'Expectorant for productive cough'
  },
  { 
    id: 8,
    name: 'Clorpheniramin', 
    price: 4.00, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.0,
    description: 'Antihistamine for allergy relief'
  },
];

const vitaminProducts = [
  { 
    id: 9,
    name: 'Vitamin C 1000mg', 
    price: 15.50, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.6,
    description: 'Immune system support and antioxidant'
  },
  { 
    id: 10,
    name: 'Vitamin D3', 
    price: 18.75, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.4,
    description: 'Bone health and immune function'
  },
  { 
    id: 11,
    name: 'Multivitamin Complex', 
    price: 22.99, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.7,
    description: 'Complete daily vitamin supplement'
  },
  { 
    id: 12,
    name: 'Omega-3 Fish Oil', 
    price: 28.50, 
    imageUrl: '/api/placeholder/300/200',
    rating: 4.5,
    description: 'Heart and brain health support'
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />
      
      <main className="fade-in">
        <Banner />
        
        {/* Section Thuốc cảm cúm */}
        <ProductSection 
          title="Flu Medicine" 
          products={fluProducts}
          description="Effective medications for cold and flu symptoms"
        />
        
        {/* Section Thuốc ho */}
        <ProductSection 
          title="Cough Medicine" 
          products={coughProducts}
          description="Relief for various types of cough and throat irritation"
        />
        
        {/* Section Vitamins */}
        <ProductSection 
          title="Vitamins & Supplements" 
          products={vitaminProducts}
          description="Essential vitamins and supplements for daily health"
        />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold">Propharm</span>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Your trusted partner in healthcare and wellness. We provide premium quality pharmaceutical products and supplements.
              </p>
              <div className="text-xs text-blue-200 bg-blue-800/30 px-3 py-2 rounded-lg">
                📱 Frontend-Only Version - No Backend Required
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">Flu Medicine</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cough Medicine</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vitamins</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Supplements</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <div className="space-y-2 text-sm text-blue-100">
                <p>📧 info@propharm.com</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>📍 123 Health Street, Medical City</p>
                <div className="mt-3 p-2 bg-green-800/30 rounded-lg text-xs">
                  ✅ Frontend Ready - No Database Required
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-700 mt-12 pt-8 text-center text-sm text-blue-200">
            <p>&copy; 2024 Propharm. All rights reserved. | Privacy Policy | Terms of Service</p>
            <p className="mt-2 text-xs">Frontend-Only Version - Static Demo Application</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

