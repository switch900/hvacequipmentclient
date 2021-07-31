import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { history } from './_helpers/history';
import { authenticationService } from './_services/authentication.service';
import { PrivateRoute } from './components/PrivateRoute';
//import { HomePage } from '@/HomePage';
//import { LoginPage } from './LoginPage';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import React from 'react';
import NavBar from './NavBar';
import NotFoundPage from './pages/NotFoundPage';
import DisplayAllLocation from './pages/Locations/DisplayAllLocations/DisplayAllLocations';
import AddLocation from './pages/Locations/AddLocation/AddLocation';
import DisplayAllEmployees from './pages/Employees/DisplayAllEmployees/DisplayAllEmployees';
import AddEmployee from './pages/Employees/AddEmployee/AddEmployee';
import DisplayAllCustomers from './pages/Customers/DisplayAllCustomers/DisplayAllCustomers';
import AddCustomer from './pages/Customers/AddCustomer/AddCustomer';
import EquipmentListPage from './pages/Equipment/DisplayAllEquipment/EquipmentListPage';
import AddEquipment from './pages/Equipment/AddEquipment/AddEquipment';
import EquipmentDetail from './pages/Equipment/EquipmentDetail/EquipmentDetail';
import CustomerDetail from './pages/Customers/CustomerDetail/CustomerDetail';
import LocationDetail from './pages/Locations/LocationDetail/LocationDetail';
import EmployeeDetail from './pages/Employees/EmployeeDetail/EmployeeDetail';
import LoginPage from './pages/LoginPage/LoginPage';
import EditEquipment from './pages/Equipment/EditEquipment/EditEquipment';
import EditCustomer from './pages/Customers/EditCustomer/EditCustomer';
import EditLocation from './pages/Locations/EditLocation/EditLocation';
import EditEmployee from './pages/Employees/EditEmployee/EditEmployee';
import Footer from './Footer';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      currentUser: []
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));

  }

  logout = () => {
    authenticationService.logout();
    history.push('/login');
  }
  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <div>
          {currentUser &&
            <NavBar {...currentUser} logout={this.logout} />
            // <nav className="navbar navbar-expand navbar-dark bg-dark">
            //   <div className="navbar-nav">
            //     <Link to="/" className="nav-item nav-link">Home</Link>
            //     <a onClick={this.logout} className="nav-item nav-link">Logout</a>
            //   </div>
            // </nav>
          }
          <div className="jumbotron">
            <div className="container">

              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/about" component={AboutPage} exact />
                <Route path="/contact" component={ContactPage} exact />
                <Route path="/addEmployee" component={AddEmployee} exact />
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute path="/displayAllEquipment" component={EquipmentListPage} exact />
                <PrivateRoute path="/addEquipment" component={AddEquipment} exact />
                <PrivateRoute path="/displayAllLocations" component={DisplayAllLocation} exact />
                <PrivateRoute path="/addLocation" component={AddLocation} exact />
                <PrivateRoute path="/displayAllEmployees" component={DisplayAllEmployees} exact />
                <PrivateRoute path="/displayAllCustomers" component={DisplayAllCustomers} exact />
                <PrivateRoute path="/locationDetail/:id" component={LocationDetail} exact />
                <PrivateRoute path="/employeeDetail/:id" component={EmployeeDetail} exact />
                <PrivateRoute path="/equipmentDetail/:id" component={EquipmentDetail} exact />
                <PrivateRoute path="/addCustomer" component={AddCustomer} exact />
                <PrivateRoute path="/customerDetail/:id" component={CustomerDetail} exact />
                <PrivateRoute path="/editEquipment/:id" component={EditEquipment} exact />
                <PrivateRoute path="/editCustomer/:id" component={EditCustomer} exact />
                <PrivateRoute path="/editLocation/:id" component={EditLocation} exact />
                <PrivateRoute path="/editEmployee/:id" component={EditEmployee} exact />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </div>
          {!currentUser &&
            <NavBar />
            // <nav className="navbar navbar-expand navbar-dark bg-dark">
            //   <div className="navbar-nav">
            //     <Link to="/" className="nav-item nav-link">Home</Link>
            //     <a onClick={this.logout} className="nav-item nav-link">Logout</a>
            //   </div>
            // </nav>
          }
          <Footer />
        </div>
      </Router>

    );
  }
}

export default App;