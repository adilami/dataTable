import React, { useState } from 'react'
import "./App.css"
import content from "./desc.json"
import Paginations from "./pagination"
import { CSVLink } from 'react-csv';
import { ReactToPrint } from "react-to-print"
import DataTable from 'react-data-table-component';
const Data = () => {
  const [data, setData] = useState(content);
  const [order, setOrder]= useState("ASC");
  const sort = (i) => {
    if(order === "ASC"){
      const sorted = [...content].sort((a,b)=>
      a[i] > b[i] ? 1: -1)
    setData(sorted);
    setOrder("DESC")
    }
    if(order === "DESC"){
      const sorted = [...content].sort((a,b)=>
      a[i] > b[i] ? -1: 1)
    setData(sorted);
    setOrder("ASC");
    }

  }
 
  const[currentPage, setCurrentPage] = useState(1);
  const[post, setPost] = useState(2);
  const indexOfLastPost = currentPage * post;
  const indexOfFirstPost = indexOfLastPost-post;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost)
  const totalPosts = data;
  const a = () => {
    return (Math.round((totalPosts.length)/post));
  }
  const b = () => {
    if(a%2!==0){
      return Math.round((totalPosts.length)/post)
    }
    if(a===1){
      return a+1
    }
    if(a%100===0){
      return a;
    }
    if(a===0){
      return 1;
    }
  }
  const togglePag = () => {
    let option = document.getElementById("select").value;
    if(option==="2"){
      setPost(2);
    }
    if(option==="5"){
      setPost(5);
    }
    if(option==="20"){
      setPost(20);
    }
    if(option==="50"){
      setPost(50);
    }
    if(option==="All"){
      setPost(data.length);
    }
  }
  const header = [
    {
      label:"Name",
      key:"name"
    },
    {
      label:"Address",
      key:"add"
    },
    {
      label:"Phone Number",
      key:"phone"
    },
    {
      label:"Gender",
      key:"gen"
    },
    {
      label:"Nationality",
      key:"nat"
    },
    {
      label:"House No",
      key:"house"
    },
    {
      label:"Tole",
      key:"tole"
    }
  ];

  // let tableHead = header.map((item)=>{
  //   return (
  //     <table>
  //       <thead>
  //         <tr>
  //           <th onClick={()=>sort("name")}>{item.label}</th>
  //         </tr>
  //      </thead>
  //   </table>)
  // })
  let tableContent = currentPost.map((items)=>{
    return(
     <>
          <tbody>
          <tr>
            <td>{items.name}</td>
            <td>{items.add}</td>
            <td>{items.phone}</td>
            <td>{items.gen}</td>
            <td>{items.nat}</td>
            <td>{items.house}</td>
            <td>{items.tole}</td>
          </tr>
          </tbody>
      </>
    )
  })
  const paginate = (pageN) => setCurrentPage(pageN);
  const pagFirst = () => setCurrentPage(1);
  const pagLast = () => {
    console.log(Math.round(0.3));
    setCurrentPage(b)
  }
 const exports = () => {
    
 }





  // const [val, setVal] = useState('');
  // const [dataS, setDataS] = useState(data);
  // const [filter, setFilter] = useState([])
  // const search = (e) =>{
  //   if(e.target.value=""){
  //     setVal(e.target.value);
  //     const filterTable = data.filter(x=>Object.keys(x).some(y=>
  //       String(x[y]).toLowerCase().includes(e.target.value.toLowerCase())))
  //       setFilter([...filter])
  //   }
  //   else{
  //     setVal(e.target.value)
  //     setDataS([...dataS]);

  //   }
  // }
  // return <DataTable columns={tableHead} data={tableContent} pagination fixedHeaderScrollHeight='400px'/>


  return(
      <>
    <main>
    <table>
      <thead>
          <tr>
            {/* <th>{tableHead}</th> */}
            <th onClick={()=>sort("name")}>Name  ↑↓</th>
            <th onClick={()=>sort("add")}>Address   ↑↓</th>
            <th onClick={()=>sort("phone")}>Phone   ↑↓</th>
            <th onClick={()=>sort("gen")}>Gender   ↑↓</th>
            <th onClick={()=>sort("nat")}>Nationality   ↑↓</th>
            <th onClick={()=>sort("house")}>House No   ↑↓</th>
            <th onClick={()=>sort("tole")}>Tole   ↑↓</th>
          </tr>
      </thead>
      <tbody>
          <tr>
            <td>{tableContent}</td> 
          </tr>
        </tbody>
      </table>
    </main>
    <select id="select" onChange={togglePag}>
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="All">All</option>
    </select><p>Showing {currentPost.length} out of {data.length}</p>

     
    
    <br/>
    <Paginations post={post} totalPosts={data.length} paginate={paginate} pagFirst={pagFirst} pagLast={pagLast}/>
    {/* <Pagination post={post} totalPosts={data.length} paginate={paginate} pagFirst={pagFirst} pagLast={pagLast}>
      <Pagination.First onClick={pagFirst}/>
      <Pagination.Item>{paginate}</Pagination.Item>
      <Pagination.Last onClick={pagLast}/>
    </Pagination> */}
    <div>

      <CSVLink  headers={header} data={data} filename="Data.csv">
        <button >Export</button>
      </CSVLink>
    </div>
   </>
 )
}
export default Data