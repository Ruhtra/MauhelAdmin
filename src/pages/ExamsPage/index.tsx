import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, MoreHorizontal, Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { CreateExamDialog } from "./CreateExamDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";

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
  // const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterYear, setFilterYear] = useState<number | "all">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const years = Array.from(new Set(examData.map((exam) => exam.year))).sort(
    (a, b) => b - a
  );

  const filteredAndSortedExams = examData
    .filter((exam) => filterYear === "all" || exam.year === filterYear)
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.year - b.year;
      } else {
        return b.year - a.year;
      }
    });

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log(`Edit exam ${id}`);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log(`Delete exam ${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Provas
        </h1>
        <div className="flex flex-wrap items-center gap-4">
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? (
              <ChevronUp className="mr-2 h-4 w-4" />
            ) : (
              <ChevronDown className="mr-2 h-4 w-4" />
            )}
            {sortOrder === "asc" ? "Mais antigos" : "Mais recentes"}
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Exame
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Posição</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>Instituto</TableHead>
              <TableHead>Banca</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Conteúdo</TableHead>
              <TableHead className="w-[50px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedExams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.position}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{exam.year}</Badge>
                </TableCell>
                <TableCell>{exam.instituto}</TableCell>
                <TableCell>
                  <Badge variant="outline">{exam.banca}</Badge>
                </TableCell>
                <TableCell>
                  <Badge>{exam.level}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Link to={`${exam.id}/questions`}>
                      <Button variant="outline" size="sm">
                        Questões
                      </Button>
                    </Link>
                    <Link to={`${exam.id}/texts`}>
                      <Button variant="outline" size="sm">
                        Textos
                      </Button>
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(exam.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(exam.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CreateExamDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}

