import React, { useContext, useEffect } from 'react'

import GlobalStyle from './styles/GlobalStyle'

import { Context } from './context'

import Header from './components/Header'
import Main from './components/Main'

function App() {
  const { dispatch } = useContext(Context)
  useEffect(() => {
    const key = localStorage.getItem('mudkey')
    const room = localStorage.getItem('mudroom')
    if (key && room) {
      dispatch({ type: 'SET_KEY', payload: key })
      dispatch({ type: 'CHANGE_ROOM', payload: JSON.parse(room) })
    }
    document.forms[0].children[1].children[0].focus()
  }, [dispatch])
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main />
    </>
  )
}

export default App
