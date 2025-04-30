"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
  color?: string;
  width?: string;
}

export default function FormButton({ text, color='bg-gray-400', width='w-full' }: FormButtonProps) {
  const { pending } = useFormStatus();
  const className = `primary-btn h-10 ${width} border-1 border-solid rounded-2xl ${color} cursor-pointer disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed`;
  return (
    <button
      disabled={pending}
      className={className}
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}