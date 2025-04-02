
import { useState } from "react";
import { Play, ZoomIn } from "lucide-react";

const ProductGallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const images = [
    "/lovable-uploads/3270669f-7df0-49b4-ab67-74b651a1ca3b.png",
    "https://m.media-amazon.com/images/I/61v7zzSB-bL._SX522_.jpg",
    "https://m.media-amazon.com/images/I/61tQngUgL+L._SX522_.jpg",
    "https://m.media-amazon.com/images/I/61wdsTrGSAL._SX522_.jpg",
    "https://m.media-amazon.com/images/I/61OcEzWbQ-L._SX522_.jpg",
  ];

  return (
    <div className="flex flex-col">
      {/* Main image */}
      <div className="relative bg-white border border-gray-200 rounded-lg mb-2 p-4 flex items-center justify-center h-[400px]">
        <img
          src={images[selectedImage]}
          alt="Boldfit Cricket bat"
          className="max-h-full max-w-full object-contain"
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500 flex items-center">
          <ZoomIn size={16} className="mr-1" /> Roll over image to zoom in
        </div>
        {selectedImage === 1 && (
          <div className="absolute top-4 left-4 bg-white/80 rounded-full p-1">
            <Play size={24} className="text-black" />
            <span className="absolute top-1 left-1 text-[8px]">2 videos</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`border-2 rounded-md overflow-hidden ${
              selectedImage === index ? "border-[#FF9900]" : "border-gray-200"
            }`}
          >
            <div className="h-20 flex items-center justify-center bg-white p-1">
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
