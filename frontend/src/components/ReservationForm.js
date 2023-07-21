import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"


const ReservationForm = () => {

    const {user} = useAuthContext()

    const [book_id, setBook_id] = useState('')
    const [error,setError] = useState(null)
    const [emptyValues, setEmptyValues] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in!')
            return
        }
        
        const reservation = {book_id}
        const response = await fetch('/api/reserve/'+book_id,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body: JSON.stringify(reservation)
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            if(json.emptyValues) setEmptyValues(json.emptyValues)
        } else {
            setBook_id('')
            setError(null)
            setEmptyValues([])
            console.log('New Reservation added',json)
            window.location.reload()
        }
    }


    return(
        <form className="create-book" onSubmit={handleSubmit}>
            <h3>Add a New Reservation</h3>

            <label>Book_Id :</label>
            <input 
                type="text" 
                value={book_id}
                onChange={(e) => setBook_id(e.target.value)}
                className = {emptyValues.includes('book_id') ? 'error':''}
            />
            <button>Add Reservation</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ReservationForm