'use client'

import { useForm } from "react-hook-form";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button/Button";

import { useRouter } from 'next/navigation';
import { ROUTE } from "@/config/route";
import { User, UserCreate } from "@/repositories/user.repository";
import { CreateUserUseCaseError } from "@/application/user/create-user.use-case"
import { EitherJSON } from "@/utils/patterns";
import { useCallback } from "react";
import toast from "react-hot-toast";

type FormRegisterData = {
  name: string;
  email: string;
  password: string;
}

type FormRegisterProps = {
  onCreateUser(user: UserCreate): Promise<EitherJSON<CreateUserUseCaseError, User>>;

}

export function FormRegister({ onCreateUser }: FormRegisterProps) {
  const { register, handleSubmit } = useForm<FormRegisterData>();
  const router = useRouter();


  const onSubmitRegister = useCallback(async (data: FormRegisterData) => {
    // validate data not implementação

    // 
    const result = await onCreateUser(data);
    if (result.tag === "LEFT") {
      return console.error(result.error)
    }

    router.push(ROUTE.APP.AUTH.LOGIN);
  }, [router, onCreateUser])

  return (
    <Form onSubmit={handleSubmit(onSubmitRegister)}>
      <Input
        displayName="Name"
        {...register("name")}
        type="text"
        className="nameInput"
      />
      <Input
        displayName="Email"
        {...register("email")}
        type="text"
        className="nameInput"
      />



      <Input
        displayName="Senha"
        {...register("password", { required: true })}
        type="password"
      />

      <Button className="buttonSignin">Enviar</Button>
    </Form>
  )
}
