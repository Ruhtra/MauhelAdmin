import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { EditorJs } from "@/components/EditorJs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import WordLikeEditor from "@/components/wordEditor";

const formSchema = z.object({
  text: z.string(),
});

export function CreateEditorFile() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '{"time":1733421879605,"blocks":[{"id":"AtEQUuBhHX","type":"paragraph","data":{"text":"sjkflsfksm"}},{"id":"ENC462qMNo","type":"paragraph","data":{"text":"lksndlfknskfs"}}],"version":"2.30.7"}',
    },
  });

  //removed any from onSubmit
  const onSubmit = (e: any) => {
    console.log(e.text);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Criar editor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Criar EDITOR TEXTO
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center space-x-4">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm font-medium">
                      Nº do texto
                    </FormLabel>
                    <FormControl>
                      {/* <EditorJs
                        text={form.getValues("text")}
                        onChange={field.onChange}
                      /> */}
                      <WordLikeEditor />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
