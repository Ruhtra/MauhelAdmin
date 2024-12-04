import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { CreateExamDialog } from "./CreateExamDialog";

export interface Exam {
  id: string;
  year: number;
  instituto: string;
  banca: string;
  position: string;
  level: string;
}

const examData: Exam[] = [
  {
    id: "4fd4eeb1-7c98-4b4b-9121-5f1cb4956b0e",
    year: 2023,
    instituto: "Instituto Federal",
    banca: "CESPE",
    position: "Professor de Matemática",
    level: "Superior",
  },
  {
    id: "5fd4eeb1-7c98-4b4b-9121-5f1cb4956b0f",
    year: 2022,
    instituto: "Universidade Federal",
    banca: "CEBRASPE",
    position: "Professor de Física",
    level: "Superior",
  },
];

export function ExamsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterYear, setFilterYear] = useState<number | "all">("all");

  const years = Array.from(new Set(examData.map((exam) => exam.year))).sort(
    (a, b) => b - a
  );

  const filteredExams =
    filterYear === "all"
      ? examData
      : examData.filter((exam) => exam.year === filterYear);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Provas
        </h1>
        <div className="flex items-center space-x-4">
          <Select
            onValueChange={(value) =>
              setFilterYear(value === "all" ? "all" : parseInt(value))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os anos</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Exame
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredExams.map((exam) => (
          <Card
            key={exam.id}
            className="h-full transition-shadow hover:shadow-md"
          >
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{exam.position}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="mb-2 text-sm text-gray-500">{exam.instituto}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  {exam.year}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {exam.banca}
                </Badge>
                <Badge className="text-xs">{exam.level}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CreateExamDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
