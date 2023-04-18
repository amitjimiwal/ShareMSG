import React from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { addDoc,getDoc,collection} from 'firebase/firestore';
import { database } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
const Form = () => {
      const [user] = useAuthState(auth);
      const navigate=useNavigate();
      // error va;idation function
      const validate=(values)=>{
            const errors={};
            if(!values.title){
                  errors.title="*Required"
            }
            if(!values.description){
                  errors.description="*Required";
            }
            return errors;
      }

      const postref=collection(database,"posts");
      const {values,handleBlur,handleChange,handleSubmit,touched,errors}=useFormik({
            initialValues:{
                  title:"",
                  description:""
            },
            validate,
            onSubmit:async (values,{resetForm})=>{
                  try{
                        await addDoc(postref,{
                              title:values.title,
                              description:values.description,
                              id:user?.uid,
                              username:user?.displayName
                        })
                        navigate("/");
                  }
                  catch(error){
                        alert(error);
                  }
            }
      })
  return (
    <div className='input-form'>
      <form onSubmit={handleSubmit}>
       <h1>Share Something</h1>
            <input 
            type='text' 
            name='title'
            placeholder='Title..' 
            onChange={handleChange} 
            onBlur={handleBlur}
            value={values.title}
            />
            {touched.title && errors.title ? <div className='errormg'>{errors.title}</div>:null}
            <input 
            type='text' 
            name='description'
            placeholder='Description...' 
            onChange={handleChange} 
            onBlur={handleBlur}
            value={values.description}
            />
            {touched.description && errors.description ? 
            <div className='errormsg'>{errors.description}</div>
            :
            null}
            <button type='submit'>Create Post</button>
      </form>
    </div>
  )
}

export default Form;