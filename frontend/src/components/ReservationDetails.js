import { useAuthContext } from "../hooks/useAuthContext"
import {useState} from 'react'

const ReservationsDetails=({reservation})=>{

    const {user} = useAuthContext()
    const [error, setError] = useState(null)

    const handleDelete = async () => {
        var result = window.confirm(`Are you sure, you want to delete the reservation of the book "${reservation.title}"?`)
        if(result){
            console.log("confirmed")
            const response = await fetch('/api/reserve/'+reservation.book_id,{
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

    return (
        <div className="reservation-details">
            <h4>{reservation.title}</h4>
            <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>
            {error && <div className="error">{error}</div>} 
        </div>
    )
}

export default ReservationsDetails