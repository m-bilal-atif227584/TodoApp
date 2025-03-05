import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
//we can take icons from react icons github page
import { v4 as uuidv4 } from 'uuid'; // it is uuid npm, firstly enter 'npm install uuid' command and then import uuid on top, then we can generate new unique id by writing this 'uuidv4();'.  
//we will get unique id like this ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {
  const [todo, settodo]=useState("");
  const [todos,settodos]=useState([]);
  const [showfinished,setshowfinished]=useState(true);
  useEffect(()=>{
    let todostr=localStorage.getItem("todos")
    if(todostr){
      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  },[])
  const togglefinished=()=>{
      setshowfinished(!showfinished)
  }
  const savetoLS=()=>{
      localStorage.setItem("todos", JSON.stringify(todos))
  }
  const handleAdd=()=>{
     settodos([...todos, {id:uuidv4(), todo, isCompleted:false}])
     settodo("")
     savetoLS()
  }
  const handleDelete=(e, id)=>{
    let a = confirm("Are you sure? Do you really want to delete this todo?");
    if(a){
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos)
    savetoLS()
  }
  }
  const handleEdit=(e, id)=>{
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos)
    savetoLS()
  }
  const handleChange=(e)=>{
    settodo(e.target.value)
  }
  const handleCheck=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newtodos=[...todos];
    newtodos[index].isCompleted=!newtodos[index].isCompleted;
    settodos(newtodos)
    savetoLS()
  }
  return (
    <>
      <Navbar />
      <div className="mx-3 border-4 border-violet-900 md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2">
      <h1 className='text-center font-bold text-xl'>iTask - Manage Your Todos At One Place</h1>
        <div className='mb-6 flex flex-col gap-3'>
          <h2 className='text-lg font-bold mb-2 mt-2'>ADD A TODO</h2>
          <input type="text" className='w-full py-1 px-2 outline-none border-2 border-black rounded-[4px]' onChange={handleChange} value={todo} />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6 transition-all'>Save</button>
        </div>
        <input onChange={togglefinished} className='mr-1 mb-4' type="checkbox" checked={showfinished} />Show Finished Tasks
        <h2 className="text-lg font-bold">YOUR TODOS</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item=>{
          return(showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between md:w-1/2 m-2">
            <div className='flex gap-5'>
            <input onChange={handleCheck} type="checkbox" checked={todo.isCompleted} name={item.id} id="" />
           <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
           </div>
           <div className="btns flex h-full">
            <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-4 transition-all'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md transition-all'><MdDelete /></button>
           </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
