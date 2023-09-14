import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useUser } from '../../userData';

function Applied() {

    const {userData} = useUser();

    let user = userData && userData.instructor ? userData.instructor.name : '';

    const [candidateData, setCandidateData] = useState([]);

    useEffect(() => { // Fetch jobs data from the backend when the component mounts
        fetchJobs();
    }, [user]);

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`https://job-posting-eight.vercel.app/application/applied-candidate/${user}`); 
            setCandidateData(response.data); // Set the retrieved jobs data in the state
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };


console.log(candidateData)
  return (
    <div className='border p-2 bg-gray-100 m-2 rounded-lg'>
            <h1 className='p-1 m-2 bg-white text-center rounded-lg'>Applied Jobs</h1>
            <ul className='bg-white p-2 rounded-md'>
                {candidateData.map(candidate => (
                    <li key={candidate._id} className='bg-slate-200 m-2 p-2 rounded-lg'>
                        <p>Name: {candidate.name}</p>
                        <p>Candidate: {candidate.candidate}</p>
                        <p>Email: {candidate.email}</p>
                        <p>Status: {candidate.status?candidate.status:'Applied'}</p>
                        <p>Response: {candidate.response?candidate.response:'No Response'}</p>
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default Applied