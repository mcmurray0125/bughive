import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import router from './routes';

function App() {
  const authRoute = router.routes.find(route => route.routeName === 'auth');

  console.log(authRoute.children)
  
  function findName(item) {
    console.log(item.icon)
  }

  authRoute.children.forEach(findName);
  


  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
