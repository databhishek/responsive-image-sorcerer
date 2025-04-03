import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  // Separate regular items from points items
  const regularItems = items.filter(item => item.pointsValue === 0);
  const pointsItems = items.filter(item => item.pointsValue > 0);

  // Calculate totals
  const regularSubtotal = regularItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalPoints = pointsItems.reduce((sum, item) => sum + (item.pointsValue * item.quantity), 0);
  const delivery = 0;
  const total = regularSubtotal;
  const availablePoints = 1500; // Same as in ShopWithPoints

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      {/* Header */}
      <div className="bg-[#232F3E] py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon Logo"
              className="h-8 mr-2"
            />
            <span className="text-white text-sm">.in</span>
          </div>
          <div className="flex items-center">
            <span className="text-white text-lg">Secure checkout</span>
            <div className="ml-4 relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Shipping and Payment */}
          <div className="lg:col-span-8">
            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-medium mb-4">Delivering to Abhishek Singh</h2>
              <p className="text-sm text-gray-600 mb-2">
                Ga, Pearl Crescent, Eshwara Layout, 15th Cross Road, Indiranagar,
                <br />
                Bengaluru, KARNATAKA, 560038, India
              </p>
              <button className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
                Add delivery instructions
              </button>
            </div>

            {/* Regular Items Payment */}
            {regularItems.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-lg font-medium mb-4">Payment method for regular items</h2>
                
                {/* Credit/Debit Cards */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium uppercase mb-4">CREDIT & DEBIT CARDS</h3>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="regularPayment" 
                        className="h-4 w-4 text-[#FF9900]" 
                        defaultChecked
                      />
                      <div>
                        <div className="flex items-center">
                          <span className="text-sm">Amazon Pay ICICI Bank Credit Card</span>
                          <span className="ml-2 text-xs bg-gray-100 px-1">ending in 1017</span>
                        </div>
                        <div className="text-xs text-gray-500">Abhishek Singh</div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input type="radio" name="regularPayment" className="h-4 w-4 text-[#FF9900]" />
                      <div>
                        <div className="flex items-center">
                          <span className="text-sm">Axis Bank Credit Card</span>
                          <span className="ml-2 text-xs bg-gray-100 px-1">ending in 4584</span>
                        </div>
                        <div className="text-xs text-gray-500">Abhishek Singh</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Points Items Payment */}
            {pointsItems.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4">Payment method for points items</h2>
                
                {/* Points Balance */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Your available points balance</h3>
                  <label className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="pointsPayment" 
                      className="h-4 w-4 text-[#FF9900]" 
                      defaultChecked 
                    />
                    <div>
                      <div className="text-sm">
                        Use {totalPoints.toLocaleString()} of your {availablePoints.toLocaleString()} available points
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-normal rounded-full py-2 mb-4">
                Place your order
              </Button>

              <div className="text-xs text-gray-600 mb-6">
                By placing your order, you agree to Amazon's privacy notice and conditions of use.
              </div>

              <div className="space-y-2 text-sm">
                {regularItems.length > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>Regular Items:</span>
                      <span>₹{regularSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span>₹{delivery}</span>
                    </div>
                  </>
                )}
                
                {pointsItems.length > 0 && (
                  <div className="flex justify-between text-[#FF9900]">
                    <span>Points Items:</span>
                    <span>{totalPoints.toLocaleString()} points</span>
                  </div>
                )}

                <Separator className="my-2" />
                
                <div className="flex justify-between font-bold">
                  <span>Order Total:</span>
                  <div className="text-right">
                    {regularSubtotal > 0 && <div>₹{regularSubtotal.toLocaleString()}</div>}
                    {totalPoints > 0 && <div className="text-[#FF9900]">{totalPoints.toLocaleString()} points</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 