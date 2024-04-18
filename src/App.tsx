import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Emogen from './Emogen';

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Emogen />} />
        </Routes>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
