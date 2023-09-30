import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next"
import { RedirectType } from 'next/dist/client/components/redirect';

import { Modal } from '@/components/Modal';
import { ROUTE } from '@/config/route';
import { FormLogin } from './form';

import "./login.scss";

export default async function Login() {
  const session = await getServerSession();

  if (session?.user) {
    redirect(ROUTE.APP.HOME, "push" as RedirectType)
  }

  return (
    <div className="loginPage">
      <span>Login</span>
      <Modal size="sm">
        <FormLogin />
      </Modal>
    </div>
  );
}
