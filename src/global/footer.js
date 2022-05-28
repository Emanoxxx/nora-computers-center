import React from 'react';
import {Container,Row,Col,Figure} from 'react-bootstrap';
import "../css/footer.css"
class Footer extends React.Component {
  constructor(props) {
      super(props);
      this.name=props.name;
  }
  render() {
    return (
    <section className="">
      <footer className="text-center text-white  bg-footer py-5" >
        <div className="text-center p-3" >
          © 2022 Copyright: <a className="text-white" href="https://nora-cc.emanoxxx.com/"> Nora Computers Center</a>
        </div>
      </footer>
    </section>
    
    );
  }

}

export default Footer;