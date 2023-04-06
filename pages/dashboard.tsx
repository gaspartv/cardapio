/* eslint-disable react-hooks/exhaustive-deps */
import { DashboardAddressComponent } from '@/src/components/dashboardAddress.components';
import { DashboardShoppingComponent } from '@/src/components/dashboardShopping.components';
import { DashboardUserComponent } from '@/src/components/dashboardUser.components';
import { UserContext } from '@/src/contexts/user.context';
import { HeaderNavStyled, HeaderStyled } from '@/src/styles/header.styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StarRateIcon from '@mui/icons-material/StarRate';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';

const DashboardPage = () => {
  const [dashboardUser, setDashboardUser] = React.useState(true);
  const [dashboardAddres, setDashboardAddres] = React.useState(false);
  const [dashboardShopping, setDashboardShopping] = React.useState(false);

  const { user,userAddress, setUserAddress } = React.useContext(UserContext);

  React.useEffect( () => {
    const getAddress = async () => {
      const token: string | null = localStorage.getItem("token");
      
      const { data } = await axios.get(`/api/address/${Number(user?.addressId)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      setUserAddress(data.address)
    }
    getAddress()
  }, [user])


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
              <button
                onClick={() => {
                  setDashboardUser(true);
                  setDashboardAddres(false);
                  setDashboardShopping(false);
                }}
              >
                Meus dados
                <span />
              </button>
              <button
                onClick={() => {
                  setDashboardUser(false);
                  setDashboardAddres(true);
                  setDashboardShopping(false);
                }}
              >
                Meu endereço
                <span />
              </button>
              <button
                onClick={() => {
                  setDashboardUser(false);
                  setDashboardAddres(false);
                  setDashboardShopping(true);
                }}
              >
                Minhas compras
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
      <main>
        {dashboardUser && <DashboardUserComponent user={user} />}
        {dashboardAddres && <DashboardAddressComponent userAddress={userAddress}/>}
        {dashboardShopping && <DashboardShoppingComponent />}
      </main>
    </>
  );
};

export default DashboardPage;
