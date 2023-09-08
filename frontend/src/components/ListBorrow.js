import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useEffect } from "react";
import BorrowDetails from "./BorrowDetails";
const ListBorrow = () => {
    const {user}=useAuthContext()
    const [borrows,setBorrows]=useState([])
    const [error,setError]=useState(null)
    const [keyWord,setKeyWord]=useState('');

    const handleSearch=(e)=>{
        setKeyWord(e.target.value)
    }
    

    useEffect(()=>{
        setError(null)
        setBorrows([])
        
        const fetchBorrows=async ()=>{
            const response = await fetch('/api/borrow/',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })

            const json=await response.json()

            if(response.ok){
                console.log(json)
                setBorrows(json)
            }else{
                console.log(json.error)
                setError(json.error)
            }
        }
        if(user){
            fetchBorrows()
            

        }else{
            setError('You must be logged in!')
        }
    
    },[user])


    return ( 
        <div className="allborrow">
            <div className="borrow">
            <input type="text" placeholder="Search by email" onChange={handleSearch}/>
                {borrows && borrows.filter(obj=>obj.email.toLowerCase().includes(keyWord.toLowerCase())).map((borrow)=>(
                    <BorrowDetails key={borrow._id} borrow={borrow}/>
                ))}
            </div>
            {error && <div className="error">{error}</div>} 
        </div>
     );
}
 
export default ListBorrow;