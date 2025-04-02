
import { useState } from "react";
import ProductGallery from "@/components/ProductGallery";
import ProductDetails from "@/components/ProductDetails";
import NavigationHeader from "@/components/NavigationHeader";
import CategoryNavigation from "@/components/CategoryNavigation";
import BreadcrumbTrail from "@/components/BreadcrumbTrail";
import { cn } from "@/lib/utils";

const Index = () => {
  const [quantity, setQuantity] = useState(1);

  const productData = {
    name: "Boldfit Cricket bat Full Size Plastic bat Tennis Cricket bat Turf Tennis bat Lightweight Fiber bat Hard Plastic bat Tournament Plastic Cricket bat Standard Size Cricket Bats for Adults Fiber bat",
    price: 299,
    mrp: 999,
    discount: 70,
    rating: 4.1,
    reviews: 1645,
    store: "Boldfit",
    tag: "bat",
    sales: "3K+ bought in past month",
    fulfilled: true,
    inStock: true,
    delivery: {
      free: true,
      date: "Friday, 4 April",
      fastestDate: "Tomorrow, 3 April",
      timeRemaining: "12 hrs 20 mins",
      location: "Mumbai 400017"
    },
    shipping: {
      from: "Amazon",
      by: "RetailEZ Pvt Ltd"
    }
  };

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
            <ProductGallery />
          </div>

          {/* Middle column - Product details */}
          <div className="lg:col-span-7">
            <ProductDetails 
              product={productData}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
