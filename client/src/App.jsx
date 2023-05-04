import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import UpdatePage from './routes/UpdatePage'
import Home from './routes/Home'
import RestaurantDetailPage from './routes/RestaurantDetailPage'
import { RestaurantsContextProvider } from './context/RestaurantsContext'

function App() {

  return (
    <RestaurantsContextProvider>
      <Container>
        <Router>
          <Routes>
            <Route exact path='/' Component={Home}/>
            <Route exact path='/restaurants/:id/update' Component={UpdatePage}/>
            <Route exact path='/restaurants/:id' Component={RestaurantDetailPage}/>
          </Routes>
        </Router>
      </Container>
    </RestaurantsContextProvider>
  )
}

export default App
