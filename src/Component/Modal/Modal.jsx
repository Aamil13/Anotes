import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./modal.css"
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Modall({showModal, setShowModal , refresher}) {
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [background, setBackground] = useState('grey')
  const [foreground, setForeground] = useState('#fff')
  const [priority, setPrority] = useState('normal')
  
  const handleAdd = () => {
    const savedData = JSON.parse(localStorage.getItem("mynotes")) || [];
    if (!title || !content) {
      return alert("Title and Content are required");
    }

    let newData = {
      id: Date.now(),
      title,
      content,
      priority,
      background,
      foreground,
      date: new Date().toLocaleDateString(),
    };
    savedData.push(newData);
    localStorage.setItem("mynotes", JSON.stringify(savedData));
    setTitle("");
    setContent("");
    setPrority("normal");
    setShowModal(false);
    refresher();
    // window.location.reload();
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setPrority("normal");
    setShowModal(false);
  };
  const handleColor = (bg, fg) => {
    setBackground(bg);
    setForeground(fg);
  };




  return (
    <>
      <Modal show={showModal} onHide={()=>{setShowModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="form-control" placeholder="Enter your text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
          <label>priority</label>
          <select className="form-control mb-3" value={priority} onChange={(e)=>setPrority(e.target.value)} >
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)}
            className="form-control"
            style={{ height: "200px" }}
            placeholder="Enter notes"
          ></textarea>

          {/* ........................ */}
          <DropdownButton id="dropdown-basic-button" menuVariant="dark" title="Color Pallete">
            <Dropdown.Item href="#/action-1">
                <div className="d-flex" onClick={()=>{handleColor("gray","white")}}>
                    <div className="circle" style={{backgroundColor:"gray"}}></div>
                    <div className="circle mx-3" style={{backgroundColor:"white"}}></div>
                </div></Dropdown.Item>
            <Dropdown.Item href="#/action-2">
            <div className="d-flex" onClick={()=>{handleColor("black","white")}} >
                    <div className="circle" style={{backgroundColor:"black"}}></div>
                    <div className="circle mx-3" style={{backgroundColor:"white"}}></div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3"onClick={()=>{handleColor("pink","white")}} >
            <div className="d-flex">
                    <div className="circle" style={{backgroundColor:"pink"}}></div>
                    <div className="circle mx-3" style={{backgroundColor:"white"}}></div>
                </div>
            </Dropdown.Item>
          </DropdownButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel} >
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modall;
