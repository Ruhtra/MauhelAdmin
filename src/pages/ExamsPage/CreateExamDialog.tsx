import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComboboxCreate } from "@/components/comboboxCreate";
import { YearPicker } from "./YearPicker";

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  year: z
    .number()
    .min(1900, {
      message: "O ano deve ser após 1900.",
    })
    .max(currentYear, {
      message: `O ano deve ser no máximo ${currentYear}.`,
    }),
  instituto: z.string().min(2, {
    message: "Instituto deve ter pelo menos 2 caracteres.",
  }),
  banca: z.string().min(2, {
    message: "Banca deve ter pelo menos 2 caracteres.",
  }),
  position: z.string().min(2, {
    message: "Cargo deve ter pelo menos 2 caracteres.",
  }),
  level: z.string().min(1, {
    message: "Por favor selecione um nível.",
  }),
});

const institutos = [
  "Instituto Federal",
  "Universidade Federal",
  "Universidade Estadual",
  "Prefeitura Municipal",
  "Governo do Estado",
];

const bancas = [
  "CESPE",
  "CEBRASPE",
  "FCC",
  "VUNESP",
  "IBFC",
  "IADES",
  "FUNDATEC",
];

const niveis = ["Fundamental", "Médio", "Superior"];

const cargos = [
  "Professor",
  "Técnico Administrativo",
  "Analista",
  "Assistente",
  "Coordenador",
];

interface CreateExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateExamDialog({
  open,
  onOpenChange,
}: CreateExamDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: currentYear,
      instituto: "",
      banca: "",
      position: "",
      level: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-lg font-semibold">
            Criar Novo Exame
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Ano</FormLabel>
                    <FormControl>
                      <YearPicker
                        value={field.value}
                        onChange={field.onChange}
                        minYear={1900}
                        maxYear={currentYear}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Nível</FormLabel>
                    <FormControl>
                      <ComboboxCreate
                        options={niveis}
                        value={field.value}
                        onSetValue={field.onChange}
                        placeholder="Selecione o nível"
                        emptyMessage="Nenhum nível encontrado."
                        searchPlaceholder="Procurar nível..."
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="instituto"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium">
                    Instituto
                  </FormLabel>
                  <FormControl>
                    <ComboboxCreate
                      options={institutos}
                      value={field.value}
                      onSetValue={field.onChange}
                      placeholder="Selecione o instituto"
                      emptyMessage="Nenhum instituto encontrado."
                      searchPlaceholder="Procurar instituto..."
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banca"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium">Banca</FormLabel>
                  <FormControl>
                    <ComboboxCreate
                      options={bancas}
                      value={field.value}
                      onSetValue={field.onChange}
                      placeholder="Selecione a banca"
                      emptyMessage="Nenhuma banca encontrada."
                      searchPlaceholder="Procurar banca..."
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium">Cargo</FormLabel>
                  <FormControl>
                    <ComboboxCreate
                      options={cargos}
                      value={field.value}
                      onSetValue={field.onChange}
                      placeholder="Selecione o cargo"
                      emptyMessage="Nenhum cargo encontrado."
                      searchPlaceholder="Procurar cargo..."
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <DialogFooter className="pb-6">
              <Button type="submit" className="text-sm">
                Criar Exame
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
