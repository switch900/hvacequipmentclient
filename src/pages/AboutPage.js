import React from 'react';
import '../App.css';

const AboutPage = () => (
    <React.Fragment>

        <h1> About HVAC Equipment Project</h1>
        <div className="AboutPageTextBox">
            <p>A personal project done on spec for an HVAC installation company.</p>
            <p> An HVAC company would like to put QR codes on every piece of equipment
                that they install or maintain. Technicians in the field can use these
                codes to gather or save information about the equipment to a central database.
                Administrations people in the office will be able to see this information
                and generate reports using this information. All access should be done in a
                secure way so that unauthorized changes to the database cannot occur and
                each user type having very specific information about the equipment that
                they can see and update.</p>
            <p>The project will be built using ASP.NET Core Web API and
                a front end built with React.</p>
            <h3>People that I learned a lot from for this project</h3>
            <ul>
                <li><a href="https://github.com/MikeWasson">Mike Wasson - https://github.com/MikeWasson</a></li>
                <li>Jason Watmore - https://jasonwatmore.com/</li>
                <li>Medhat Elmasry - https://blog.medhat.ca/</li>

            </ul>
        </div>
    </React.Fragment>
);
export default AboutPage;
