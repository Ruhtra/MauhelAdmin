import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  StrikethroughIcon,
} from "lucide-react";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { useTheme } from "./ui/theme-provider";
import { cn } from "@/lib/utils";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const TiptapEditor = ({
  content,
  onChange,
  placeholder,
}: TiptapEditorProps) => {
  const { theme } = useTheme();

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      StarterKit.configure({
        document: false,
        paragraph: false,
        text: false,
        heading: false,
      }),
      Underline,
      TextStyle,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[30svh] mx-auto focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md p-2">
      <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Toggle underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Toggle strike"
        >
          <StrikethroughIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          aria-label="Toggle bullet list"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          aria-label="Toggle ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>
      <EditorContent
        className={cn(
          `prose ${theme == "dark" && "prose-invert"}  prose-purple`
        )}
        editor={editor}
      />
    </div>
  );
};

export default TiptapEditor;
