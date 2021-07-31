import React, { Component } from 'react';
import { SocialIcon } from 'react-social-icons';
import './App.css';
import Phone from './images/phone.png';


// import {
//     NavItem,
//     // NavLink,
//     // UncontrolledDropdown,
//     // DropdownToggle,
//     // DropdownMenu,
//     // DropdownItem
// } from 'reactstrap';

export class Footer extends Component {
    // constructor(props) {
    //     super(props);

    // }

    // componentDidMount() {
    //     this.setState = {
    //         userName: ''
    //     };
    // }

    render() {
        return (
            <div className="footerContainer">
                <footer className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center fixed-bottom">
                    <div className="footerStyle">
                        <h3>Andrew Hewitson</h3>
                        <div className="grid-container">
                            <div className="grid-item"><SocialIcon url="mailto:webmaster@example.com" style={{ height: 25, width: 25 }} /> </div>
                            <div className="grid-item"> <SocialIcon url="https://github.com/switch900" style={{ height: 25, width: 25 }} /></div>
                            <div className="grid-item"> <SocialIcon url="https://www.linkedin.com/in/andrew-hewitson/" style={{ height: 25, width: 25 }} /></div>
                            <div className="grid-item"> <a href="tel:778-228-2070"><img src={Phone} alt="Phone" style={{ height: 25, width: 25 }} /></a></div>
                            <div className="grid-item"> <SocialIcon url="/about" style={{ height: 25, width: 25 }} /></div>
                            <div className="grid-item"> <SocialIcon url="/contact" style={{ height: 25, width: 25 }} /></div>
                        </div>
                    </div>
                </footer>
            </div >
        );
    }
}
export default Footer;
