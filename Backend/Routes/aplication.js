const express = require('express');
const router = express.Router();
const application = require('../model/application');
const Jobs = require('../model/Jobs');
const Candidate = require('../model/candidate');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage:storage,
  limits:{
    fileSize:1024*1024*10
  }
})

router.post('/upload', upload.single('resume'), async(req,res)=>{
  try {
    const {candidate , jobId , email} = req.body;

  console.log(candidate)

    const { originalname, buffer } = req.file;
    const contentType = req.file.mimetype;

    const courseName = await Jobs.findById(jobId);
    const newPDF = new application({  
      email : email,
      candidate:candidate,
      name:courseName.title,
      resume:{
        name: originalname,
        data: buffer,
        contentType: contentType,
      }
      
    });
    await newPDF.save();
    res.status(200).json({ message: 'PDF uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading PDF' });
  }
});

router.get('/get-pdf/:id', async (req, res) => {
  
  const id = req.params.id;
  try {
    const Application = await application.findById(id);

    console.log(Application)
    if (!Application) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Set the Content-Type header only if the application object exists
    res.setHeader('Content-Type', Application.resume.contentType);
    res.setHeader('Content-Disposition', `inline; filename="${Application.resume.name}"`);
    res.send(Application.resume.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching PDF' });
  }
});


router.post('/candidate/register' , async(req,res)=>{
  try {
    // Create a new job based on the request data
    const newAdmin = new Candidate(req.body);

    // Save the job to the database
    await newAdmin.save();

    // Respond with a success message
    res.json({ message: 'Candidate added successfully'});
  } catch (error) {
    // Handle errors
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


// route for login of instructor
router.post('/instructor/login', async(req, res) => {
    const {username, password} = req.body;

    console.log(req.body)
    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required'});
    }

    const candidate = await Candidate.find({})
    // Find an instructor with the provided username and password
    const candidates = candidate.find((candidate) => candidate.username === username && candidate.password === password);

    if (candidates) {
        // If an instructor is found, respond with a success message or instructor details
        return res.status(200).json({
            message: 'Login successful',
            instructor: {
                name: candidates.name,
                username: candidates.username
            }
        });
    } else {
        // If no instructor is found, respond with an error message
        return res.status(401).json({message: 'Invalid username or password'});
    }
})


router.get('/candidate/find-candidate/:id',async(req,res)=>{
      const username = req.params.id;

    const findCandidate = await Candidate.findOne({username:username})
    if(findCandidate){
      res.send(findCandidate)
    }else {
      return res.status(401).json({message: 'Invalid username/email'});
  }

})

router.post('/applications/submit', async (req, res) => {
    console.log(req.body);
    const {candidate , jobId , email , resume} = req.body
    try {
        const courseName = await Jobs.findById(jobId);
        console.log(courseName);
        // Create a new application based on the request data
        const newApplication = new application({
          name: courseName.title,
          candidate:candidate,
          email: email,
          resume: resume, 
        });
    
        // Save the application to the database
        await newApplication.save();
    
        // Respond with a success message
        res.json({ message: 'Application submitted successfully', application: newApplication });
      } catch (error) {
        // Handle errors
        console.error('Error submitting application:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });


  router.put('/application/add-status' , async(req,res)=>{
    const {id , status, response} = req.body;
    
    const findJob = await application.findByIdAndUpdate(id ,{status:status , response:response});

    console.log(findJob);

  })

  router.get('/application/views', async (req, res) => {
    try {
      // get jobs based on the request data
      const getAllViews = await application.find({})
  
      res.json(getAllViews );
    } catch (error) {
      // Handle errors
      console.error('Error creating job:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.get('/application/applied-candidate/:id', async (req, res) => {
    const candidate = req.params.id
    try {
      // get jobs based on the request data
      const getApplied = await application.find({candidate:candidate});
  
      res.json(getApplied);
    } catch (error) {
      // Handle errors
      console.error('Error finding candidate:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports=router