import React from 'react'
import Form from './Form';
import  {ReactComponent as Postsvg} from '../../assets/createpost.svg';
const CreatePost = () => {
  return (
    <div>
      <Form/>
      <div className='create-post-svg'>
        <div><Postsvg/></div>
      </div>
    </div>
  )
}

export default CreatePost