"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { RichTextMenuBar } from "./RichTextMenuBar";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: "<p>Welcome to Tiptap</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "border-t border-[#C2C2C2] min-h-[100px] rounded-lg py-2 px-3 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
      },
    },
  });
  return (
    <div className="border border-[#C2C2C2] rounded-lg  ">
      <RichTextMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
export default RichTextEditor;
