import React, { useState , useEffect} from 'react'
import Nav from "../Component/Navbar/Nav"
import Modall from '../Component/Modal/Modal.jsx'
import Notes from '../Component/Notes/Notes'

const Home = () => {
  const [data,setData]=useState([])
  const [showModal, setShowModal] =useState(false)

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('mynotes' )) || [])
  
    
  }, [])

  const refresher = ()=>{
    setData(JSON.parse(localStorage.getItem('mynotes')) || [])
}
  


  return (
    <>
      <Nav setShowModal={setShowModal} data={data} setData={setData} refresher={refresher} />
      {showModal && 
      <Modall showModal={showModal} data={data} setShowModal={setShowModal} refresher={refresher} />
      }

      <div className='row justify-content-between mx-0 p-5'>
          { !data.length ? 
            <h1 className=' fw-bold display-1 text-center my-5' >
              No Notes To Show
            </h1>
            :
            data.map((value, i)=>{
              return  <Notes key={value.id} value={value} refresher={refresher} />
            })
          }
          {/* <Notes/> */}
      </div>
    </>
  )
}

export default Home