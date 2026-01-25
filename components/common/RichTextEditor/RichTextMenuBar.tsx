/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";
import React from "react";

export const RichTextMenuBar: React.FC<IProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Bold className="size-3" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-3" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Underline className="size-3" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      preesed: editor.isActive("Underline"),
    },
    {
      icon: <AlignLeft className="size-3" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-3" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-3" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-3" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-3" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
  ];

  return (
    <div className=" z-50 flex items-center gap-0">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.preesed}
          onPressedChange={option.onClick}
          className="hover:cursor-pointer hover:bg-gray-200"
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

interface IProps {
  editor: Editor | null;
}
