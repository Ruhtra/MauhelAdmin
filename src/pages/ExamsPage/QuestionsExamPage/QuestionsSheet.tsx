import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { QuestionForm } from "./QuestionForm";

export function QuestionsSheet() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="sm">Nova Questão</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            Nova Questão
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <QuestionForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
