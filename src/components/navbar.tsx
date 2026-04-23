import { Link } from '@tanstack/react-router'
import React from 'react'
import { LogIn } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='navbar'>

        <div className='brand'>
            <div className='mark'>
                <div className='glyph'></div>
            </div>
            <Link to='/'>Skild</Link>
        </div>
        <div className='actions'>
            <Link to='/sign-in/$' className='btn-primary'>Sign In
            <LogIn/></Link>
        </div>
    </nav>
  )
}

export default Navbar