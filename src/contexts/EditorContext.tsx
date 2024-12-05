import { createContext, MutableRefObject, ReactNode, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

type contextProps = {
  initEditor: () => void;
  editorInstanceRef: MutableRefObject<EditorJS | null>;
};

export const EditorContext = createContext<contextProps>({} as contextProps);

export type EditorContextProviderProps = {
  children: ReactNode;
  text?: string;
  onChange: (content: string) => void;
};

export function EditorContextProvider({
  children,
  onChange,
  text,
}: EditorContextProviderProps) {
  const editorInstanceRef = useRef<EditorJS | null>(null);

  const initEditor = () => {
    let outputData: OutputData | undefined;
    try {
      if (text) outputData = JSON.parse(text) as OutputData;
      console.log(text);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }

    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Escreva algo...",
      data: outputData,
      tools: {
        // list: List,
      },

      onChange: async () => {
        const data = await editorInstanceRef.current?.save();
        const jsonString = JSON.stringify(data);
        onChange(jsonString);
      },
    });

    editorInstanceRef.current = editor;
  };

  const save: contextProps = {
    initEditor,
    editorInstanceRef,
  };

  return (
    <EditorContext.Provider value={save}>{children}</EditorContext.Provider>
  );
}
