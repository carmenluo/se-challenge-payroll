import React from "react";
export default function RowItem(props) {
  return <tr>
    <th>{props.id}</th>
    <td>{props.id}</td>
    <td>{props.job_group}</td>
    <td>{props.date}</td>
    <td>{props.hours}</td>
  </tr>
}