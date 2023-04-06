import { HeaderNavStyled, HeaderStyled } from '@/src/styles/header.styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StarRateIcon from '@mui/icons-material/StarRate';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';

const Home = ({ users }: any) => {
  return (
    <>
      <HeaderStyled>
        <div className="container">
          <div>
            <div>
              <Image
                src="/image/logo.png"
                alt="Banner"
                width={500}
                height={500}
              />
              <div>
                <h1>Original Burguer</h1>
                <p>aberto das 18:00 as 00:00</p>
              </div>
              <span>
                <StarRateIcon fontSize="small" color="warning" />
                <p>5</p>
              </span>
            </div>
            <nav>
              <button>
                <ShoppingCartCheckoutIcon color="primary" />
                <span>
                  <p>R$0,00</p>
                  <p>0 itens</p>
                </span>
              </button>
            </nav>
          </div>
          <HeaderNavStyled>
            <span>
              <button>
                Sobre
                <span />
              </button>
              <button>
                Horário
                <span />
              </button>
              <button>
                Pagamento
                <span />
              </button>
            </span>

            <div>
              <MonetizationOnIcon color="disabled" fontSize="small" />
              <p>Pedido mínimo R$ 10,00</p>
            </div>
          </HeaderNavStyled>
        </div>
      </HeaderStyled>
    </>
  );
};

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return {
    props: { users: JSON.parse(JSON.stringify(users)) },
  };
}

export default Home;
