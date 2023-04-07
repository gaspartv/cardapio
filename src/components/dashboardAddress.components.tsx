import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MainDashboardStyled } from '../styles/mainDashboard.styles';

export const DashboardAddressComponent = ({ userAddress }: any) => {
  return (
    <MainDashboardStyled className="container">
      <div>
        <BorderColorIcon fontSize="small" color="primary" />
        <h1> Endereço</h1>
        <p>
          <strong>CEP:</strong> {userAddress.zipcode}
        </p>
        <p>
          <strong>Rua:</strong> {userAddress.street}
        </p>
        <p>
          <strong>Número:</strong> {userAddress.streetNumber}
        </p>
        <p>
          <strong>Bairro:</strong> {userAddress.borough}
        </p>
        <p>
          <strong>Cidade:</strong> {userAddress.city}
        </p>
        <p>
          <strong>Estado:</strong> {userAddress.state}
        </p>
      </div>
    </MainDashboardStyled>
  );
};
