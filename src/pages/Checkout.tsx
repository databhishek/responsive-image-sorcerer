import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface PointsProgram {
  name: string;
  available: number;
  allocated: number;
}

const Checkout = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  // Points programs configuration
  const [pointsPrograms, setPointsPrograms] = useState<PointsProgram[]>([
    { name: "Docomo Points", available: 600, allocated: 0 },
    { name: "Recruit Points", available: 500, allocated: 0 },
    { name: "JCB Points", available: 400, allocated: 0 }
  ]);

  // Separate regular items from points items
  const regularItems = items.filter(item => item.pointsValue === 0);
  const pointsItems = items.filter(item => item.pointsValue > 0);

  // Calculate totals
  const regularSubtotal = regularItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalPoints = pointsItems.reduce((sum, item) => sum + (item.pointsValue * item.quantity), 0);
  const delivery = 0;
  const total = regularSubtotal;
  const totalAvailablePoints = pointsPrograms.reduce((sum, program) => sum + program.available, 0);
  const totalAllocatedPoints = pointsPrograms.reduce((sum, program) => sum + program.allocated, 0);

  // Handle points allocation
  const handlePointsAllocation = (programName: string, value: number) => {
    const newValue = Math.max(0, Math.min(value, totalPoints));
    
    setPointsPrograms(programs => {
      const program = programs.find(p => p.name === programName);
      if (!program) return programs;

      // Ensure we don't allocate more than available for this program
      const validValue = Math.min(newValue, program.available);
      
      // Calculate remaining points needed
      const otherAllocations = programs
        .filter(p => p.name !== programName)
        .reduce((sum, p) => sum + p.allocated, 0);
      
      const remainingNeeded = totalPoints - otherAllocations;
      const finalValue = Math.min(validValue, remainingNeeded);

      return programs.map(p => 
        p.name === programName 
          ? { ...p, allocated: finalValue }
          : p
      );
    });
  };

  // Handle text input change
  const handleTextInput = (programName: string, value: string) => {
    const numericValue = value === "" ? 0 : parseInt(value);
    if (!isNaN(numericValue)) {
      handlePointsAllocation(programName, numericValue);
    }
  };

  const isPointsValid = totalAllocatedPoints === totalPoints;

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

            {/* Points Items Payment - Updated with multiple programs */}
            {pointsItems.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4">Payment method for points items</h2>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total points required:</span>
                    <span className="font-medium">{totalPoints.toLocaleString()} points</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total points available:</span>
                    <span>{totalAvailablePoints.toLocaleString()} points</span>
                  </div>
                </div>

                <Separator className="my-4" />
                
                {/* Points Programs */}
                <div className="space-y-6">
                  {pointsPrograms.map((program) => (
                    <div key={program.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{program.name}</span>
                        <span className="text-gray-600">
                          Available: {program.available.toLocaleString()} points
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <input
                            type="range"
                            min="0"
                            max={program.available}
                            value={program.allocated}
                            onChange={(e) => handlePointsAllocation(program.name, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF9900]"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={program.allocated}
                            onChange={(e) => handleTextInput(program.name, e.target.value)}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900]"
                          />
                          <span className="ml-1 text-sm text-gray-600">points</span>
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Currently using: {program.allocated.toLocaleString()} points
                      </div>
                    </div>
                  ))}
                </div>

                {!isPointsValid && (
                  <div className="mt-4 text-sm text-red-600">
                    Please allocate exactly {totalPoints.toLocaleString()} points to proceed.
                    Currently allocated: {totalAllocatedPoints.toLocaleString()} points.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Button 
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-normal rounded-full py-2 mb-4"
                disabled={pointsItems.length > 0 && !isPointsValid}
              >
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
                  <>
                    <div className="flex justify-between text-[#FF9900]">
                      <span>Points Items:</span>
                      <span>{totalPoints.toLocaleString()} points</span>
                    </div>
                    <div className="text-xs space-y-1">
                      {pointsPrograms
                        .filter(program => program.allocated > 0)
                        .map(program => (
                          <div key={program.name} className="flex justify-between text-gray-600">
                            <span>{program.name}:</span>
                            <span>{program.allocated.toLocaleString()} points</span>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                <Separator className="my-2" />
                
                <div className="flex justify-between font-bold">
                  <span>Order Total:</span>
                  <div className="text-right">
                    {regularSubtotal > 0 && <div>₹{regularSubtotal.toLocaleString()}</div>}
                    {totalPoints > 0 && (
                      <div className="text-[#FF9900]">
                        {totalPoints.toLocaleString()} points
                      </div>
                    )}
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