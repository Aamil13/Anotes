import React, {useState} from 'react'
import "./notes.css"
import { Rating } from "react-simple-star-rating"
import { Button } from 'react-bootstrap';
import {TiEdit} from "react-icons/ti"
import {TbTrashX} from "react-icons/tb"

const Notes = ({value,refresher}) => {

    let savedData = JSON.parse(localStorage.getItem('mynotes')) || []

    // const [rating, setRating] = useState(0);
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(value.content);
    const [rating, setRating] = useState(value.priority === 'high' ? 100 : 0)



    const handleRating = () => {
        if(rating === 0){
            setRating(100)
        let idx = savedData.findIndex((x)=>x.id === value.id)
          savedData[idx].priority = 'high'
          localStorage.setItem('mynotes', JSON.stringify(savedData))
        }else{
            setRating(0)
        let idx = savedData.findIndex((x)=>x.id === value.id)
          savedData[idx].priority = 'normal'
          localStorage.setItem('mynotes', JSON.stringify(savedData))
        }
        // window.location.reload()
        refresher()

      }



    const handleDelete = () =>{
        const pass = window.confirm('Are you sure you want to delete this note ?.')
        if(!pass){
            return
        }
        if(savedData.length){
          let newData = savedData.filter((data)=> data.id !== value.id)
          console.log(newData)
          localStorage.setItem('mynotes', JSON.stringify(newData))
          window.location.reload()
        // refresher()
        }
    }

    const handleEdit = () =>{
        let idx = savedData.findIndex((x)=>x.id === value.id)
        savedData[idx].content = content
        localStorage.setItem('mynotes', JSON.stringify(savedData))
        setEdit(false)
        refresher()
        // window.location.reload()
  }


  return (
    <div className='px-2 col-lg-3 col-md-4 col-sm-6 h-100 mb-5'>
        <div className='card  shadow px-2' style={{backgroundColor:`${value.background}`}} >
            <div className='title-div text-center w-100'>
                <div className='prorityf text-center shadow'>
                    <p className='prority mt-1'>priority</p>
                    <Rating onClick={handleRating} ratingValue={rating} iconsCount={1} transition={true} className="star" />
                    {rating ===100 ?
                        <p className='fw-bold text-warning'>High</p>
                        :
                        <p className='text-light mb-2 fw-light'>Normal</p>
                    }
                </div>
                <h1 className='fw-light'>{value.title}</h1>
            </div>
                    <div className='content'>
                        <textarea className='form-control' value={content} onChange={(e)=> setContent(e.target.value)} style={{backgroundColor:`${value.foreground}`}}>

                        </textarea>
                    </div>
                    <section className='d-flex justify-content-between my-2'>
                        { !edit ? <Button className='btn-sm btn-outline-warning' onClick={()=>{setEdit(true)}}>
                            <TiEdit/>
                        </Button>
                        :
                        <Button className='btn-sm ' onClick={handleEdit}><TiEdit/></Button>
                        }
                        <Button className='btn-danger btn-sm'onClick={handleDelete}><TbTrashX/></Button>
                    </section>
        </div>
    </div>
  )
}

export default Notes