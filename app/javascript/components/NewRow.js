import React from 'react';
const NewRow = (props) => {
  let formFields = {}
 
  return(
    <form onSubmit={
      (e)=>{
        props.handleFormSubmit(formFields.id.value, formFields.jobgroup.value);
        e.target.reset();
      }
    }>
     <input ref={input => formFields.id = input} placeholder='Enter the name of the item'/>
     <input ref={input => formFields.jobgroup = input} placeholder='Enter a description' />
     <button>Submit</button>
    </form>
  )
}
export default NewRow;