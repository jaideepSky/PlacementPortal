import React from 'react'
import { Outlet } from 'react-router'
import { Navbar } from '../../components/Navbar.jsx'

function Student() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Student