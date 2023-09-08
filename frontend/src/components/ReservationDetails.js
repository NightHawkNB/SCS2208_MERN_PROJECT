import { useAuthContext } from "../hooks/useAuthContext"
import {useEffect, useState} from 'react'

const ReservationsDetails=({reservation})=>{

    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')

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

    
    useEffect(()=>{
        setError(null)
        const fetchUserDetails=async ()=>{
            const response = await fetch('/api/getuser/'+reservation.user_id,{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })

            const json=await response.json()

            if(response.ok){
                console.log(json)
                setEmail(json.email)
                setName(json.fName+' '+json.lName)
            }else{
                console.log(json.error)
                setError(json.error)
            }
        }
        if(user.userType!=='normal'){
            fetchUserDetails()
        }else{
            setError('You are not authorized!')
        }
    
    },[user,reservation])
        

    return (
        <div className="reservation-details">
            <div>
                <h4>{reservation.title}</h4>
                {user.userType!=='normal' && <h5>Details of Reservation Holder:</h5>}
                {user.userType!=='normal' && <h6>User ID: {reservation.user_id}</h6>}
                {user.userType!=='normal' && <h6>Email: {email}</h6>}
                {user.userType!=='normal' && <h6>Customer Name: {name}</h6>}
            </div>
            <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>
            {error && <div className="error">{error}</div>} 
        </div>
    )
}

export default ReservationsDetails