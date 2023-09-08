import {Link} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { useThemeContext } from '../hooks/useThemeContext'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton } from '@mui/material';
import { useTheme } from '@emotion/react';

const NavBar=()=>{
    const {logout}=useLogout()
    const {user}=useAuthContext()
    const handleClick=()=>{
        logout()
    }
    const colorMode=useThemeContext()
    const theme=useTheme()
    return (
        <header background-color={theme.palette.primary}>
            <nav>
                <div className="navButtons">
                    <Link to="/"><span>Home</span></Link>
                    <Link to="/available"><span>Available Books</span></Link>
                    <Link to="/reserve"><span>Reservations</span></Link>
                    <Link to="/borrowdetails"><span>Borrowing Details</span></Link>
                    {user && user.userType!=='normal' && <Link to="/allbooks"><span>All Books</span></Link>}
                    {user && user.userType!=='normal' && <Link to="/donate"><span>Donations</span></Link>}
                    {user && user.userType!=='normal' && <Link to="/fines"><span>Fines</span></Link>}

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
                <IconButton onClick={()=>colorMode.toggleColorMode()}>
                    {(theme.palette.mode==='dark')?(
                    <DarkModeIcon />
                ): (<LightModeOutlinedIcon />)
                }
                </IconButton>
            </nav>
        </header>
    )
}

export default NavBar