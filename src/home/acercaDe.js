import React from 'react';
import {Container,Row,Col,Figure} from 'react-bootstrap';
import "../css/root.css"
import "../css/acercade.css"
class Acercade extends React.Component {
  constructor(props) {
      super(props);
      this.name=props.name;
  }
  render() {
    return (
    <section>
        <Container fluid className='text-center my-5'>
        <h1 className='my-3 fw-bolder' id="acerca de">Acerca de nosotros</h1>
            <Row className="my-3 " >
                <Col sm>
                <hgroup className='px-5'>
                  <h2 className='my-3'>¿Quienes somos?</h2>
                  <p className='text-start'>
                    Somos el centro de computo de la <b>Facultad de Estadística e Informatica</b>, nos dedicamos a brindar
                    un servicio de prestamo de equipos de computo a los alumnos de la facultad, para de esta manera tengan las herramientas necesarias para
                    desarrollar sus habilidades sin encontrarse con obstáculos en su camino.
                  </p>
                  </hgroup>
                </Col>
                <Col sm>
                <Figure>
                    <Figure.Image className='img-acercaDe'
                      width={350}
                      alt="Quienes somos"
                      src="./resources/img/logo-512.png"
                    />
                  </Figure>
                  </Col>  
            </Row>
            <Row className="my-3" >
            
                <Col sm>
                
                  <Figure>
                    <Figure.Image className='img-acercaDe'
                      width={350}
                      alt="¿Porque lo hacemos?"
                      src="./resources/img/nora-pc.png"
                    />
                  </Figure>
                </Col>
                <Col sm>
                <h2 className='my-3'>¿Porque lo hacemos?</h2>
                    <hgroup className='px-5'>
                      <p className='text-end'>La reciente pandemia evidenció que no toda la población estudiantil posee los mismos recursos 
                      como para llevar a cabo la educación en línea, es por esto que, en la facultad de Estadística e 
                      Informática, el Centro de Cómputo proporcionará el servicio de préstamo de equipo de cómputo a 
                      los alumnos que no tengan acceso a estos, para llevar a cabo el proyecto se diseñó un sistema de 
                      información web de préstamos.</p>
                    </hgroup>
                </Col>  
                
              </Row>
        </Container>
    </section>
    
    );
  }

}

export default Acercade;