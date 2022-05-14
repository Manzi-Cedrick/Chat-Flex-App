import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ChatProvider from './context/ChatProvider'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import {BrowserRouter} from 'react-router-dom'
const theme = extendTheme({
  bg:{
    brand: {
      100:"#10163B"
    }
  }
})
ReactDOM.render(
    <BrowserRouter>
    <ChatProvider>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </ChatProvider>
    </BrowserRouter>,
  document.getElementById('root')
)
