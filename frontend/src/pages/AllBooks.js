import ListBooks from "../components/ListBooks";

const AllBooks = () => {
    return ( 
        <div>
        <h1>AllBooks</h1>
        <ListBooks url={'/api/bookcrud'} />
        
        </div>
     );
}
 
export default AllBooks;