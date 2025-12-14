import { Container } from '@mui/material';
import Navbar from './Navbar';

const Layout = ({ children, user, setUser }) => {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;