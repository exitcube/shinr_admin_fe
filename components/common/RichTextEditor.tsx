"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type RichTextEditorProps = {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start typing...",
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  return (
    <div className="border rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
      {editor && (
        <EditorContent
          editor={editor}
          className="p-2 min-h-[150px] text-sm prose prose-sm max-w-full"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default RichTextEditor;
