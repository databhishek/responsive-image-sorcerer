
import { Star, MapPin, ChevronDown, Gift, Box, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DeliveryDetails {
  free: boolean;
  date: string;
  fastestDate: string;
  timeRemaining: string;
  location: string;
}

interface ShippingDetails {
  from: string;
  by: string;
}

interface ProductProps {
  name: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviews: number;
  store: string;
  tag: string;
  sales: string;
  fulfilled: boolean;
  inStock: boolean;
  delivery: DeliveryDetails;
  shipping: ShippingDetails;
}

interface ProductDetailsProps {
  product: ProductProps;
  quantity: number;
  onQuantityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onAddToWishlist: () => void;
}

const ProductDetails = ({ 
  product, 
  quantity,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  onAddToWishlist
}: ProductDetailsProps) => {
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={16} className="fill-[#FF9900] text-[#FF9900]" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star size={16} className="text-gray-300" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star size={16} className="fill-[#FF9900] text-[#FF9900]" />
            </div>
          </div>
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} size={16} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6">
      <h1 className="text-xl lg:text-2xl font-medium text-left mb-2">
        {product.name}
      </h1>
      
      <div className="flex items-center mb-1">
        <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm">
          Visit the {product.store} Store
        </a>
      </div>
      
      <div className="flex items-center space-x-2 mb-2">
        {renderRatingStars(product.rating)}
        <span className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm">
          {product.reviews} ratings
        </span>
        {product.tag && (
          <>
            <span className="text-gray-500">|</span>
            <div className="bg-[#232F3E] text-white text-xs px-2 py-1 rounded">
              Amazon's Choice for "{product.tag}"
            </div>
          </>
        )}
      </div>
      
      {product.sales && (
        <div className="text-sm text-gray-700 mb-4">
          {product.sales}
        </div>
      )}
      
      <Separator className="my-4" />
      
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-red-600 text-lg">-{product.discount}%</span>
          <span className="ml-2 text-3xl font-medium">₹{product.price}</span>
          <span className="ml-2 text-gray-500 line-through">M.R.P.: ₹{product.mrp}</span>
        </div>
        <p className="text-sm text-gray-700 mt-1">Inclusive of all taxes</p>
        
        {product.fulfilled && (
          <div className="mt-2 inline-block bg-slate-700 text-white text-xs px-2 py-1 rounded">
            <span>✓</span> Fulfilled
          </div>
        )}
      </div>
      
      <div className="mb-6 bg-[#F5F5F5] p-4 rounded-lg">
        <div className="flex items-start mb-2">
          <div className="min-w-[120px] text-sm font-medium">FREE delivery</div>
          <div>
            <span className="font-bold">{product.delivery.date}</span> on your first order.
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline ml-1">
              Details
            </a>
          </div>
        </div>
        
        <div className="flex items-start mb-2">
          <div className="min-w-[120px] text-sm font-medium">Or fastest delivery</div>
          <div>
            <span className="font-bold">{product.delivery.fastestDate}</span>. Order within 
            <span className="text-[#007185] font-bold"> {product.delivery.timeRemaining}</span>.
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline ml-1">
              Details
            </a>
          </div>
        </div>
        
        <div className="flex items-center text-sm">
          <MapPin size={16} className="mr-1 text-gray-600" />
          <span>Delivering to {product.delivery.location} - </span>
          <button className="text-[#007185] hover:text-[#C7511F] hover:underline ml-1 flex items-center">
            Update location
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-xl font-medium text-[#007600] mb-2">
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center mb-4">
          <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
            <label htmlFor="quantity" className="mr-2 text-sm font-medium">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={onQuantityChange}
              className="border border-gray-300 rounded-md py-1 px-2 text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <div>
              <span className="font-medium">Ships from</span> {product.shipping.from}
            </div>
            <div className="mx-4">|</div>
            <div>
              <span className="font-medium">Sold by</span> {product.shipping.by}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={onAddToCart}
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-normal rounded-full py-1"
          >
            Add to Cart
          </Button>
          
          <Button 
            onClick={onBuyNow}
            className="w-full bg-[#FFA41C] hover:bg-[#FA8900] text-black font-normal rounded-full py-1"
          >
            Buy Now
          </Button>
          
          <div className="flex items-center pt-2">
            <input 
              type="checkbox" 
              id="giftOption" 
              className="h-4 w-4 text-[#007185] border-gray-300 rounded mr-2" 
            />
            <label htmlFor="giftOption" className="text-sm">Add gift options</label>
          </div>
          
          <Button 
            onClick={onAddToWishlist}
            variant="outline"
            className="w-full text-[#007185] border-gray-300 hover:bg-gray-50 font-normal mt-2"
          >
            Add to Wish List
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mt-6">
        <div className="text-center">
          <div className="flex justify-center">
            <Truck size={24} className="text-gray-600 mb-1" />
          </div>
          <p className="text-xs">Free Delivery</p>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center">
            <Box size={24} className="text-gray-600 mb-1" />
          </div>
          <p className="text-xs">Pay on Delivery</p>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center">
            <Clock size={24} className="text-gray-600 mb-1" />
          </div>
          <p className="text-xs">7 days Replacement</p>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 7L10 17L5 12" className="text-gray-600" />
            </svg>
          </div>
          <p className="text-xs">Top Brand</p>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">About this item</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Plastic Cricket bat for practice or recreation.</li>
          <li>Light Weight and durable construction for extended use.</li>
          <li>Ergonomic handle for comfortable grip during play.</li>
          <li>Suitable for tennis ball cricket and casual games.</li>
          <li>Standard size suitable for adults and teenagers.</li>
          <li>Perfect for beach cricket, street cricket or backyard games.</li>
        </ul>
      </div>
      
      <table className="w-full text-sm mb-6">
        <tbody>
          <tr>
            <td className="font-medium py-2 pr-4 align-top">Size</td>
            <td className="py-2">Full Size</td>
          </tr>
          <tr>
            <td className="font-medium py-2 pr-4 align-top">Sport</td>
            <td className="py-2">Cricket</td>
          </tr>
          <tr>
            <td className="font-medium py-2 pr-4 align-top">Brand</td>
            <td className="py-2">Boldfit</td>
          </tr>
          <tr>
            <td className="font-medium py-2 pr-4 align-top">Material</td>
            <td className="py-2">Plastic, Fiber</td>
          </tr>
          <tr>
            <td className="font-medium py-2 pr-4 align-top">Color</td>
            <td className="py-2">Yellow/Black</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
