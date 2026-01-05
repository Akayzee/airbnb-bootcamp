// CategoryIcon.tsx
import React from "react";

// 1) Define a generic icon component shape both Lucide and react-icons satisfy
export type GenericIcon = React.ComponentType<{
  size?: number | string;
  className?: string;
}>;

// 2) Build a registry with whatever icons you actually use
//    (You can mix libraries here.)
import {
  Home,
  Coffee,
  Building2,
  Sailboat,
  Trees,
  Bus,
  Castle,
  Mountain,
  Box,
  Circle,
  Leaf,
  Tractor,
  HelpCircle,
  Bed,
  RadioTower,
  TreePine,
  Wind,
  Users,
  Wifi,
  Tv,
  CookingPot,
  WashingMachine,
  ParkingCircle,
  ParkingSquare,
  Snowflake,
  Laptop,
  Waves,
  Bath,
  Sun,
  Flame,
  UtensilsCrossed,
  Dice5,
  Music,
  Dumbbell,
  Umbrella,
  MountainSnow,
  ShowerHead,
  AlarmSmoke,
  FireExtinguisher,
} from "lucide-react";
// import { FaBeer } from "react-icons/fa";

export const ICONS: Record<string, GenericIcon> = {
  Home,
  Coffee,
  Users,
  HelpCircle,
  Building2,
  Sailboat,
  Trees,
  Bus,
  Castle,
  Mountain,
  Box,
  Circle,
  Leaf,
  Tractor,
  Bed,
  RadioTower,
  TreePine,
  Wind,
  Wifi,
  Tv,
  CookingPot,
  WashingMachine,
  ParkingCircle,
  ParkingSquare,
  Snowflake,
  Laptop,
  Waves,
  Bath,
  Sun,
  Flame,
  UtensilsCrossed,
  Dice5,
  Music,
  Dumbbell,
  Umbrella,
  MountainSnow,
  ShowerHead,
  AlarmSmoke,
  FireExtinguisher,

  // FaBeer, // example from react-icons
};

// 3) Component
type CustomIconProps = {
  /** Can be a string key (looked up in ICONS) or a component itself */
  icon: string | GenericIcon;
  /** Default size if none is provided */
  size?: number | string;
  className?: string;
  /** Optional custom fallback to avoid tying to any library */
  fallbackIcon?: GenericIcon;
};

export function CustomIcon({
  icon,
  size = 26,
  className,
  fallbackIcon: Fallback = HelpCircle, // you can pass your own fallback to avoid Lucide
}: CustomIconProps) {
  const Cmp: GenericIcon | undefined =
    typeof icon === "string" ? ICONS[icon] : icon;

  const Render = Cmp ?? Fallback;
  return <Render size={size} className={className} />;
}
