import { motion } from "framer-motion";
import type { SheepPersonality } from "@/lib/sheepLogic";

interface SheepSVGProps {
  personality?: SheepPersonality;
  size?: number;
  animated?: boolean;
}

function renderAccessory(acc: string, color: string) {
  switch (acc) {
    case "glasses":
      return (
        <g key="glasses">
          <circle cx="140" cy="145" r="14" fill="none" stroke={color} strokeWidth="3" />
          <circle cx="170" cy="145" r="14" fill="none" stroke={color} strokeWidth="3" />
          <line x1="154" y1="145" x2="156" y2="145" stroke={color} strokeWidth="3" />
          <line x1="126" y1="145" x2="118" y2="138" stroke={color} strokeWidth="2" />
          <line x1="184" y1="145" x2="192" y2="138" stroke={color} strokeWidth="2" />
        </g>
      );
    case "crown":
      return (
        <g key="crown">
          <polygon points="130,95 140,75 150,90 160,70 170,90 180,75 185,95" fill="#FFD700" stroke="#E6B800" strokeWidth="1.5" />
          <rect x="130" y="95" width="55" height="8" rx="2" fill="#FFD700" stroke="#E6B800" strokeWidth="1" />
          <circle cx="140" cy="79" r="3" fill="#E74C3C" />
          <circle cx="160" cy="73" r="3" fill="#3498DB" />
          <circle cx="180" cy="79" r="3" fill="#2ECC71" />
        </g>
      );
    case "headphones":
      return (
        <g key="headphones">
          <path d="M120,130 Q120,100 155,100 Q190,100 190,130" fill="none" stroke="#2D3436" strokeWidth="5" />
          <rect x="112" y="125" width="14" height="22" rx="7" fill="#2D3436" />
          <rect x="184" y="125" width="14" height="22" rx="7" fill="#2D3436" />
          <rect x="114" y="128" width="10" height="16" rx="5" fill={color} />
          <rect x="186" y="128" width="10" height="16" rx="5" fill={color} />
        </g>
      );
    case "sunglasses":
      return (
        <g key="sunglasses">
          <rect x="128" y="138" width="28" height="18" rx="4" fill="#2D3436" opacity="0.85" />
          <rect x="162" y="138" width="28" height="18" rx="4" fill="#2D3436" opacity="0.85" />
          <line x1="156" y1="147" x2="162" y2="147" stroke="#2D3436" strokeWidth="3" />
          <line x1="128" y1="144" x2="118" y2="138" stroke="#2D3436" strokeWidth="2.5" />
          <line x1="190" y1="144" x2="196" y2="138" stroke="#2D3436" strokeWidth="2.5" />
        </g>
      );
    case "cape":
      return (
        <g key="cape">
          <path d="M130,180 Q110,220 120,260 Q155,250 190,260 Q200,220 180,180" fill={color} opacity="0.7" />
          <path d="M130,180 Q110,220 120,260" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        </g>
      );
    case "tie":
      return (
        <g key="tie">
          <polygon points="152,185 158,185 162,210 155,220 148,210" fill={color} />
          <polygon points="149,185 161,185 158,192 152,192" fill={color} opacity="0.8" />
        </g>
      );
    case "flower":
      return (
        <g key="flower">
          <circle cx="118" cy="115" r="6" fill="#FF6B81" />
          <circle cx="110" cy="110" r="5" fill="#FF9FF3" />
          <circle cx="126" cy="110" r="5" fill="#FF9FF3" />
          <circle cx="112" cy="120" r="5" fill="#FF9FF3" />
          <circle cx="124" cy="120" r="5" fill="#FF9FF3" />
          <circle cx="118" cy="115" r="4" fill="#FFEAA7" />
        </g>
      );
    case "sleepMask":
      return (
        <g key="sleepMask">
          <rect x="125" y="135" width="65" height="20" rx="10" fill={color} opacity="0.8" />
          <text x="157" y="150" textAnchor="middle" fontSize="10" fill="white">zzZ</text>
        </g>
      );
    case "headband":
      return (
        <g key="headband">
          <rect x="125" y="105" width="62" height="8" rx="4" fill={color} />
        </g>
      );
    case "medal":
      return (
        <g key="medal">
          <line x1="195" y1="150" x2="205" y2="175" stroke={color} strokeWidth="3" />
          <circle cx="205" cy="182" r="10" fill="#FFD700" stroke="#E6B800" strokeWidth="1.5" />
          <text x="205" y="186" textAnchor="middle" fontSize="10" fill="#E6B800">★</text>
        </g>
      );
    case "book":
      return (
        <g key="book">
          <rect x="98" y="195" width="22" height="28" rx="2" fill={color} />
          <rect x="100" y="197" width="18" height="24" rx="1" fill="white" opacity="0.3" />
          <line x1="109" y1="197" x2="109" y2="221" stroke="white" strokeWidth="1" opacity="0.5" />
        </g>
      );
    case "star":
      return (
        <g key="star">
          <polygon points="195,100 198,108 207,108 200,113 203,122 195,117 187,122 190,113 183,108 192,108" fill="#FFD700" />
        </g>
      );
    case "phone":
      return (
        <g key="phone">
          <rect x="192" y="190" width="16" height="26" rx="3" fill="#2D3436" />
          <rect x="194" y="194" width="12" height="17" rx="1" fill="#74B9FF" />
        </g>
      );
    case "teacup":
      return (
        <g key="teacup">
          <path d="M96,205 L100,225 L120,225 L124,205 Z" fill="white" stroke="#DFE6E9" strokeWidth="1.5" />
          <path d="M124,210 Q135,210 135,218 Q135,225 124,225" fill="none" stroke="#DFE6E9" strokeWidth="1.5" />
          <path d="M102,202 Q105,195 108,202 Q111,195 114,202" fill="none" stroke="#B2BEC3" strokeWidth="1" opacity="0.6" />
        </g>
      );
    case "pillow":
      return (
        <g key="pillow">
          <ellipse cx="155" cy="250" rx="35" ry="12" fill="white" stroke="#DFE6E9" strokeWidth="1.5" />
          <ellipse cx="155" cy="248" rx="30" ry="8" fill="#F8F9FA" />
        </g>
      );
    case "drink":
      return (
        <g key="drink">
          <rect x="194" y="195" width="14" height="24" rx="2" fill="#FFEAA7" stroke="#FDCB6E" strokeWidth="1" />
          <circle cx="201" cy="200" r="2" fill="#E17055" />
          <line x1="201" y1="195" x2="201" y2="188" stroke="#00CEC9" strokeWidth="1.5" />
          <circle cx="201" cy="186" r="3" fill="#55EFC4" />
        </g>
      );
    default:
      return null;
  }
}

export default function SheepSVG({ personality, size = 280, animated = true }: SheepSVGProps) {
  const color = personality?.color || "#6C63FF";
  const secondaryColor = personality?.secondaryColor || "#A5A0FF";
  const accessories = personality?.accessories || [];

  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? { className: "animate-float", style: { width: size, height: size } }
    : { style: { width: size, height: size } };

  return (
    <Wrapper {...(wrapperProps as any)}>
      <svg viewBox="60 60 200 210" width={size} height={size}>
        {/* Body wool - fluffy cloud shape */}
        <ellipse cx="155" cy="200" rx="50" ry="40" fill="#FAFAFA" stroke="#E8E8E8" strokeWidth="1" />
        <circle cx="120" cy="185" r="22" fill="#F5F5F5" />
        <circle cx="190" cy="185" r="22" fill="#F5F5F5" />
        <circle cx="130" cy="210" r="20" fill="#F0F0F0" />
        <circle cx="180" cy="210" r="20" fill="#F0F0F0" />
        <circle cx="155" cy="220" r="18" fill="#F5F5F5" />

        {/* Legs */}
        <rect x="132" y="235" width="10" height="25" rx="5" fill="#2D3436" />
        <rect x="168" y="235" width="10" height="25" rx="5" fill="#2D3436" />

        {/* Hooves */}
        <ellipse cx="137" cy="261" rx="7" ry="4" fill="#636E72" />
        <ellipse cx="173" cy="261" rx="7" ry="4" fill="#636E72" />

        {/* Head */}
        <ellipse cx="155" cy="140" rx="38" ry="35" fill={color} />

        {/* Wool on head */}
        <circle cx="135" cy="110" r="14" fill="#FAFAFA" />
        <circle cx="155" cy="105" r="15" fill="#F5F5F5" />
        <circle cx="175" cy="110" r="14" fill="#FAFAFA" />
        <circle cx="145" cy="103" r="10" fill="#F0F0F0" />
        <circle cx="165" cy="103" r="10" fill="#F0F0F0" />

        {/* Ears */}
        <ellipse cx="118" cy="130" rx="12" ry="8" fill={secondaryColor} transform="rotate(-20,118,130)" />
        <ellipse cx="192" cy="130" rx="12" ry="8" fill={secondaryColor} transform="rotate(20,192,130)" />

        {/* Eyes */}
        {!accessories.includes("sleepMask") && !accessories.includes("sunglasses") && (
          <>
            <circle cx="143" cy="143" r="7" fill="white" />
            <circle cx="167" cy="143" r="7" fill="white" />
            <circle cx="145" cy="143" r="4" fill="#2D3436" />
            <circle cx="169" cy="143" r="4" fill="#2D3436" />
            <circle cx="146" cy="141" r="1.5" fill="white" />
            <circle cx="170" cy="141" r="1.5" fill="white" />
          </>
        )}

        {/* Nose */}
        <ellipse cx="155" cy="157" rx="5" ry="3.5" fill="#2D3436" opacity="0.6" />

        {/* Mouth - smile */}
        <path d="M148,162 Q155,168 162,162" fill="none" stroke="#2D3436" strokeWidth="1.5" opacity="0.5" />

        {/* Blush */}
        <circle cx="133" cy="155" r="6" fill="#FF6B81" opacity="0.2" />
        <circle cx="177" cy="155" r="6" fill="#FF6B81" opacity="0.2" />

        {/* Tail */}
        <circle cx="105" cy="195" r="10" fill="#F5F5F5" />
        <circle cx="100" cy="190" r="7" fill="#FAFAFA" />

        {/* Accessories */}
        {accessories.map((acc) => renderAccessory(acc, secondaryColor))}
      </svg>
    </Wrapper>
  );
}
