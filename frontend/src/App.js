import React from 'react'
import "./App.css";
import {RouterProvider} from "react-router-dom"
import { router } from './routers/index';
const App = () => {
  return ( <RouterProvider router={router}/>
  )
}

export default App
