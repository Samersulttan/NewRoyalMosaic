import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const OptimizedImage = ({ src, alt, className = '', priority = false }: OptimizedImageProps) => {
  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="eager"
        decoding="async"
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
    />
  );
};

export default OptimizedImage;