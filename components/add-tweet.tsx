"use client";

import { useFormState } from "react-dom";
import FormButton from "./form-btn";
import { post } from "@/app/(tweets)/actions";
import { startTransition } from "react";

export default function AddTweet() {
  const [state, action] = useFormState(post, null);
  if (state != null) {
    window.location.reload();
  }
  return (
    <div className="w-1/2 border-2 rounded-2xl mb-10 p-1">
      <form
        action={action}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget)
          startTransition(() => {
            action(formData)
          })
        }}
        className="flex flex-col justify-center items-center">
        <div className="flex w-full justify-center mb-1">
          <textarea name="tweet" className="w-9/10 border-2"/>
        </div>
        <FormButton text="Post" color="bg-blue-500" width="w-9/10"/>
      </form>
    </div>
  );
}