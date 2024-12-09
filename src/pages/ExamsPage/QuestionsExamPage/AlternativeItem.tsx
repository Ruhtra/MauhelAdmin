import React, { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ContentTypeSelect } from "@/components/ContentTypeSelect";
import { QuestionFormValues } from "./QuestionForm";
import { Button } from "@/components/ui/button";
import { GripVertical, X, ImageIcon, Bold, Italic, Superscript } from 'lucide-react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder';

interface AlternativeItemProps {
  index: number;
  dragHandleProps: React.HTMLAttributes<HTMLDivElement>;
  onRemove: () => void;
}

export function AlternativeItem({
  index,
  dragHandleProps,
  onRemove,
}: AlternativeItemProps) {
  const { control, setValue, watch } = useFormContext<QuestionFormValues>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showToolbar, setShowToolbar] = useState(false);


  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: `Digite a alternativa ${String.fromCharCode(65 + index)}`
      }),
    ],
    editorProps: {
      attributes: {
        class: 'outline-none h-[100%] min-h-[3em] p-1'
      },
    },
    content: watch(`alternatives.${index}.content`) || "",
    onUpdate: ({ editor }) => {
      console.log('abkaebl');
      
      setValue(`alternatives.${index}.content`, editor.getHTML());
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreviewImage(result);
          setValue(`alternatives.${index}.content`, result);
          setValue(`alternatives.${index}.contentType`, "image");
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue, index]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div {...dragHandleProps} className="cursor-move">
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        <FormField
          control={control}
          name={`alternatives.${index}.contentType`}
          render={({ field }) => (
            <ContentTypeSelect
              value={field.value}
              onChange={field.onChange}
              onTypeChange={(value) => {
                if (value === "text") {
                  setValue(`alternatives.${index}.content`, "");
                  setPreviewImage(null);
                }
              }}
              label=""
              className="w-32"
            />
          )}
        />
        <FormField
          control={control}
          name="correctAlternative"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex items-center"
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`correct-${index}`}
                  />
                  <label
                    htmlFor={`correct-${index}`}
                    className="text-xs text-gray-600 ml-1"
                  >
                    Correta
                  </label>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 ml-auto"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <FormField
        control={control}
        name={`alternatives.${index}.content`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              {watch(`alternatives.${index}.contentType`) === "text" ? (
                <div
                  className="relative"
                  onFocus={() => setShowToolbar(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setShowToolbar(false);
                    }
                  }}
                >
                  <div
                    className={`transition-all duration-300 ${
                      showToolbar ? "h-12 opacity-100" : "h-0 opacity-0"
                    } overflow-hidden mb-2`}
                  >
                    <div className="flex space-x-2">
                      <Button type="button" variant="outline" size="icon" onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive("bold") ? "bg-muted" : ""}>
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="outline" size="icon" onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive("italic") ? "bg-muted" : ""}>
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="outline" size="icon" onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive("superscript") ? "bg-muted" : ""}>
                        <Superscript className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-md h-full focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <EditorContent
                      editor={editor}
                      content={field.value}
                      // onChange={() => {
                      //   field.onChange(editor?.getHTML() || '');
                      // }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={`w-full border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
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
    </div>
  );
}

