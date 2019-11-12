import React from 'react';
import ReactDOM from 'react-dom'
import ReportList from './ReportList';
const Reports = (props) => {
  if (Array.isArray(props.reportLists[0])) {
    let reportLists = props.reportLists.map((reportList, index) => {
      return <ReportList key={index} reports={reportList} />
    });
    return <section className='table'>
      {reportLists}
    </section>
  } else {
    return <div></div>
  }
}

export default Reports;