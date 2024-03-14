import './css/index.css';
<<<<<<< HEAD
=======
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import SearchAnime from './pages/SearchAnime';
import SavedAnime from './pages/SavedAnime';

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
        element: <SavedAnime />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
>>>>>>> ee53179d24f8db9f63f56e75415008c72ca8ea52
