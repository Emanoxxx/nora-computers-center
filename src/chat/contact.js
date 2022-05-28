import React  from 'react';
import { useState } from 'react';
import {Tooltip,OverlayTrigger,Col,ToastContainer,Button} from 'react-bootstrap';
import "../css/contact.css"

  function Contact(props){
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        {props.name}
      </Tooltip>
    );
    
    return(
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltip(props)}
      >
        <Button className='btn-chat contact my-1'><img src='./logo-512.png' alt='Chat boton'></img></Button>
      </OverlayTrigger>
    );
    }
  

export default Contact;
