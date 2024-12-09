import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export interface EditorProps {
  placeHolder: string;
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ placeHolder, value, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeHolder,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "outline-none h-[100%] min-h-[3em] p-1",
      },
    },
  });

  return (
    <>
      <EditorContent
        editor={editor}
        onInput={() => {
          onChange(editor?.getHTML() || "");
        }}
      />
    </>
  );
}
