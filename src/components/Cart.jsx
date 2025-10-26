// src/components/Cart.jsx
import React, { useState } from 'react';
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useWeb3 } from '../contexts/Web3Context';
import PaymentModal from './PaymentModal';

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCart();

  const { isConnected } = useWeb3();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleCheckout = () => {
    if (!isConnected) {
      alert('Please connect your MetaMask wallet to proceed with payment');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    clearCart();
    setShowPaymentModal(false);
    closeCart();
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <FiShoppingBag className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Shopping Cart ({getTotalItems()})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FiShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-sm text-center">
                  Add some products to get started with your blockchain-powered purchase
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    {/* Product Image Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ${item.price} each
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <FiMinus className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <FiPlus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-blue-600">${getTotalPrice().toFixed(2)}</span>
              </div>
              
              {/* Blockchain Notice */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-blue-800">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Payment will be processed on blockchain</span>
                </div>
              </div>
              
              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isConnected
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isConnected}
              >
                {isConnected ? 'Pay with MetaMask' : 'Connect Wallet to Pay'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          cartItems={cartItems}
          totalPrice={getTotalPrice()}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentComplete}
        />
      )}
    </>
  );
};

export default Cart;
