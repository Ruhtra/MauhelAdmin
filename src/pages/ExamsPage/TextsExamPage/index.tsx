import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateTextDialog } from "./CreateTextDialog";

export interface Text {
  id: string;
  number: string;
  linkedQuestions: number;
  content: string;
  reference: string;
}

const textData: Text[] = [
  {
    id: "1",
    number: "001",
    linkedQuestions: 5,
    content: "Este é um exemplo de texto...",
    reference: "Fonte: Livro X, Autor Y, 2023",
  },
  {
    id: "2",
    number: "002",
    linkedQuestions: 3,
    content: "Outro exemplo de texto...",
    reference: "Fonte: Artigo Z, Revista W, 2022",
  },
];

export function TextsExamPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Textos
        </h1>
        <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Texto
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {textData.map((text) => (
          <Card
            key={text.id}
            className="h-full transition-shadow hover:shadow-md"
          >
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Texto {text.number}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="mb-2 text-sm text-gray-500 line-clamp-3">
                {text.content}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  Nº {text.number}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {text.linkedQuestions} questões vinculadas
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CreateTextDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
