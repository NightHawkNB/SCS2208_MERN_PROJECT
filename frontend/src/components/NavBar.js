import {Link} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const NavBar=()=>{
    const {logout}=useLogout()
    const {user}=useAuthContext()
    const handleClick=()=>{
        logout()
    }
    return (
        <header>
            <nav>
                {user ? (
                    <div className='userDetials'>
                        <span>Hi {user.fName+" "+user.lName}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                ):(
                    <div className='links'>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Sign Up</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default NavBar