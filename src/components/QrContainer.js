import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import { Link } from 'react-router-dom';
import '../App.css';

class QrContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 100,
            result: 'Hold QR Code steady and clear to scan',
        }

        this.handleScan = this.handleScan.bind(this)
    }
    handleScan(result) {
        if (result) {
            this.setState({ result })
            //result.To
            window.open('http://localhost:3000/detail/' + result);
        }

    }
    handleError(err) {
        console.error(err)
    }
    render() {
        const previewStyle = {
            border: '1px solid black',
            margin: '10px',
            height: 350,
            width: 500,
            display: 'flex',
            justifyContent: "center"
        }

        const camStyle = {
            display: 'flex',
            justifyContent: "center",
        }

        const textStyle = {
            fontSize: '30px',
            textAlign: 'center',
            display: "block"
        }

        return (
            <div>
                <div style={textStyle}>
                    <Link to={`/detail/${this.state.result}`}>
                        <h1>{this.state.result}</h1>
                    </Link>
                </div>
                <div style={camStyle}>
                    <QrReader
                        delay={this.state.delay}
                        style={previewStyle}
                        onError={this.handleError}
                        onScan={this.handleScan}
                    />
                </div>
            </div>
        )
    }
}
export default QrContainer;