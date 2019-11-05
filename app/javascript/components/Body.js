import React from 'react';
import AllRows from "./AllRows";

class Body extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        employees: []
      };
    }
  componentDidMount(){
    //   fetch('/api/v1/fruits.json')
    //     .then((response) => {return response.json()})
    //     .then((data) => {this.setState({ fruits: data }) });
    }
  render(){
      return(
        <div>
          {/* <AllRows fruits={this.state.fruits} /> */}
        </div>
      )
    }
  }