const express = require('express');
const router = express.Router();
const Jobs = require('../model/Jobs');
const Admin = require('../model/admin');



router.post('/admin/register' , async(req,res)=>{
  try {
    // Create a new job based on the request data
    const newAdmin = new Admin(req.body);

    // Save the job to the database
    await newAdmin.save();

    // Respond with a success message
    res.json({ message: 'Admin added successfully'});
  } catch (error) {
    // Handle errors
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/admin/login',async (req, res) => {
  res.send('hello')
  const {username, password} = req.body;
  if (!username || !password) {
      return res.status(400).json({message: 'Username and password are required'});
  }

  // Find an instructor with the provided username and password
  const admin = await Admin.find({})

  const checkAdmin = admin.find((instructor) => instructor.username === username && instructor.password === password);

  if (checkAdmin) { // If an instructor is found, respond with a success message or instructor details
      return res.status(200).json({
          message: 'Login successful',
          instructor: {
              name: checkAdmin.name,
              username: checkAdmin.username
          }
      });
  } else { // If no instructor is found, respond with an error message
      return res.status(401).json({message: 'Invalid username or password'});
  }
});

router.get('/admin/find-candidate/:id',async(req,res)=>{
  const username = req.params.id;

const findCandidate = await Admin.findOne({username:username})
if(findCandidate){
  res.send(findCandidate)
}else {
  return res.status(401).json({message: 'Invalid username/email'});
}

})


router.post('/admin/add-jobs', async (req, res) => {
    try {
      // Create a new job based on the request data
      const newJob = new Jobs(req.body);
  
      // Save the job to the database
      await newJob.save();
  
      // Respond with a success message
      res.json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
      // Handle errors
      console.error('Error creating job:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/admin/get-jobs', async (req, res) => {
    res.send('hello')
    try {
      // get jobs based on the request data
      const getAllJobs = await Jobs.find({})
  
      res.json(getAllJobs );
    } catch (error) {
      // Handle errors
      console.error('Error creating job:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports=router