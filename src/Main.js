
import React from "react";
import "./App.css";
import {Line} from 'react-chartjs-2';
var xmlrpc = require('xmlrpc')
var client = xmlrpc.createClient({ host: 'localhost', port: 9090, path: '/RPC2'})


export default class Main extends React.Component {
  state = {
    value: 0,
    labels: [],
  datasets: [
    {
      label: 'Predictions',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    },
    {
      label: 'Trues',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#DB3A34',
      borderColor: '#DB3A34',
      borderWidth: 2,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#DB3A34',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#DB3A34',
      pointHoverBorderColor: '#DB3A34',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
  };

  componentDidMount() {
    this.getPrediction()
    this.getManyPrediction()
  }

  handleClick = buttonName => {
    this.setState({total: this.state.total+1});
  };

  getPrediction = () => {
    client.methodCall('predict', ["2020-9-27"], (error, val) => {
      // Results of the method response
      
      console.log('Method response for \'anAction\': ' + val)
      val = val *1000
      val = Math.round(val)
      val = val/1000
      this.updateState(val)
    })
  }

  getManyPrediction = () => {
    client.methodCall('predictMany', [], (error, val) => {
      // Results of the method response
      
      console.log('Method response for \'anAction\': ' + val)
      var data = this.state.datasets
      data[0].data = val[1]
      data[1].data = val[2]
      data[0].data.push(this.state.value)
      val[0].push("2020-9-27")
      this.setState({labels: val[0], datasets: data})
      console.log( val[0])
    })
  }

  updateState = (val) => {
    this.setState({value: val})
  }

  render() {
    
    return (
        <div className="App">
                <header className="App-header">
                <Line
                className="graph"
          data={this.state}
          options={{
            title:{
              display:true,
              text:'',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
                <p>
                    Tomorrow's S&P 500 at close will be {this.state.value}
                </p>
                </header>
            </div>
    );
  }
}

