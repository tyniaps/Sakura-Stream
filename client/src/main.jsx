import './css/index.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import SearchAnime from './pages/SearchAnime';
import SavedAnimes from './pages/SavedAnime';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='text-4xl text-center'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchAnime />
      }, {
        path: '/saved',
        element: <SavedAnimes />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
