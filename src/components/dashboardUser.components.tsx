import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MainDashboardStyled } from '../styles/mainDashboard.styles';

export const DashboardUserComponent = ({ user }: any) => {
  return (
    <MainDashboardStyled className="container">
      <div>
        <BorderColorIcon fontSize="small" color="primary" />
        <h1> Dados do usuário</h1>
        <p>
          <strong>Nome:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Cadastro:</strong>{' '}
          {user.registered_at
            .split('T')[0]
            .split('-')
            .reverse()
            .join('/')}
        </p>
      </div>
    </MainDashboardStyled>
  );
};
