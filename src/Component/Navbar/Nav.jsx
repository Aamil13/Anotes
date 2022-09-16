import React,{useState} from 'react'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {BiMessageAltAdd} from 'react-icons/bi';
import {MdDeleteForever} from 'react-icons/md';
import '../Navbar/nav.css'

const Navv = ({setShowModal , data, setData, refresher}) => {
  let expand = 'sm'

  const [searchValue,setSearchValue] = useState("");

  const DeleteAll = ()=> {
    const pass = window.confirm("Are You Sure?")

    if(!pass){
      return
    }
    localStorage.removeItem('mynotes');
    // window.location.reload();
    refresher();
  }
  
 
  

  const sorter = (value) =>{
    if(value === 'latest'){
   data.sort((a,b)=>b.id - a.id);
    }
    if(value === 'oldest'){
      data.sort((a,b)=>a.id - b.id);
       }
    if(value === 'high'){
    data.sort((a,b)=>a.priority.localeCompare(b.priority))
   //data.sort((a,b)=>a.priority.localeCompare(b.priority))
  }
    if(value === 'normal'){
    data.sort((a,b)=>b.priority.localeCompare(a.priority))
  }

  setData([...data])

  }

  const search = (e)=>{
    e.preventDefault()
    let newData;
    if(searchValue){
      newData = data.filter((x)=>x.title.toLowerCase().includes(searchValue.toLowerCase()))
      setData([...newData])
    }else{
      refresher();
    }
  }

  return (
   
    <Navbar key={expand} bg="light" expand={expand} className="mb-3">
    <Container fluid>
      <Navbar.Brand >ANotes</Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-${expand}`}
        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            ANotes
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link  className='text-success mt-1' onClick={()=>{setShowModal(true)}}><BiMessageAltAdd size={40}/></Nav.Link>
            <Nav.Link  className='text-danger' onClick={DeleteAll}><MdDeleteForever size={40}/></Nav.Link>
            <NavDropdown
              title="Priority"
              id={`offcanvasNavbarDropdown-expand-${expand}`}
            >
              <NavDropdown.Item  onClick={()=>sorter('latest')}>Latest</NavDropdown.Item>
              <NavDropdown.Item  onClick={()=>sorter('oldest')}>
                Oldest
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  onClick={()=>sorter('high')}>
                High
              </NavDropdown.Item>
              <NavDropdown.Item  onClick={()=>sorter('normal')}>
                Normal
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" onSubmit={search}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setSearchValue(e.target.value)}
            />
            <Button variant="outline-success" type="submit">{searchValue ? console.log("y") : console.log("n")}</Button>
          </Form>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
  )
}

export default Navv