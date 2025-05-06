import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="block">
      <picture>
        {/* Modern format - WebP */}
        <source
          src="/images/logo.png"
        srcSet="/images/logo.png 1x, /images/logo@2x.png 2x"
        />
        {/* Fallback - PNG */}
        <source
          srcSet="/images/logo.png 1x, /images/logo@2x.png 2x"
          type="image/png"
        />
        <img
          src="/images/logo.png"
          alt="Royal Mosaic"
          className="h-12 md:h-20 w-auto"
          width="200"
          height="100"
          loading="eager"
          decoding="async"
        />
      </picture>
    </Link>
  );
};

export default Logo;
