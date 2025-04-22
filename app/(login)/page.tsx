"use client"

import FormButton from "@/components/form-btn";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import { startTransition } from "react";


export default function Login() {
  const [state, action] = useFormState(handleForm, {code: 0});
  const inputCssClassName = 'h-10 w-full border-1 border-solid rounded-2xl bg-white p-3';
  return (
    <div className="flex justify-center items-center w-lvw h-lvh bg-gray-100">
      <form
        action={action}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget)
          startTransition(() => {
            action(formData)
          })
        }}
        className="flex flex-col gap-2 w-72"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={inputCssClassName}
          required
          />
        <input
          name="userName"
          type="text"
          placeholder="Username"
          className={inputCssClassName}
          required
          />
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={state?.errMessage ? `${inputCssClassName} border-red-500` : inputCssClassName}
            required
          />
          {state?.errMessage ? <div className="text-xs text-red-500">{state?.errMessage}</div> : undefined}
        </div>
        <FormButton text="Log in"/>
      </form>
    </div>
  );
}
