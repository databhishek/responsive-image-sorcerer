import { useState } from "react";
import { Play, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`border-2 rounded-md overflow-hidden ${
              selectedImage === index ? "border-[#FF9900]" : "border-gray-200"
            }`}
          >
            <div className="h-20 w-20 flex items-center justify-center bg-white p-1">
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center h-[400px] flex-1">
        <img
          src={images[selectedImage]}
          alt="Product"
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
    </div>
  );
};

export default ProductGallery;
