import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { QuestionForm, questionFormSchema } from "./QuestionForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";

export function QuestionsSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      number: undefined,
      linkedTexts: [],
      statement: "",
      discipline: "",
      alternatives: [
        { content: "", contentType: "text" },
        { content: "", contentType: "text" },
      ],
      correctAlternative: "",
    },
  });

  function onSubmit(values: z.infer<typeof questionFormSchema>) {
    console.log(values);
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="sm">Nova Questão</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-3xl p-4 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold">
                Nova Questão
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <QuestionForm control={form.control} />
            </div>
            <SheetFooter>
              <Button type="submit" className="w-full sm:w-auto">
                Criar Questão
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
