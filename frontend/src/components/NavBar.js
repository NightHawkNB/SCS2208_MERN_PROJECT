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