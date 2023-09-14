import {Link} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { useThemeContext } from '../hooks/useThemeContext'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton } from '@mui/material';
import { useTheme } from '@emotion/react';
import whiteLogo from './full-logo-white.png'
import blackLogo from './full-logo-black.png'

const NavBar=()=>{
    const {logout}=useLogout()
    const {user}=useAuthContext()
    const handleClick=()=>{
        logout()
        window.location.href = "/"
    }
    const colorMode=useThemeContext()
    const theme=useTheme()
    return (
        <header background-color={theme.palette.primary}>
            <nav>
                <img src={theme.palette.mode==='dark'?whiteLogo:blackLogo} height={50} alt="Logo" />   
                <div className="navButtons">
                    <Link to="/"><span>Home</span></Link>
                    {/* <Link to="/available"><span>Available Books</span></Link> */}
                    {user && <Link to="/reserve"><span>Reservations</span></Link>}
                    {user && <Link to="/borrowdetails"><span>Borrowing Details</span></Link>}
                    {user && user.userType!=='normal' && <Link to="/allbooks"><span>All Books</span></Link>}
                    {user && user.userType!=='normal' && <Link to="/donate"><span>Donations</span></Link>}
                    {user && user.userType!=='normal' && <Link to="/fines"><span>Fines</span></Link>}
                    {user && user.userType!=='normal' && <Link to="/manageusers"><span>Manage Users</span></Link>}

                </div>

                {user ? (
                    <div className='userDetials user-status'>
                        <div> <span className="material-symbols-outlined">account_circle</span><p>Hi {user.fName+" "+user.lName}</p></div>
                        <button className='logsign' onClick={handleClick}>Log out</button>
                    </div>
                ):(
                    <div className='links user-status'>
                        <Link to='/login'><button className='logsign'>Login</button></Link>
                        <Link to='/signup'><button className='logsign'>Sign Up</button></Link>
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