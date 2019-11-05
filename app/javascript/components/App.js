import React from 'react';
import ReactDOM from 'react-dom'
import CSVReader from 'react-csv-reader';
import Papa from 'papaparse';
import AllRows from './AllRows'
import NewRow from './NewRow'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      selectedFile: null,
      loaded: 0,
      preview: [],
      reportID: 0
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  componentDidMount() {
    fetch('/payroll.json')
      .then((res) => { return res.json() })
      .then((data) => { this.setState({ employees: data }) })
  }
  checkFileType = file => {
    console.log(file.type)
    if (file.type === "text/csv") {
      return true;
    }
    return false;
  }
  // parseData = (raw) => {
  //   return raw.data.map(item => )
  // }
  onChangeHandler = event => {
    console.log(this.checkFileType(event.target.files[0]))
    if (this.checkFileType(event.target.files[0])) {
      Papa.parse(event.target.files[0], {
        complete: (results) => {
          console.log(results.data[results.data.length-1][1])
          this.setState({ preview: results.data, reportID: results.data[results.data.length-1][1] })
        }
      });
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
      console.log(event.target.files[0])
    } else {
      console.log("Please select the right type")
    }
  }
  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile);
    data.append('reportID', this.state.reportID);
    fetch('/payroll', {
      method: 'post',
      header: { 'Content-Type': 'application/json' },
      body: data
    }).then((res) => {return res.json()
    }).then((data)=>{console.log(data)})
  }
  handleFormSubmit(id, jobgroup) {
    let body = JSON.stringify({ employee: { id: id, job_group: jobgroup } });
    fetch('/payroll', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).then((res) => {
      return res.json();
    }).then((body => {
      this.setState()
    }))
    console.log(id, jobgroup)
  }
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='offset-md-3 col-md-6'>
            <div className='form-group files'>
              <label>Please select you file to upload</label>
              <input type='file' accept=".csv" name='file' className='form-control' onChange={this.onChangeHandler}></input>
            </div>
            <button type='button' className='btn btn-s' onClick={this.onClickHandler}>Upload</button>
          </div>
        </div>
        <AllRows employees={this.state.preview}></AllRows>
      </div>
    )
  }
}
export default App