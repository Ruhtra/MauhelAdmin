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
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-medium">Questão {question.id}</span>
          <Badge className="text-xs py-0.5 px-1.5">{question.discipline}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm leading-tight">{question.statement}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs py-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-3 w-3" />
              Ocultar Alternativas
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-3 w-3" />
              Mostrar Alternativas
            </>
          )}
        </Button>
        {isExpanded && (
          <div className="mt-3 space-y-1.5">
            {question.alternatives.map((alt) => (
              <div
                key={alt.id}
                className={`rounded-md p-1.5 text-xs leading-snug ${
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
