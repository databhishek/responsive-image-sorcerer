import { Check, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface PointsProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  pointsValue: number;
  image: string;
  selected: boolean;
}

const ShopWithPoints = () => {
  const [availablePoints, setAvailablePoints] = useState(1500);
  const [products, setProducts] = useState<PointsProduct[]>([
    {
      id: "p1",
      name: "Boldfit Cricket Batting Gloves",
      description: "Premium quality batting gloves, perfect for both practice and matches",
      price: 599,
      pointsValue: 599,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop",
      selected: false
    },
    {
      id: "p2",
      name: "Boldfit Cricket Helmet",
      description: "Protective cricket helmet with adjustable fitting and superior comfort",
      price: 899,
      pointsValue: 899,
      image: "https://images.unsplash.com/photo-1580744066811-90a3fb52256c?w=400&h=300&fit=crop",
      selected: false
    },
    {
      id: "p3",
      name: "Boldfit Cricket Wicket Keeping Gloves",
      description: "Professional grade keeping gloves with enhanced grip and padding",
      price: 749,
      pointsValue: 749,
      image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=400&h=300&fit=crop",
      selected: false
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(0);

  const toggleProductSelection = (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (!product.selected && (totalPoints + product.pointsValue > availablePoints)) {
      return;
    }

    const updatedProducts = products.map(p => {
      if (p.id === id) {
        const newSelected = !p.selected;
        
        if (newSelected) {
          setTotalPoints(prev => prev + p.pointsValue);
        } else {
          setTotalPoints(prev => prev - p.pointsValue);
        }
        
        return { ...p, selected: newSelected };
      }
      return p;
    });
    
    setProducts(updatedProducts);
  };

  const canSelectProduct = (product: PointsProduct) => {
    if (product.selected) return true;
    return totalPoints + product.pointsValue <= availablePoints;
  };

  const handleAddAllToCart = () => {
    const selectedProducts = products.filter(p => p.selected);
    console.log("Adding to cart with points:", selectedProducts);
    // Would implement actual cart functionality here
  };

  return (
    <div className="bg-white rounded-lg p-6 mt-8 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="h-8 w-8 bg-[#FF9900] rounded-full flex items-center justify-center mr-3">
          <img 
            src="/lovable-uploads/2a24028f-c183-476a-aed9-ee8778ea90af.png" 
            alt="Points icon" 
            className="h-5 w-5 object-contain"
          />
        </div>
        <h2 className="text-xl font-bold">Shop with Points</h2>
        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-3">
          FREE with points
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Use your credit card rewards points to get these similar products at no additional cost!
        You have <span className="font-semibold">{availablePoints.toLocaleString()} points</span> available.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {products.map((product) => {
          const isSelectable = canSelectProduct(product);
          return (
            <Card 
              key={product.id} 
              className={`border ${product.selected ? 'border-[#FF9900]' : 'border-gray-200'} 
                ${!isSelectable && !product.selected ? 'opacity-50' : ''} 
                ${isSelectable ? 'hover:border-[#FF9900]' : ''} transition-colors`}
            >
              <CardContent className="p-4">
                <div className="relative mb-3">
                  <div className="h-40 flex items-center justify-center bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <button 
                    onClick={() => toggleProductSelection(product.id)}
                    disabled={!isSelectable && !product.selected}
                    className={`absolute top-2 right-2 h-6 w-6 rounded-full border ${
                      product.selected 
                        ? 'bg-[#FF9900] border-[#FF9900]'
                        : 'bg-white border-gray-300'
                    } flex items-center justify-center ${!isSelectable && !product.selected ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {product.selected && <Check size={14} className="text-white" />}
                  </button>
                </div>
                
                <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-bold">{product.pointsValue}</span>
                    <span className="text-xs ml-1">points</span>
                  </div>
                  <div className="text-xs text-gray-500 line-through">₹{product.price}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div>
          <div className="text-sm text-gray-700">Total points required:</div>
          <div className="font-bold text-xl">{totalPoints.toLocaleString()} / {availablePoints.toLocaleString()} points</div>
        </div>
        
        <Button 
          onClick={handleAddAllToCart}
          disabled={totalPoints === 0}
          className="w-full sm:w-auto mt-3 sm:mt-0 bg-[#FFD814] hover:bg-[#F7CA00] text-black font-normal rounded-full py-1 px-6"
        >
          Add selected to cart
        </Button>
      </div>
    </div>
  );
};

export default ShopWithPoints;
