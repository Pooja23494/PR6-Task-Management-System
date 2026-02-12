import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Header from './Components/Header'
import AppsTasks from './Pages/AppsTasks'
import WidgetsTables from './Pages/WidgetsTables'
import Auth404 from './Pages/Auth404'

const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/appsTasks' element={<AppsTasks />} />
        <Route path='/widgetsTables' element={<WidgetsTables />} />
        <Route path='*' element={<Auth404 />} />
      </Routes>
    </>
  )
}

export default App
