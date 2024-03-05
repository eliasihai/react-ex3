import Login from './pages/login';
import Register from './pages/register';

const routes = [
  { path: '/', exact: true },
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
];

export default routes;