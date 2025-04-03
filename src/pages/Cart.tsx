import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalPoints = items.reduce((sum, item) => sum + (item.pointsValue * item.quantity), 0);
  const total = subtotal;

  const handleProceedToBuy = () => {
    navigate("/Checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-200 last:border-0">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
                      
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center">
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="border border-gray-300 rounded-md py-1 px-2 text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          {item.pointsValue > 0 ? (
                            <span className="text-[#FF9900] font-medium">{item.pointsValue} points</span>
                          ) : (
                            <span className="font-medium">₹{item.price.toLocaleString()}</span>
                          )}
                        </div>
                        <div className="text-sm font-medium">
                          {item.pointsValue > 0 ? (
                            <span className="text-[#FF9900]">{item.pointsValue * item.quantity} points</span>
                          ) : (
                            <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                
                {totalPoints > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Points to be used</span>
                    <span className="text-[#FF9900]">{totalPoints} points</span>
                  </div>
                )}
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleProceedToBuy}
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-normal rounded-full py-2"
              >
                Proceed to Buy
              </Button>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Secure transaction</p>
                <p>Ships from Amazon</p>
                <p>Sold by Amazon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 