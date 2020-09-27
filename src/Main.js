
import React from "react";
import "./App.css";
var xmlrpc = require('xmlrpc')
var client = xmlrpc.createClient({ host: 'localhost', port: 9090, path: '/RPC2'})

export default class Main extends React.Component {
  state = {
    value: 0
  };

  handleClick = buttonName => {
    this.setState({total: this.state.total+1});
  };

  getPrediction = () => {
    client.methodCall('predict', ["2020-9-27"], (error, val) => {
      // Results of the method response
      
      console.log('Method response for \'anAction\': ' + val)
      this.updateState(val)
    })
  }

  updateState = (val) => {
    this.setState({value: val})
  }

  render() {
    return (
        <div className="App">
                <header className="App-header">
                <p>
                    Tomorrow's S&P 500 is {this.state.value}
                </p>
                <button onClick={() => this.getPrediction()}>Get Prediction</button>
                </header>
            </div>
    );
  }
}

