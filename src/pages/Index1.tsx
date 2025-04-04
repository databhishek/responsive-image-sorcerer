import { useState } from "react";
import { Check } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import ProductDetails from "@/components/ProductDetails";
import NavigationHeader from "@/components/NavigationHeader";
import CategoryNavigation from "@/components/CategoryNavigation";
import BreadcrumbTrail from "@/components/BreadcrumbTrail";
import ShopWithPoints from "@/components/ShopWithPoints";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cricketBatData } from "@/data/cricketBat";

const Index = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} item(s) to cart`);
  };

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} item(s) now`);
  };

  const handleAddToWishlist = () => {
    console.log("Added to wishlist");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      <CategoryNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <BreadcrumbTrail />
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
          {/* Left column - Product gallery */}
          <div className="lg:col-span-5 lg:row-span-2">
            <ProductGallery images={cricketBatData.images} />
          </div>

          {/* Middle column - Product details */}
          <div className="lg:col-span-7">
            <ProductDetails 
              product={cricketBatData}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>
        
        {/* Frequently Bought Together section */}
        <div className="mt-12">
          <FrequentlyBoughtTogether />
        </div>
        
        {/* Shop with Points section */}
        <div className="mt-8 mb-12">
          <ShopWithPoints 
            products={cricketBatData.relatedProducts} 
            mainProduct={{
              id: cricketBatData.id,
              name: cricketBatData.name,
              price: cricketBatData.price,
              image: cricketBatData.images[0],
              quantity: quantity
            }}
          />
        </div>
      </main>
    </div>
  );
};

// Frequently Bought Together component to match the screenshot
const FrequentlyBoughtTogether = () => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Frequently bought together</h2>
      
      <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
        <div className="flex items-center">
          <div className="relative border border-gray-200 p-4 rounded-md bg-gray-50">
            <div className="h-32 w-32 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=300&h=300&fit=crop" 
                alt="Boldfit Cricket bat" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="absolute top-2 right-2">
              <div className="h-5 w-5 bg-[#0066c0] rounded flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            </div>
          </div>
          
          <div className="mx-4 text-2xl font-bold">+</div>
          
          <div className="relative border border-gray-200 p-4 rounded-md bg-gray-50">
            <div className="h-32 w-32 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=300&fit=crop" 
                alt="Boldfit Tennis Ball" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="absolute top-2 right-2">
              <div className="h-5 w-5 bg-[#0066c0] rounded flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 md:border-l md:pl-6 md:border-gray-200">
          <div className="text-lg font-medium mb-2">
            Total price: <span className="text-[#B12704]">₹545.00</span>
          </div>
          
          <Button className="w-full md:w-auto bg-[#FFD814] hover:bg-[#F7CA00] text-black font-normal rounded-full py-1">
            Add both to Cart
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-4">
        <div>
          <div className="font-medium mb-1">This item:</div>
          <div className="text-sm mb-1">Boldfit Cricket bat Full Size Plastic bat Tennis Cricket bat Turf Tennis bat Lightweight Fiber bat</div>
          <div className="font-bold">₹299<sup>00</sup></div>
        </div>
        
        <div>
          <div className="font-medium text-[#0066c0] mb-1 hover:text-[#C7511F] hover:underline cursor-pointer">
            Boldfit Tennis Ball for Cricket Soft Tennis Cricket Ball Lightweight Cricket Tennis Ball
          </div>
          <div className="font-bold">₹246<sup>00</sup></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
