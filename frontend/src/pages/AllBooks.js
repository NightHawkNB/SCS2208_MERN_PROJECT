import { useAuthContext } from "../hooks/useAuthContext";
import BookDetails from "../components/BookDetails";
import { useState } from "react";
import { useEffect } from "react";
const AllBooks = () => {
    const {user}=useAuthContext()
    const [books,setBooks]=useState([])
    const [error,setError]=useState(null)
        useEffect(()=>{
            setError(null)
            setBooks([])
            const fetchBooks=async ()=>{
                const response = await fetch('/api/bookcrud',{
                    headers:{
                        'Authorization':`Bearer ${user.token}`
                    }
                })

                const json=await response.json()

                if(response.ok){
                    console.log(json)
                    setBooks(json)
                }else{
                    console.log(json.error)
                    setError(json.error)
                }
            }
            if(user){
                fetchBooks()
            }else{
                setError('You must be logged in!')
            }
        
        },[user])//user is a dependency
    return ( 
        <div className="allbooks">
            <div className="book">
                {books && books.map((book)=>(
                    <BookDetails key={book._id} book={book}/>
                ))}
            </div>
            {error && <div className="error">{error}</div>} 
        </div>
     );
}
 
export default AllBooks;