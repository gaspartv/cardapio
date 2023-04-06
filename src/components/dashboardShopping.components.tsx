import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MainDashboardStyled } from '../styles/mainDashboard.styles';

export const DashboardShoppingComponent = () => {
  return (
    <MainDashboardStyled className="container">
      <div>
        <BorderColorIcon fontSize="small" />
        <h1>Minhas compras</h1>
        <p>CEP: {}</p>
        <p>Rua: {}</p>
        <p>Número: {}</p>
        <p>Bairro: {}</p>
        <p>Cidade: {}</p>
        <p>Estado: {}</p>
      </div>
    </MainDashboardStyled>
  );
};
