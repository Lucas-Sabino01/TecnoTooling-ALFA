import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface EmptyPageProps {
  title: string;
  description?: string;
}

const EmptyPage = ({ title, description = "Esta página está em desenvolvimento" }: EmptyPageProps) => {
  return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Construction className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{description}</p>
              <p className="text-sm text-muted-foreground">
                Esta funcionalidade será implementada em breve.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default EmptyPage;