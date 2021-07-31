import React from 'react';
import './AddEmployeeForm.css';
import { authenticationService } from '../../_services/authentication.service';

export class AddEmployeeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            userName: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            birthDate: new Date(),
            street: '',
            city: '',
            province: '',
            postalCode: '',
            country: ''
        };
    }
    // const[userName, setUserName] = useState('');
    // const[password, setPassword] = useState('');
    // const[firstName, setFirstName] = useState('');
    // const[lastName, setLastName] = useState('');
    // const[email, setEmail] = useState('');
    // const[phoneNumber, setPhoneNumber] = useState('');
    // const[accessLevel, setAccessLevel] = useState('');
    myChangeHandler = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            alert("Form submitted");
            this.addEmployee();
        } else {
            alert("Form has errors.")
        }
    }

    handleChange = date => {
        this.setState({
            birthDate: date
        });
    };

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //UserName
        if (!fields["userName"]) {
            formIsValid = false;
            errors["userName"] = "Cannot be empty";
        }

        //Password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        console.log(fields);
        var rgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
        if (!rgx.test(fields["password"])) {
            errors["password"] = "Password must contain lowercase, uppercase, number, and special character";
            formIsValid = false;
        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }

            // //FirstName
            // if (!fields["firstName"]) {
            //     formIsValid = false;
            //     errors["firstName"] = "Cannot be empty";
            // }

            //LastName
            if (!fields["lastName"]) {
                formIsValid = false;
                errors["lastName"] = "Cannot be empty";
            }

        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    addEmployee() {
        const currentUser = authenticationService.currentUserValue;

        fetch('https://andrewhewitson.com/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + currentUser.token
            },
            body: JSON.stringify({
                UserName: this.state.userName,
                Password: this.state.password,
                Email: this.state.email,
                FirstName: this.state.firstname,
                LastName: this.state.lastname,
                // BirthDate: this.state.birthDate,
                Street: this.state.street,
                City: this.state.city,
                Province: this.state.province,
                PostalCode: this.state.postalCode,
                Country: this.state.country,
            })
        })
            .then(res => res.json()).then(res => {
                if (res) {
                    alert("You are now registered as an HVAC Technician " + this.state.userName);
                }
                else {
                    alert("Not a valid user or password");
                }
            }, function (error) {
                console.log(error.message); //=> String
            })
    }

    sendToken = () => {
        var token = this.state.token;
        this.props.parentCallback(token);
    }

    render() {
        return (
            <form onSubmit={this.mySubmitHandler} >
                <div className="form-group">
                    <label htmlFor="usr">User Name:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='userName'
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["userName"]}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        type="password"
                        name='password'
                        className="form-control"
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Email:</label>
                    <input
                        type='email'
                        name='email'
                        className="form-control"
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

                </div>

                <div className="form-group">
                    <label htmlFor="usr">First Name:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='firstname'
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["firstName"]}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Last Name:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='lastName'
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["lastName"]}</span>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="usr">Birthdate:</label>
                    <DatePicker
                        selected={this.state.birthDate}
                        onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleChange} //only when value has changed
                    />
                </div> */}



                <div className="form-group">
                    <label htmlFor="usr">Street:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='street'
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">City:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='city'
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Province:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='province'
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Postal Code:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='postalCode'
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Country:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='country'
                        onChange={this.myChangeHandler}
                    />
                </div>

                {/* <div className="form-group">
                    <label htmlFor="usr">Longitude:</label>
                    <input
                        type='int'
                        className="form-control"
                        name='longitude'
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["longitude"]}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Latitude:</label>
                    <input
                        type='int'
                        className="form-control"
                        name='latitude'
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["latitude"]}</span>
                </div> */}

                <input className="btn btn-primary"
                    type='submit'
                    text='Register'
                />
            </form>
        )
    }
}

export default AddEmployeeForm;
