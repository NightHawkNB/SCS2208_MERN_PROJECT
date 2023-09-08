import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"





const BorrowDetails = ({borrow}) => {
    const {user} = useAuthContext()
    const [error,setError]=useState(null)

   
    const handleDelete=async ()=>{
        var result=window.confirm(`Are you sure, you want to delete this borrow "${borrow.title} borrowed by ${borrow.name}"?`)
        if(result){
            console.log("confirm")
            const response=await fetch('/api/borrow/'+borrow._id,{
                method: 'DELETE',
                headers:{
                    'Authorization' : `Bearer ${user.token}`
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
    const handleRetun=async ()=>{
        var result=window.confirm(`Are you sure, you want to return this borrow "${borrow.title} borrowed by ${borrow.name}"?`)
        if(result){
            console.log("confirm")
            
            const response=await fetch('api/borrow/',{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${user.token}`
                },
                body:JSON.stringify({borrow_id:borrow._id})
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
    return ( 
        <div className="reservation-details">
            <div>
                {user && user.userType!=='normal'&& <h4>Borrower Name: {borrow.name}</h4>}
                {user && user.userType!=='normal'&& <h4>Borrower email: {borrow.email}</h4>}
                {<h4>Borrowed Book Title: {borrow.title}</h4>}
                {<h4>Borrowed Date: {borrow.createdAt}</h4> }
                {user && user.userType!=='normal'&& <h4>Is returned: {borrow.isReturned?'Yes':'No'}</h4>} 
                {error && <div className="error">{error}</div>}
            </div>
            <div className="book-detail-button">
                {user && user.userType!=='normal' && <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>}
                {user && user.userType!=='normal' && <span className="material-symbols-outlined" onClick={handleRetun}>keyboard_return </span>}
             </div>
        </div>
         
     );
}
 
export default BorrowDetails;