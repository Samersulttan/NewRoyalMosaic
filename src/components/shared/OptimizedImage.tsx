import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjAyMDIwIi8+',
  onLoad,
  onError
}: OptimizedImageProps) => {
  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="eager"
        decoding="async"
        onLoad={onLoad}
        onError={onError}
      />
    );
  }

  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={className}
      effect="blur"
      loading="lazy"
      decoding="async"
      placeholder={
        <img
          src={placeholder}
          alt={`Loading ${alt}`}
          className={className}
          style={{ filter: 'blur(10px)' }}
        />
      }
      onLoad={onLoad}
      onError={onError}
      wrapperClassName={className}
    />
  );
};

export default OptimizedImage;