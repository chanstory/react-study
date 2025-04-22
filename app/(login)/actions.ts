"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  "use server";
  const password = formData.get('password');
  if (password != '12345') {
    return {
      code: 1,
      errMessage: 'The password is incorrect'
    };
  }
  return {
    code: 0
  };
};
