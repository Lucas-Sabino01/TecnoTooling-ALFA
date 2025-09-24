import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const ChartCard = ({ title, children, className }: ChartCardProps) => {
  return (
    <Card className={cn("shadow-lg border-0 mb-6", className)} style={{ boxShadow: "var(--kpi-shadow)" }}>
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};