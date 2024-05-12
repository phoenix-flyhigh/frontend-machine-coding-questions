import React from "react";

interface TitleFormProps {
  onSubmit: () => void;
  isFolder: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const TitleForm = ({
  onSubmit,
  onBlur,
  onChange,
  isFolder,
  value,
}: TitleFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex gap-4 items-center w-full">
        <span> {isFolder ? "📁" : "📄"}</span>
        <input
          autoFocus
          type="text"
          value={value}
          onChange={onChange}
          className="border-2 border-white  bg-black rounded-md w-48"
          onBlur={onBlur}
        />
      </div>
    </form>
  );
};

export default TitleForm;
