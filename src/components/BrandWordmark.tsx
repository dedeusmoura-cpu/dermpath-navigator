import dermPathLogoIvoryGold from "../assets/dermpath-logo-wordmark-ivory-gold.png";

interface BrandWordmarkProps {
  alt?: string;
  className?: string;
}

/** Preserva o wordmark raster e recolore somente o pequeno "N" cardinal. */
export function BrandWordmark({ alt = "DermPath Navigator", className = "" }: BrandWordmarkProps) {
  const maskStyle = {
    WebkitMaskImage: `url(${dermPathLogoIvoryGold})`,
    maskImage: `url(${dermPathLogoIvoryGold})`,
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    clipPath: "inset(3.08% 66.37% 87.03% 31.43%)",
  };

  return (
    <span className={`relative inline-block align-middle ${className}`}>
      <img src={dermPathLogoIvoryGold} alt={alt} className="block h-auto w-full" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#f52235]" style={maskStyle} />
    </span>
  );
}
