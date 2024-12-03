import React, { useState, useEffect } from 'react';
import catalogSettings from '@/config/catalogConfig';
import { CatalogType } from '@/types';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  type: CatalogType;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, type, className }) => {
  const [imageSrc, setImageSrc] = useState<string>(src ?? catalogSettings[type].placeholderUrl);

  useEffect(() => {
    setImageSrc(src ?? catalogSettings[type].placeholderUrl);
  }, [src, type]);

  const handleError = () => {
    setImageSrc(catalogSettings[type].placeholderUrl);
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;