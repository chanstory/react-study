"use client"

import FormButton from "@/components/form-btn";
import { useFormState } from "react-dom";
import { join } from "./actions";
import { startTransition } from "react";


export default function CreateAccount() {
  const [state, action] = useFormState(join, null);
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
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={state?.fieldErrors.email ? `${inputCssClassName} border-red-500` : inputCssClassName}
            required
          />
          {state?.fieldErrors.email ? <div className="text-xs text-red-500">{state?.fieldErrors.email}</div> : undefined}
        </div>
        <div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            className={state?.fieldErrors.username ? `${inputCssClassName} border-red-500` : inputCssClassName}
            required
          />
          {state?.fieldErrors.username ? <div className="text-xs text-red-500">{state?.fieldErrors.username}</div> : undefined}
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={state?.fieldErrors.password ? `${inputCssClassName} border-red-500` : inputCssClassName}
            required
          />
          {state?.fieldErrors.password ? <div className="text-xs text-red-500">{state?.fieldErrors.password}</div> : undefined}
        </div>
        <div>
          <input
            name="confirm_password"
            type="password"
            placeholder="Password"
            className={state?.fieldErrors.confirm_password ? `${inputCssClassName} border-red-500` : inputCssClassName}
            required
          />
          {state?.fieldErrors.confirm_password ? <div className="text-xs text-red-500">{state?.fieldErrors.confirm_password}</div> : undefined}
        </div>
        <FormButton text="Join"/>
      </form>
    </div>
  );
}
