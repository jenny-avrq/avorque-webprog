import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import '../src/assets/styles/index.css';

// HomePage Structure
import Layout from './components/Layout';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import MusicPage from './pages/MusicPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'music',
        element: <MusicPage />,
      },
      {
        path: 'article',
        element: <ArticlePage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;