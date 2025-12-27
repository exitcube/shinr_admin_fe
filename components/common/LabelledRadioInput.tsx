import React from "react";

interface LabelledRadioInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const LabelledRadioInput: React.FC<LabelledRadioInputProps> = ({
  label,
  id,
  checked,
  ...props
}) => {
  const radioId = id ?? `radio-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <label
      htmlFor={radioId}
      className="flex items-center gap-2 cursor-pointer font-poppins"
    >
      {/* Native input: keep in DOM, hide visually */}
      <input
        id={radioId}
        type="radio"
        className="absolute opacity-0 w-0 h-0"
        checked={checked}
        {...props}
      />

      {/* Custom circle */}
      <span
        className={`relative h-4 w-4 rounded-full border border-[#188A82] flex items-center justify-center`}
      >
        {/* Inner dot */}
        <span
          className={`h-2 w-2 rounded-full bg-primary ${
            checked ? "opacity-100" : "opacity-0"
          } transition-opacity`}
        />
      </span>

      <span className="text-xs font-normal">{label}</span>
    </label>
  );
};
