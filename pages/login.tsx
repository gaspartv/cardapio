import { LoadContext } from '@/src/contexts/loading.context';
import { UserContext } from '@/src/contexts/user.context';
import { ILoginUser } from '@/src/interfaces/login.interfaces';
import { loginReqShema } from '@/src/schemas/session/login.schema';
import { ButtonStyled } from '@/src/styles/button.styles';
import { FormErrorStyled } from '@/src/styles/formError.styles';
import { InputStyled } from '@/src/styles/input.styles';
import { LabalStyled } from '@/src/styles/label.styles';
import { LinkStyled } from '@/src/styles/link.styles';
import { SessionPageStyled } from '@/src/styles/login.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const router = useRouter();

  const [visiblePassword, setVisiblePassword] = React.useState(false);

  const { setLoad } = React.useContext(LoadContext);

  const { setUser, userAddress, setUserAddress } = React.useContext(
    UserContext
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginUser>({
    resolver: yupResolver(loginReqShema),
  });

  const userLogin = async ({ email, password }: ILoginUser): Promise<void> => {
    setLoad(true);

    try {
      const { data } = await axios.post('/api/login', { email, password });

      setUser(data.user);

      data.token && localStorage.setItem('token', data.token);

      toast.success('Login efetuado com sucesso!');

      router.push('/dashboard');
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
    setTimeout(() => {
      setLoad(false);
    }, 500);
  };

  const changeVisiblePassword = (): void => {
    visiblePassword ? setVisiblePassword(false) : setVisiblePassword(true);
  };

  return (
    <SessionPageStyled>
      <div className="container">
        <h1>Fazer login</h1>
        <form onSubmit={handleSubmit(userLogin)}>
          <div>
            <LabalStyled>Email</LabalStyled>
            <InputStyled {...register('email')} type="text" />
            <FormErrorStyled>
              {errors.email && errors.email.message}
            </FormErrorStyled>
          </div>

          <div>
            <LabalStyled>Senha</LabalStyled>
            <InputStyled
              type={visiblePassword ? 'text' : 'password'}
              {...register('password')}
            />
            <FormErrorStyled>
              {errors.password && errors.password.message}
            </FormErrorStyled>
            <span onClick={() => changeVisiblePassword()}>
              <Image
                src={
                  visiblePassword
                    ? '/image/invisible.png'
                    : '/image/visible.png'
                }
                alt="Visible password"
                width={20}
                height={20}
              />
            </span>
          </div>

          <div>
            <div>
              <p>
                Esqueci minha senha.{' '}
                <LinkStyled href="/recovery">
                  Recuperar
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
            <ButtonStyled type="submit">Entrar</ButtonStyled>
          </div>
        </form>
      </div>
    </SessionPageStyled>
  );
};

export default LoginPage;
