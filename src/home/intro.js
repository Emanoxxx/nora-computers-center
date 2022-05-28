import React from 'react';
import {Container,Row,Col,Badge} from 'react-bootstrap';
import "../css/root.css"
import "../css/intro.css"
class intro extends React.Component {
  constructor(props) {
      super(props);
      this.name=props.name;
  }
  render() {
    return (
    <section>
        <Container fluid className='text-center justify-content-center d-flex align-items-center bg flex-column'style={{ height: '450px'}} >
         <Row>
             <Col lg="last"><h2><small>-Nora Computers Center-</small></h2></Col> 
         </Row>
         <Row>
             <Col lg="last"><h1><small>Nora CC</small></h1></Col> 
         </Row>
        </Container>
    </section>
    
    );
  }

}

export default intro;