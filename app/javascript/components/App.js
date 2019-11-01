import React from 'react';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }
  }
  checkFileType = file => {
    console.log(file.type)
    if (file.type === "application/csv") {
      return true;
    }
    return false;
  }
  onChangeHandler = event => {
    console.log(this.checkFileType(event.target.files[0]))
    if (this.checkFileType(event.target.files[0])) {
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
      console.log(event.target.files[0])
    } else {
      console.log("Please select the right type")
    }
  }
  onClickHandler =() => {
    const data = new FromData()
    data.append('file', this.state.selectedFile)
  }
  render() {
    return (
      <div class='container'>
        <div class='row'>
          <div class='offset-md-3 col-md-6'>
            <div class='form-group files'>
              <label>Please select you file to upload</label>
              <input type='file' name='file' class='form-control' onChange={this.onChangeHandler}></input>
            </div>
            <button type='button' class='btn btn-s' onClick={this.onClickHandler}>Upload</button>
          </div>
        </div>

      </div>
    )
  }
}
export default App