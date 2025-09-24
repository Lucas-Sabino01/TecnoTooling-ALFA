import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AlertItem {
  [key: string]: string | number;
}

interface AlertCardProps {
  title: string;
  icon: LucideIcon;
  type: "critical" | "warning";
  headers: string[];
  data: AlertItem[];
  className?: string;
}

export const AlertCard = ({ title, icon: Icon, type, headers, data, className }: AlertCardProps) => {
  const iconColor = type === "critical" ? "text-destructive" : "text-warning";
  const bgColor = type === "critical" ? "bg-destructive/10" : "bg-warning/10";

  return (
    <Card className={cn("shadow-lg border-0", className)} style={{ boxShadow: "var(--kpi-shadow)" }}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", bgColor)}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="text-xs font-medium text-muted-foreground">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="border-b border-border/50">
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex} className="py-2 text-sm text-foreground">
                    {row[header.toLowerCase().replace(/\s+/g, '')]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};