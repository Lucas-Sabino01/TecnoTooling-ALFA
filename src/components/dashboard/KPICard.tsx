import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  isAlert?: boolean;
  className?: string;
}

export const KPICard = ({ title, value, subtitle, icon: Icon, isAlert = false, className }: KPICardProps) => {
  return (
    <Card className={cn("p-6 shadow-lg border-0 hover:shadow-xl transition-all duration-300 cursor-pointer", className)} style={{ boxShadow: "var(--kpi-shadow)" }}>
      <CardContent className="p-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
            <p className={cn(
              "text-2xl font-bold mb-1 transition-colors",
              isAlert ? "text-destructive" : "text-foreground"
            )}>
              {value}
            </p>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className={cn(
            "p-3 rounded-lg transition-all duration-300",
            isAlert ? "bg-destructive/10 hover:bg-destructive/20" : "bg-primary/10 hover:bg-primary/20"
          )}>
            <Icon className={cn(
              "h-6 w-6 transition-colors",
              isAlert ? "text-destructive" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};