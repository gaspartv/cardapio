import { LoadContext } from '@/src/contexts/loading.context';
import { IUserRecovery } from '@/src/interfaces/user.interfaces';
import { recoveryUserReqShema } from '@/src/schemas/user/recoveryUser.schema';
import { ButtonStyled } from '@/src/styles/button.styles';
import { FormErrorStyled } from '@/src/styles/formError.styles';
import { InputStyled } from '@/src/styles/input.styles';
import { LabalStyled } from '@/src/styles/label.styles';
import { LinkStyled } from '@/src/styles/link.styles';
import { SessionPageStyled } from '@/src/styles/login.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const RecoveryPage = () => {
  const router = useRouter();

  const { setLoad } = React.useContext(LoadContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRecovery>({
    resolver: yupResolver(recoveryUserReqShema),
  });

  const userRecovery = async ({ email }: IUserRecovery): Promise<void> => {
    setLoad(true);

    try {
      await axios.patch('/api/user/recovery', { email });

      toast.success('Nova senha enviada para seu email.');

      setTimeout(() => {
        router.push('/login');
      }, 500);
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
    setTimeout(() => {
      setLoad(false);
    }, 500);
  };

  return (
    <SessionPageStyled>
      <div className="container">
        <h1>Recuperar senha</h1>
        <form onSubmit={handleSubmit(userRecovery)}>
          <div>
            <LabalStyled>Email</LabalStyled>
            <InputStyled {...register('email')} type="text" />
            <FormErrorStyled>
              {errors.email && errors.email.message}
            </FormErrorStyled>
          </div>

          <div>
            <div>
              <p>
                Já tenho cadastro.{' '}
                <LinkStyled href="/login">
                  Entrar
                  <span />
                </LinkStyled>
              </p>
            </div>
            <div>
              <p>
                Não tenho cadastro.{' '}
                <LinkStyled href="/register">
                  Cadastrar-se
                  <span />
                </LinkStyled>
              </p>
            </div>
            <ButtonStyled type="submit">Recuperar</ButtonStyled>
          </div>
        </form>
      </div>
    </SessionPageStyled>
  );
};

export default RecoveryPage;
