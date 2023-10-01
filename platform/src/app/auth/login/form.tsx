'use client'

import { useForm } from "react-hook-form";
import { Form } from "@/components/form";
import { Csrf } from "@/components/csrf";
import { Input } from "@/components/input";
import { Button } from "@/components/button/Button";
import { signIn } from "next-auth/react";

import { useRouter } from 'next/navigation';
import { ROUTE } from "@/config/route";
import Link from "next/link";
import toast from "react-hot-toast";

type FormLoginDataProps = {
  email: string;
  password: string;
  csrfToken: string;
}

export function FormLogin() {
  const { register, handleSubmit } = useForm<FormLoginDataProps>();
  const router = useRouter();


  async function onSubmitLogin(data: FormLoginDataProps) {
    const signInResponse = await signIn("credentials", { ...data, redirect: false })

    if (signInResponse?.error) {
      toast.error("User not found")
      return;
    }

    router.push(ROUTE.APP.HOME);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitLogin)}>
      <Csrf {...register("csrfToken")} />
      <Input
        displayName="E-mail"
        {...register("email")}
        type="text"
        className="nameInput"
      />

      <Input
        displayName="Password"
        {...register("password", { required: true })}
        type="password"
      />
      <small>
        Não possui conta? <Link href={ROUTE.APP.AUTH.REGISTER}>Crie aqui</Link>.
      </small>

      <Button className="buttonSignin" >Sign in</Button>
    </Form>
  )
}
