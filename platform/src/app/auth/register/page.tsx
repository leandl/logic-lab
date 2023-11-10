import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next"
import { RedirectType } from 'next/dist/client/components/redirect';

import { Modal } from '@/components/Modal';
import { ROUTE } from '@/config/route';

import { FormRegister } from './form';

import "./paeg-register.scss";
import { wrapperCreateUserServerToClient } from '@/actions/user/create-user.action';

export default async function Register() {
  const session = await getServerSession();

  if (session?.user) {
    redirect(ROUTE.APP.HOME, "push" as RedirectType)
  }

  return (
    <div className="page-register">
      <Modal className="sm" title='Cadastrar'>
        <FormRegister onCreateUser={wrapperCreateUserServerToClient} />
      </Modal>
    </div>
  );
}
