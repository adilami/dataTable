import React from 'react'
import "./App.css";
import Pagination from "react-bootstrap/Pagination"

const Paginations = ({ post, totalPosts, paginate, pagFirst, pagLast }) => {
  const pageN = [];
  for(let i=1; i<=Math.ceil(totalPosts/post); i++){
    pageN.push(i);
  }

  return(
    <>
      
        <ul className='pagination'>
          <br></br>
          <li>
            <a onClick={()=>pagFirst()} href="!#"><Pagination.First></Pagination.First></a>
          </li>

          {pageN.map(number =>(
           
            <li key = {number}>
              <a onClick={() => paginate(number)} href='!#'>
                <Pagination.Item>{number}</Pagination.Item>
                
              </a>
            </li>
          ))
        }

          <li>
            <a onClick={()=>pagLast()} href="!#"><Pagination.Last></Pagination.Last></a>
          </li>
        </ul>
    </>
  )
}

export default Paginations