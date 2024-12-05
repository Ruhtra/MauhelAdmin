import { useState, useCallback } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "lucide-react";
import { ContentTypeSelect } from "@/components/ContentTypeSelect";

const formSchema = z.object({
  number: z.string().min(1, {
    message: "Número do texto é obrigatório.",
  }),
  contentType: z.enum(["text", "image"]),
  content: z.string().min(1, {
    message: "Conteúdo é obrigatório.",
  }),
  reference: z.string().min(1, {
    message: "Referência é obrigatória.",
  }),
});

interface CreateTextDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTextDialog({
  open,
  onOpenChange,
}: CreateTextDialogProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      contentType: "text",
      content: "",
      reference: "",
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
          form.setValue("content", reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Criar Novo Texto
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center space-x-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm font-medium">
                      Nº do texto
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="text-sm" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => (
                  <ContentTypeSelect
                    value={field.value}
                    onChange={field.onChange}
                    onTypeChange={(value) => {
                      if (value === "text") {
                        form.setValue("content", "");
                        setPreviewImage(null);
                      }
                    }}
                    className="flex-1"
                  />
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Conteúdo
                  </FormLabel>
                  <FormControl>
                    {form.watch("contentType") === "text" ? (
                      <Textarea
                        {...field}
                        className="min-h-[300px] text-sm resize-y"
                        placeholder="Digite o conteúdo do texto aqui..."
                      />
                    ) : (
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
                          isDragActive
                            ? "border-primary bg-primary/10"
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        <input {...getInputProps()} />
                        {previewImage ? (
                          <div className="max-w-full max-h-[300px] mx-auto relative">
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="max-w-full max-h-[300px] object-contain"
                            />
                          </div>
                        ) : (
                          <div className="py-10">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">
                              Arraste uma imagem ou clique para selecionar
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Referência
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="text-sm italic" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="text-sm">
                Criar Texto
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
