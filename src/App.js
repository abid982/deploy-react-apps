import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

// Add lazy loading to component function
const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        // path: '/',
        // index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          // { index: true, element: <BlogPage />, loader: postsLoader },
          // { index: true, element: <BlogPage/>, loader: () => import('./page/Blog').then(module => module.loader())},
          { index: true, element: <Suspense fallback={<p>Loading...</p>}><BlogPage/></Suspense>, loader: () => import('./pages/Blog').then(module => module.loader())},
          // { path: ':id', element: <PostPage />, loader: postLoader },
          // { path: ':id', element: <PostPage />, loader: () => import('./pages/Post').then(module => module.loader())},
          // { path: ':id', element: <Suspense fallback={<p>Loading...</p>}><PostPage /></Suspense>, loader: () => import('./pages/Post').then(module => module.loader()) },
          // Cannot destructure property 'params' of '_ref' as it is undefined.
          // Of course, we get params by React router in this loader function, and here we should simply forward that under a params key to this loader.
          { path: ':id', element: <Suspense fallback={<p>Loading...</p>}><PostPage /></Suspense>, loader: ({params}) => import('./pages/Post').then(module => module.loader({params})) },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
