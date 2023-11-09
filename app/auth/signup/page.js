"use client";
import React from "react";
import AuthFormContainer from "../../components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from "yup";
import { filterFormikErrors } from "@/utils/formikHelper";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is Required"),
  password: yup
    .string()
    .min(8, "Password at least 8 digits!")
    .max(50, "Too Long!")
    .required("Password is Required"),
  email: yup.string().email("Invalid email").required("Email is Required"),
});

export default function SignUp() {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(values),
      }).then(async (res) => {
        if (res.ok) {
          const result = await res.json();
          console.log(result);
        }
      });
    },
  });

  const formErrors = filterFormikErrors(errors, touched, values);

  const { name, email, password } = values;
  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input
        name="name"
        label="Name"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        name="email"
        label="Email"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button type="submit" className="w-full">
        Sign up
      </Button>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div key={err} className="space-x-1 flex items-center text-red-500">
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}
