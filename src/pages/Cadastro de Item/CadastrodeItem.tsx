import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ItemForm {
  codigo: string;
  descricao: string;
  categoria: string;
  unidade: string;
  fornecedor: string;
  estoqueMinimo: string;
}

const CadastrarItemPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ItemForm>({
    codigo: "",
    descricao: "",
    categoria: "",
    unidade: "",
    fornecedor: "",
    estoqueMinimo: "0",
  });

  const handleInputChange = (field: keyof ItemForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return (
      formData.codigo.trim() !== "" &&
      formData.descricao.trim() !== "" &&
      formData.categoria !== "" &&
      formData.unidade !== "" &&
      formData.estoqueMinimo.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    console.log("Dados do novo item:", formData);
    
    toast({
      title: "Item cadastrado com sucesso!",
      description: `O item ${formData.codigo} foi registrado no sistema.`,
      variant: "default",
    });

    // Reset form after successful submission
    setFormData({
      codigo: "",
      descricao: "",
      categoria: "",
      unidade: "",
      fornecedor: "",
      estoqueMinimo: "0",
    });
  };

  const handleCancel = () => {
    setFormData({
      codigo: "",
      descricao: "",
      categoria: "",
      unidade: "",
      fornecedor: "",
      estoqueMinimo: "0",
    });
    
    toast({
      title: "Formulário limpo",
      description: "Todos os campos foram resetados.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl">
        <Card className="shadow-lg border-border/50">
          <CardHeader className="space-y-2 pb-8">
            <Link to="/cadastros/itens/novo">
            <CardTitle className="text-2xl font-bold text-foreground">
              Cadastrar Novo Item no Almoxarifado
            </CardTitle>
            </Link>
            <p className="text-muted-foreground text-base">
              Preencha os dados abaixo para registrar um novo produto ou material
            </p>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Código do Item */}
                <div className="space-y-2">
                  <Label htmlFor="codigo" className="text-sm font-medium text-foreground">
                    Código do Item <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="codigo"
                    type="text"
                    placeholder="Ex: MP001"
                    value={formData.codigo}
                    onChange={(e) => handleInputChange("codigo", e.target.value)}
                    className="h-10"
                    required
                  />
                </div>

                {/* Descrição Completa */}
                <div className="space-y-2">
                  <Label htmlFor="descricao" className="text-sm font-medium text-foreground">
                    Descrição Completa <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="descricao"
                    type="text"
                    placeholder="Ex: Aço Carbono 1020"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    className="h-10"
                    required
                  />
                </div>

                {/* Categoria */}
                <div className="space-y-2">
                  <Label htmlFor="categoria" className="text-sm font-medium text-foreground">
                    Categoria <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) => handleInputChange("categoria", value)}
                    required
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="materia-prima">Matéria-Prima</SelectItem>
                      <SelectItem value="produtos-fastil">Produtos Fastil</SelectItem>
                      <SelectItem value="componentes">Componentes</SelectItem>
                      <SelectItem value="consumiveis-epis">Consumíveis/EPIs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Unidade de Medida */}
                <div className="space-y-2">
                  <Label htmlFor="unidade" className="text-sm font-medium text-foreground">
                    Unidade de Medida <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.unidade}
                    onValueChange={(value) => handleInputChange("unidade", value)}
                    required
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pc">Peça (PC)</SelectItem>
                      <SelectItem value="un">Unidade (UN)</SelectItem>
                      <SelectItem value="m">Metro (M)</SelectItem>
                      <SelectItem value="kg">Quilograma (KG)</SelectItem>
                      <SelectItem value="l">Litro (L)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fornecedor Padrão */}
                <div className="space-y-2">
                  <Label htmlFor="fornecedor" className="text-sm font-medium text-foreground">
                    Fornecedor Padrão
                  </Label>
                  <Input
                    id="fornecedor"
                    type="text"
                    placeholder="Ex: Usiminas"
                    value={formData.fornecedor}
                    onChange={(e) => handleInputChange("fornecedor", e.target.value)}
                    className="h-10"
                  />
                </div>

                {/* Estoque Mínimo */}
                <div className="space-y-2">
                  <Label htmlFor="estoqueMinimo" className="text-sm font-medium text-foreground">
                    Estoque Mínimo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="estoqueMinimo"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.estoqueMinimo}
                    onChange={(e) => handleInputChange("estoqueMinimo", e.target.value)}
                    className="h-10"
                    required
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-3 pt-6"> 
              <Link to="/cadastros/itens/novo">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-6"
              >
                Cancelar
              </Button>
                </Link>

              <Button
                type="submit"
                disabled={!isFormValid()}
                className="px-6 bg-primary hover:bg-primary-hover"
              >
                Cadastrar Item
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CadastrarItemPage;