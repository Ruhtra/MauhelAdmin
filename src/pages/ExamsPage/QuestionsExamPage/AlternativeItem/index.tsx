import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { QuestionFormValues } from "../QuestionForm";
import { ImageArea } from "./ImageArea";
import { Options } from "./Options";
import { Editor } from "./Editor";

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
  const { control, watch } = useFormContext<QuestionFormValues>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Options
          index={index}
          dragHandleProps={dragHandleProps}
          onRemove={onRemove}
          setPreviewImage={setPreviewImage}
        />
      </div>
      <FormField
        control={control}
        name={`alternatives.${index}.content`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              {watch(`alternatives.${index}.contentType`) === "text" ? (
                <Editor
                  placeHolder={`Digite a alternativa ${String.fromCharCode(
                    65 + index
                  )}`}
                  value={field.value}
                  onChange={field.onChange}
                />
              ) : (
                <ImageArea
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                  index={index}
                />
              )}
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}
