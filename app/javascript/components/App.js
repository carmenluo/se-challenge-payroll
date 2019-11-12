import React from 'react';
import ReactDOM from 'react-dom'
import CSVReader from 'react-csv-reader';
import Papa from 'papaparse';
import AllRows from './AllRows'
import ReportList from './ReportList'
import Reports from './Reports'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      selectedFile: null,
      loaded: 0,
      preview: [],
      reportIDs: [],
      reportList: [],
      reportRecord: [],
      error: null
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  componentDidMount() {
    fetch('/payroll.json')
      .then((res) => { return res.json() })
      .then((data) => { this.setState({ employees: data }) })
    // set states for ids so that we can check if the report is in database already
    fetch('/report/ids')
      .then((res) => { return res.json() })
      .then((data) => {
        let reportIDs = []
        data.forEach(report => {
          reportIDs.push(report.report_id)
          fetch(`/report/${report.report_id}`)
            .then((res) => { return res.json() })
            .then((data) => {
              this.setState(prevState => ({ reportList: [...prevState.reportList, data] }))
            })
        })
        this.setState({ reportIDs: reportIDs })
      })
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.loaded !== this.state.loaded) {
  //     fetch('/report/ids')
  //     .then((res) => { return res.json() })
  //     .then((data) => {
  //       let reportIDs = []
  //       data.forEach(report => {
  //         reportIDs.push(report.report_id)
  //         fetch(`/report/${report.report_id}`)
  //           .then((res) => { return res.json() })
  //           .then((data) => {
  //             this.setState(prevState => ({ reportList: [...prevState.reportList, data] }))
  //           })
  //       })
  //       this.setState({ reportIDs: reportIDs })
  //     })
  //     this.setState({loaded: 0})
  //   }
  // }
  checkFileType = file => {
    if (file.type === "text/csv") {
      return true;
    }
    return false;
  }

  onChangeHandler = event => {
    if (this.checkFileType(event.target.files[0])) {
      Papa.parse(event.target.files[0], {
        skipEmptyLines: true,
        complete: (results) => {
          let reportID = parseInt(results.data[results.data.length - 1][1])
          if (!this.sameReportID(reportID)) {
            this.setState({ error: null, preview: results.data, reportID: reportID })
          } else {
            this.setState({ error: "Files with same report ID are not allowed to submit twice" })
          }
        }
      });
      this.setState({
        selectedFile: event.target.files[0]
      })
    } else {
      console.log("Please select the right type")
    }
  }
  sameReportID = (reportID) => {
    return this.state.reportIDs.includes(reportID) ? true : false
  }
  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile);
    data.append('reportID', this.state.reportID);
    fetch('/payroll', {
      method: 'post',
      header: { 'Content-Type': 'application/json' },
      body: data
    }).then((res) => {
      return res.json()
    }).then((data) => {
      // this.setState({loaded: 1})
      console.log(data)
      let reportIDs = this.state.reportIDs
      reportIDs.push(data[0].report_id)
      this.setState(prevState => ({ reportIDs: reportIDs, reportList: [...prevState.reportList, data] }))
    })
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
        {this.state.error &&
          <div className='alert alert-danger'>{this.state.error}</div>}
        <AllRows employees={this.state.preview}></AllRows>
        <Reports reportLists={this.state.reportList}></Reports>
      </div>
    )
  }
}
export default App