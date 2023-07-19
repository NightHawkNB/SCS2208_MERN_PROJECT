import { useAuthContext } from "../hooks/useAuthContext"
import {useState} from 'react'
import PopupForm from "./PopupForm"
const BookDetails=({book})=>{
    const {user}=useAuthContext()
    const [error,setError]=useState(null)
    const [isFormOpen,setIsFormOpen]=useState(false)

    const handleDelete=async ()=>{
        var result=window.confirm(`Are you sure, you want to delete the book named "${book.title}"?`)
        if(result){
            console.log("confrirm")
            const response=await fetch('/api/bookcrud/'+book._id,{
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json=await response.json()
            if(response.ok){
                console.log(json)
                window.location.reload()
            }else{
                setError(json.error)
            }
        }
    }

    const handleUpdate=(e)=>{
        setIsFormOpen(!isFormOpen)
    }
    return (
        <div className="book-details">
            <h4>{book.title}</h4>
            <p><strong>Author: </strong>{book.author}</p>
            <p><strong>Total number of copies: </strong>{book.totalCopies}</p>
            <p><strong>Number of available Copies: </strong>{book.nAvailable}</p>
            {user && user.userType!=='normal' && <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>}
            {user && user.userType!=='normal' && <span className="material-symbols-outlined" onClick={handleUpdate}>change_circle</span>}
            {isFormOpen && <PopupForm book={book}/>}
            {error && <div className="error">{error}</div>} 
        </div>
    )
}

export default BookDetails