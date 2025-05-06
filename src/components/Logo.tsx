import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Logo = () => {
  // استخدام الكشف عن نوع الجهاز بدلاً من حجم النافذة فقط
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Link to="/" className="block">
      <img
        src={isMobile ? "/images/logo-mobile.png" : "/images/logo.png"}
        alt="Royal Mosaic"
        className="h-12 md:h-20 w-auto block"
        style={{ display: 'block' }} // للتأكد من ظهور الصورة
        width={isMobile ? "150" : "200"}
        height={isMobile ? "75" : "100"}
        loading="eager"
        
      />
    </Link>
  );
};

export default Logo;