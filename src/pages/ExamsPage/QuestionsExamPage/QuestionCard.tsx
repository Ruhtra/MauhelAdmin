import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface QuestionProps {
  question: {
    id: string;
    statement: string;
    discipline: string;
    alternatives: {
      id: string;
      content: string;
      isCorrect: boolean;
    }[];
  };
}

export function QuestionCard({ question }: QuestionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="font-medium">Questão {question.id}</span>
          <Badge className="text-xs py-0.5 px-2">{question.discipline}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4 text-sm leading-relaxed">{question.statement}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Ocultar Alternativas
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Mostrar Alternativas
            </>
          )}
        </Button>
        {isExpanded && (
          <div className="mt-4 space-y-2">
            {question.alternatives.map((alt) => (
              <div
                key={alt.id}
                className={`rounded-md p-2 text-xs leading-relaxed ${
                  alt.isCorrect
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <span className="font-semibold">{alt.id})</span> {alt.content}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
