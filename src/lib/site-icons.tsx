import type { ComponentType } from "react";
import {
  Award,
  BookOpen,
  Clock,
  CreditCard,
  Eye,
  FileText,
  Globe,
  GraduationCap,
  HeadphonesIcon,
  Heart,
  Lightbulb,
  MessageCircle,
  Shield,
  Target,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

export const siteIconMap = {
  award: Award,
  "book-open": BookOpen,
  clock: Clock,
  "credit-card": CreditCard,
  eye: Eye,
  "file-text": FileText,
  globe: Globe,
  "graduation-cap": GraduationCap,
  headphones: HeadphonesIcon,
  heart: Heart,
  lightbulb: Lightbulb,
  "message-circle": MessageCircle,
  shield: Shield,
  target: Target,
  "trending-up": TrendingUp,
  "user-check": UserCheck,
  users: Users,
} as const;

export function resolveSiteIcon(
  iconName: keyof typeof siteIconMap | null | string | undefined,
  fallback: ComponentType<{ className?: string }>
) {
  if (iconName && iconName in siteIconMap) {
    return siteIconMap[iconName as keyof typeof siteIconMap];
  }

  return fallback;
}
