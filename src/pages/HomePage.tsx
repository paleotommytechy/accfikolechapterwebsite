import React from 'react'
import '../assets/styles/NavBar.css'
import {Link} from 'react-router-dom'


const HomePage: React.FC = () => {
  return (
    <>
    <div >HomePage<Link className="btn btn-primary rounded-4 d-flex align-item-center justify-content-center mx-4 w-50" to='/login'>Click to Login</Link></div>
    </>
  )
}


export default HomePage;