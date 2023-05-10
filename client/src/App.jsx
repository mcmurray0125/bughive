import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {


  return (
    <AuthProvider>
      <Router>
        
      </Router>
    </AuthProvider>
  )
}

export default App
