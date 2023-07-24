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
                <div className="navButtons">
                    <Link to="/"><span>Home</span></Link>
                    <Link to="/available"><span>Available Books</span></Link>
                    <Link to="/reserve"><span>Reservations</span></Link>
                    {user && user.userType!=='normal' && <Link to="/allbooks"><span>All Books</span></Link>}
                </div>

                {user ? (
                    <div className='userDetials user-status'>
                        <div> <span className="material-symbols-outlined">account_circle</span><p>Hi {user.fName+" "+user.lName}</p></div>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                ):(
                    <div className='links user-status'>
                        <button><Link to='/login'>Login</Link></button>
                        <button><Link to='/signup'>Sign Up</Link></button>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default NavBar