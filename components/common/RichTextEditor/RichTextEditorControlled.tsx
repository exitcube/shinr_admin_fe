"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder"; 
import { RichTextMenuBar } from "./RichTextMenuBar";
import { useState } from "react";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?:string;
}

const RichTextEditorControlled = ({
  value,
  onChange,
  maxLength,
  placeholder
}: Props) => {
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: "list-disc ml-3" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal ml-3" },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Placeholder.configure({ // <-- Add extension
        placeholder,
        showOnlyWhenEditable: true, // only shows when editor is empty & editable
      }),
    ],
    content: value || "<p></p>",
    immediatelyRender: false,
    onUpdate({ editor }) {
      const text = editor.getText();
      const length = text.length;

      // // Enforce max length (optional)
      // if (maxLength && length > maxLength) {
      //   editor.commands.undo();
      //   return;
      // }

      setCharCount(length);
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "border-t border-[#C2C2C2] min-h-[100px] rounded-lg py-2 px-3 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 break-words whitespace-pre-wrap overflow-wrap-anywhere",
      },
    },
  });

  if (!editor) return <div className="min-h-[100px]" />;

  return (
    <div className="relative">
      <div className="border border-[#C2C2C2] rounded-lg focus-within:border-[#C2C2C2]">
        <RichTextMenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      {maxLength !== undefined && (
        <div className={`absolute right-1 -bottom-5 text-xs ${charCount > maxLength ? 'text-red-500': 'text-gray-500'} `}>
          {charCount}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default RichTextEditorControlled;
