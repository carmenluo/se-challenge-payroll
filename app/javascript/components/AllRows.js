import React from 'react';
import RowItem from './RowItem';
const AllRows = (props) => {
  let employees = props.employees.map((employee, index) => {
    //   return <RowItem key={employee.id} id={employee.id} job_group={employee.job_group} />
    // }));
    return <RowItem key={index} date={employee[0]} hours={employee[1]} id={employee[2]} job_group={employee[3]} />
  });
  return <table className='table'>
    <thead>
      <tr>
        <th>#</th>
        <th>date</th>
        <th>hours worked</th>
        <th>employees id</th>
        <th>job group</th>
      </tr>
    </thead>
    <tbody>{employees}</tbody>
  </table>
}

export default AllRows;