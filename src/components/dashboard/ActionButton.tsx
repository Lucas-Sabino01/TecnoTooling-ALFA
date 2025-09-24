import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  variant: "primary" | "destructive" | "secondary";
  onClick?: () => void;
  className?: string;
  path?: string;
}

export const ActionButton = ({ label, icon: Icon, variant, onClick, className, path }: ActionButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-primary-foreground hover:bg-primary-hover";
      case "destructive":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "secondary":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border";
      default:
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    }
  };

  if (path) {
    return (
      <Button asChild className={cn("h-12 px-6 font-medium transition-all", getVariantStyles(), className)}>
        <Link to={path}>
          <Icon className="mr-2 h-5 w-5" />
          {label}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      className={cn("h-12 px-6 font-medium transition-all", getVariantStyles(), className)}
    >
      <Icon className="mr-2 h-5 w-5" />
      {label}
    </Button>
  );
};