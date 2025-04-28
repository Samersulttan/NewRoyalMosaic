import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="block">
      <img
        src="/images/logo.png"
        srcSet="/images/logo.png 1x, /images/logo@2x.png 2x"
        alt="Royal Mosaic"
        className="h-20 w-auto object-contain"
        loading="eager"
        width="200"
        height="100"
      />
    </Link>
  );
};

export default Logo;