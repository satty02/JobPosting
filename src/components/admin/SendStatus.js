import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ResumeViewer from './ResumeViewer';


function SendStatus() {
    const [application, setApplication] = useState([])
    const [sendStatus, setSendStatus] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [jobId, setJobId] = useState('');

    const [statusForm, setStatusForm] = useState({
      id: '',
      status:'',
      response:''
    })

    
    useEffect(() => { // Fetch jobs data from the backend when the component mounts
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/application/Views'); // Replace with your backend API endpoint
            setApplication(response.data); // Set the retrieved jobs data in the state
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleStatus =(e)=>{
      setStatusForm({
        ...statusForm,
        id: e.target.name,
      });

        setJobTitle(e.target.value);
        setSendStatus(!sendStatus);
    }

    const handleSendStatus =(e)=>{
      const { name, value } = e.target;
        setStatusForm({
          ...statusForm,
          [name]: value,
        });
    }

    const handleStatusSubmit =async (e)=>{
        e.preventDefault();

        const submitStatusForm = await statusForm;

        try {
          const response = await axios.put('http://localhost:8080/application/add-status' ,submitStatusForm); // Replace with your backend API endpoint
          setApplication(response.data); // Set the retrieved jobs data in the state
      } catch (error) {
          console.error('Error fetching jobs:', error);
      }
    }

    const handleResume = (e)=>{
        setJobId(e.target.name);
    }

  return (
    <>
    <div className='flex flex-col'>
        <div className=' text-center text-xl font-semibold rounded-lg my-3 p-1 bg-slate-200 w-full '>Applications</div>
        <div className='flex justify-center'>
          <ul className=''>
            {application.map((job) => (
              <li key={job._id} className='border w-[300px] bg-slate-100'>
                <h3 className='border p-1 m-2 bg-slate-100 rounded-lg font-semibold text-sm'>Job-Title: {job.name}</h3>
                <h3 className='border p-1 m-2 bg-slate-100 rounded-lg font-semibold text-sm'>Applicant name: {job.candidate}</h3>
                <h3 className='border p-1 m-2 bg-slate-100 rounded-lg font-semibold text-sm'>Applicant Email: {job.email}</h3>
                <p className='border p-1 m-2 bg-slate-100 rounded-lg font-semibold text-sm'>Applicant: resume: {}</p>
                <button className='border m-2 p-2 bg-blue-500 rounded-lg ' onClick={handleResume} name={job._id}>View Resume</button>
                <button className='border m-2 p-2 bg-blue-500 rounded-lg ' onClick={handleStatus} name={job._id} value={job.name}>Send Status</button>
              </li>
            ))}
          </ul>
      </div>
    </div>
    <div>
    {
        sendStatus && (<>
          <p className='border bg-blue-50 p-2 m-2 rounded-lg'>Job Title: {jobTitle}</p>
          <form onSubmit={handleStatusSubmit}>
            <select className='border p-2 m-2 bg-green-300  rounded-lg' name='status' value={statusForm.status} onChange={handleSendStatus}>
                  <option>Select</option>
                  <option>Accept</option>
                  <option>Reject</option>
                  <option>Pending</option>
              </select>
              <div>
                <label className='border p-1 m-2 bg-gray-100 rounded-lg'>Response</label>
                <textarea className='border  p-1 m-2 bg-white rounded-lg' name='response' value={statusForm.response} onChange={handleSendStatus} placeholder='Response'/>
              </div>
              <button className='border bg-blue-500 p-1 mx-2 rounded-md'>send</button>
          </form>
            
            
        </>
            
        )
    }
    
    </div>
    <div className='border m-2'>
      <ResumeViewer id={jobId}/>
    </div>
    </>

  )
}

export default SendStatus