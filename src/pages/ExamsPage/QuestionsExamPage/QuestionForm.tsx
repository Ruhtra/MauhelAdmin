import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DraggableAlternatives } from "./DraggableAlternatives";
import * as z from "zod";

export const questionFormSchema = z.object({
  statement: z
    .string()
    .min(1, "O enunciado é obrigatório")
    .max(1000, "O enunciado deve ter no máximo 1000 caracteres"),
  discipline: z.string().min(1, "A disciplina é obrigatória"),
  alternatives: z
    .array(
      z.object({
        content: z.string().min(1, "O conteúdo da alternativa é obrigatório"),
      })
    )
    .min(2, "Deve haver pelo menos duas alternativas"),
  correctAlternative: z.string().min(1, "Deve haver uma alternativa correta"),
});

export type QuestionFormValues = z.infer<typeof questionFormSchema>;

const disciplines = [
  "Matemática",
  "Português",
  "História",
  "Geografia",
  "Ciências",
  "Física",
  "Química",
  "Biologia",
  "Inglês",
  "Educação Física",
];

export function QuestionForm() {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      statement: "",
      discipline: "",
      alternatives: [{ content: "" }, { content: "" }],
      correctAlternative: "",
    },
  });

  const onSubmit = (data: QuestionFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="statement"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Enunciado</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite o enunciado da questão aqui"
                  className="min-h-[100px] text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discipline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Disciplina</FormLabel>
              <FormControl>
                <Combobox
                  options={disciplines}
                  value={field.value}
                  onSetValue={field.onChange}
                  placeholder="Selecione uma disciplina"
                  emptyMessage="Nenhuma disciplina encontrada"
                  searchPlaceholder="Buscar disciplina"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="text-sm font-medium">Alternativas</FormLabel>
          <DraggableAlternatives />
          <FormMessage className="text-xs" />
        </FormItem>

        <Button type="submit" className="w-full text-sm">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
