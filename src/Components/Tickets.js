import React from 'react'
import Navbar from './Navbar'
import Select from './Select'
import './Tickets.css'
export default function Tickets() {
  return (
    <div>
        <Navbar/>
        <div className='d-flex justify-content-center align-items-center'>
        <div className='ticketDiv'>
          <form>
        <h1>In development</h1>
            <Select/>
            <input placeholder='Number of passengers'/>
          </form>
        </div>
        </div>
    </div>
  )
}
