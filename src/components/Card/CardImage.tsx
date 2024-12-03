import React, { useState, useEffect } from 'react';

interface CardImageProps {
  src: string;
  placeholderUrl: string;
  alt: string;
  itemId: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, placeholderUrl, alt, itemId }) => {
  const [imageSrc, setImageSrc] = useState<string>(src || placeholderUrl);

  useEffect(() => {
    setImageSrc(src || placeholderUrl);
  }, [src, placeholderUrl]);

  const handleError = () => {
    setImageSrc(placeholderUrl);
  };

  return (
    <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
      <img
        src={`${imageSrc}?v=${itemId}`}
        alt={alt}
        className="w-full h-full object-cover"
        onError={handleError}
      />
    </div>
  );
};

export default CardImage;