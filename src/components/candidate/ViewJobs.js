import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useUser } from '../../userData';
import Applied from './Applied';

function ViewJobs() {

    const {userData} = useUser();

    let user = userData && userData.instructor ? userData.instructor.name : '';

    const [jobs, setJobs] = useState([]);
    const [apply, setApply] = useState(false);
    const [jobName, setJobName] = useState('')
    const [message, setMessage] = useState('')

    const [appData, setAppData] = useState({
        candidate:user,
        jobId: '',
        email:'',
        resume: null,
      });

      useEffect(() => { // Fetch jobs data from the backend when the component mounts
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('https://job-posting-eight.vercel.app/admin/get-jobs'); // Replace with your backend API endpoint
            setJobs(response.data); // Set the retrieved jobs data in the state
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };
    
    // setting the value for email

      const handlChange = (e) => {
        const { name, value } = e.target;
        setAppData({
          ...appData,
          [name]: value,
        });
      };

    //   setting the file

      const handleFile = (e) => {
        const file = e.target.files[0];
            setAppData({
                ...appData,
                resume: file,
              });
      };

      const handleApply = (e)=>{
        setJobName(e.target.name);
        setAppData({
            ...appData, jobId : e.target.value
        })  
        setApply(!apply);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a FormData object to send files with the request
        const submitData = await appData
        
        try {
          // Send a POST request to your backend API to add the application data to the database
          const response = await axios.post('https://job-posting-eight.vercel.app/upload', submitData , {
            headers:{
                'Content-Type':'multipart/form-data'
            }
          });
    
          // Handle the response as needed (e.g., show a success message)
          console.log('Application submitted successfully:', response.data);
          setMessage(response.data.message)
    
          // Clear the form fields
          setAppData({
            candidate:'',
            jobId: '',
            email: '',
            resume: null,
          });
        } catch (error) {
          // Handle errors (e.g., show an error message)
          console.error('Error submitting application:', error);
        }
      };

    return (
        <div className='flex'>
        <div className='flex flex-col '>
            <h2 className='border w-full rounded-md p-1 px-2 bg-gray-300 font-semibold m-1 text-center text-xl'>List of Jobs {user}</h2>
            <ul className='flex flex-wrap m-2 p-3 rounded-lg justify-center border w-[400px] bg-blue-200'>
                {
                jobs.map((job) => (
                    <div className='flex flex-col'>
                    <div>
                    <li key={
                        job._id
                    }>
                        <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>Job type: {
                            job.jobType
                        }</h3>
                        <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>title: {
                            job.title
                        }</h3>
                        <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>companyDetail: {
                            job.companyDetail
                        }</h3>
                        <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>tags: {
                            job.tags
                        }</h3>
                        <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>skills: {
                            job.skills
                        }</h3>
                        <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>experience: {
                            job.experience
                        }</h3>
                        <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>description: {
                            job.description
                        }</h3>
                        <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>salary: {
                            job.salary
                        }</h3>
                        <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>additional: {
                            job.additional
                        }</h3>
                         </li>
                         </div>
                             <button className='border m-2 rounded-md bg-blue-500 p-1' onClick={handleApply} name={job.title} value={job._id}>Apply</button>
                         </div>
                ))
                
            } </ul>
            

            
        </div>
        {
                apply && (
                    <div className='border rounded-lg w-[300px] bg-slate-200 p-2 m-2'>
                        <h1 className='text-center m-1 p-1 font-semibold bg-slate-50 rounded-md' >Submit Application </h1>
                        <p className='border text-center bg-white rounded-md m-2 p-1 font-semibold text-gray-600'>Job Name: {jobName}</p>
                        <form onSubmit={handleSubmit}>
                            <div className='flex justify-center'>   
                            <label className='bg-slate-50  p-1 rounded-md'>Email:</label>
                            <input name="email"
                                value={appData.email}
                                onChange={handlChange}
                                type='email' 
                                className=' p-1 bg-gray-50 rounded-md mx-3' 
                                placeholder='Enter email'/>
                            </div>
                            
                            <input className='m-2' name='pdf' type='file' onChange={handleFile}   accept=".pdf,.doc,.docx"/>
                            <button className='bg-blue-500 p-2 m-1 rounded-lg ml-[90px]' type='submit'>Submit</button>
                        </form>
                        <p className='text-red-500 text-center text-sm'>{message?message:''}</p>
                    </div>
                )
            }
            <div><Applied/></div>
        </div>
    )
}

export default ViewJobs;
