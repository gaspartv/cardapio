import { LoadContext } from '@/src/contexts/loading.context';
import { IUserCreate } from '@/src/interfaces/user.interfaces';
import { createUserReqShema } from '@/src/schemas/user/createUser.schema';
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

const RegisterPage = () => {
  const router = useRouter();

  const { setLoad } = React.useContext(LoadContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreate>({
    resolver: yupResolver(createUserReqShema),
  });

  const userCreate = async ({ email, name }: IUserCreate): Promise<void> => {
    setLoad(true);

    try {
      await axios.post('/api/user/create', { email, name });

      toast.success('Cadastro realizado com sucesso!');

      router.push('/login');
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
        <h1>Criar cadastro</h1>
        <form onSubmit={handleSubmit(userCreate)}>
          <div>
            <LabalStyled>Nome</LabalStyled>
            <InputStyled type="text" {...register('name')} />
            <FormErrorStyled>
              {errors.name && errors.name.message}
            </FormErrorStyled>
          </div>

          <div>
            <LabalStyled>Email</LabalStyled>
            <InputStyled type="text" {...register('email')} />
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

            <ButtonStyled type="submit">Registrar</ButtonStyled>
          </div>
        </form>
      </div>
    </SessionPageStyled>
  );
};

export default RegisterPage;
