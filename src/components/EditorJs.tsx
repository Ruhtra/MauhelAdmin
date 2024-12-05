import { EditorContextProvider } from "@/contexts/EditorContext";
import { useContext, useEffect, useRef } from "react";
import { EditorContext } from "@/contexts/EditorContext";

export type EditorJsProps = {
  onChange: (selectedText: string) => void;
  text: string;
};
export function EditorJs({ text, onChange }: EditorJsProps) {
  return (
    <EditorContextProvider text={text} onChange={onChange}>
      <EditorFile />
    </EditorContextProvider>
  );
}

export function EditorFile() {
  const { initEditor } = useContext(EditorContext);
  const editorRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
      editorRef.current = true;
    }
    return () => {};
  }, []);

  return <div id="editorjs" />;
}
