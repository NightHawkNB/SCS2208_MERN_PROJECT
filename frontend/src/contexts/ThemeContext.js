import {createContext,useReducer,useEffect} from 'react'

export const ThemeContext=createContext()

export const ThemeContextProvider=({children})=>{
    const [state,dispatch]=useReducer('themeReducer',{
        
    })

}