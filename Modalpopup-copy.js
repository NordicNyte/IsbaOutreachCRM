import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Select, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { useState } from "react";
import './Modalpopup.css';


const Modalpopup = () => {
    const [open, setOpen] = useState(false);
    const [industry, setIndustry] = useState('');
    const [industries, setIndustries] = useState([]); // State for storing the fetched industries
    // Other states for industryExpertise, affiliation, etc.

    // Function to open the popup
    const handleOpenPopup = () => setOpen(true);

    // Function to close the popup
    const handleClosePopup = () => setOpen(false);

    // Fetch industries from backend when component mounts
    useEffect(() => {
        const fetchIndustries = async () => {
            const response = await fetch('/industryTags'); // Ensure this URL matches your backend configuration
            const industryTags = await response.json();
            setIndustries(industryTags);
        };

        fetchIndustries();
    }, []);
    
    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '2em'}}></h1>
            <Button onClick={functionopenpopup} color='primary' variant='contained'>Go</Button>
            <Dialog fullScreen open={open} onClose={closepopup} fullWidth maxWidth='sm'>
                <DialogTitle style={{ backgroundColor: '#2774AE', color:'white', fontWeight: 'semi-bold', fontSize: '2em'}}>Career Details <IconButton onClick={closepopup} style={{ float: 'right', color:'white'}}><CloseIcon ></CloseIcon></IconButton></DialogTitle>
                <DialogContent style={{ backgroundColor: '#2774AE', color:'white',  }}>
                    <DialogContentText>This screen is about user details</DialogContentText>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>

                        <div style={{ marginRight: '20px', width: '30%' }}>
                            <Typography variant="body1">Industry: {industry}</Typography>
                            <Select
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                variant='outlined'
                                label='Industry'
                                style={{ width: '100%', color:'white', backgroundColor: '#606060' }}
                            >
                                <MenuItem value="Software Developer">Software Developer</MenuItem>
                                <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                                <MenuItem value="Graphic Designer">Graphic Designer</MenuItem>
                            </Select>
                        </div>
                        <div style={{ marginRight: '20px', width: '30%' }}>
                            <Typography variant="body1">Industry Expertise: {industryexpertise}</Typography>
                            <Select
                                value={industryexpertise}
                                onChange={(e) => setIndustryExpertise(e.target.value)}
                                variant='outlined'
                                label='Industry Expertise'
                                style={{ width: '100%', color:'white', backgroundColor: '#606060' }}
                            >
                                <MenuItem value="Software Developer">Software Developer</MenuItem>
                                <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                                <MenuItem value="Graphic Designer">Graphic Designer</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '30%' }}>
                            <Typography variant="body1">Affiliation: {affiliation}</Typography>
                            <Select
                                value={affiliation}
                                onChange={(e) => setAffiliation(e.target.value)}
                                variant='outlined'
                                label='Affiliation'
                                style={{ width: '100%', color:'white', backgroundColor: '#606060'  }}
                            >
                                <MenuItem value="1-3 years">1-3 years</MenuItem>
                                <MenuItem value="3-5 years">3-5 years</MenuItem>
                                <MenuItem value="5+ years">5+ years</MenuItem>
                            </Select>
                        </div>
                    </div>
                    {/* Location and Help With on the same line */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={{ marginRight: '20px', width: '50%' }}>
                            <Typography variant="body1">Skills: {skills}</Typography>
                            <Select
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                variant='outlined'
                                label='Skills'
                                style={{ width: '100%', color:'white', backgroundColor: '#606060'  }}
                            >
                                <MenuItem value="New York">New York</MenuItem>
                                <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                                <MenuItem value="London">London</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '50%' }}>
                            <Typography variant="body1">Can Help With: {helpWith}</Typography>
                            <Select
                                value={helpWith}
                                onChange={(e) => setHelpWith(e.target.value)}
                                variant='outlined'
                                label='Can help with:'
                                style={{ width: '100%', color:'white', backgroundColor: '#606060' }}
                            >
                                <MenuItem value="Panels">Panels</MenuItem>
                                <MenuItem value="Guest Speaking">Guest Speaking</MenuItem>
                                <MenuItem value="Mentorships">Mentorships</MenuItem>
                            </Select>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions style={{ position: 'absolute', bottom: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Button color='success' variant='contained'>Search</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Modalpopup;



// retrive career details from datab

// import React, { useState, useEffect } from 'react';
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Select, Typography } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close'
// import './Modalpopup.css';
// import axios from 'axios'; // Import axios for making HTTP requests

// const Modalpopup = () => {
//     const [open, setOpen] = useState(false);
//     const [careerFields, setCareerFields] = useState([]);
//     const [selectedCareerField, setSelectedCareerField] = useState('');

//     useEffect(() => {
//         // Fetch career fields from backend when component mounts
//         fetchCareerFields();
//     }, []);

//     const fetchCareerFields = async () => {
//         try {
//             const response = await axios.get('http://localhost:8800/careerFields'); // Assuming you have an endpoint to fetch career fields
//             setCareerFields(response.data);
//         } catch (error) {
//             console.error('Error fetching career fields:', error);
//         }
//     };

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleCareerFieldChange = (event) => {
//         setSelectedCareerField(event.target.value);
//     };

//     const handleSearch = () => {
//         // Perform search based on selected career field
//         console.log('Search based on career field:', selectedCareerField);
//     };

//     return (
//         <div style={{ textAlign: 'center' }}>
//             <h1 style={{ fontWeight: 'bold', fontSize: '2em'}}></h1>
//             <Button onClick={handleOpen} color='primary' variant='contained'>Go</Button>
//             <Dialog fullScreen open={open} onClose={handleClose} fullWidth maxWidth='sm'>
//                 <DialogTitle style={{ backgroundColor: '#2774AE', color:'white', fontWeight: 'semi-bold', fontSize: '2em'}}>Career Details <IconButton onClick={handleClose} style={{ float: 'right', color:'white'}}><CloseIcon ></CloseIcon></IconButton></DialogTitle>
//                 <DialogContent style={{ backgroundColor: '#2774AE', color:'white',  }}>
//                     <DialogContentText>This screen is about user details</DialogContentText>
//                     <div style={{ marginBottom: '20px' }}>
//                         <Typography variant="body1">Select Career Field:</Typography>
//                         <Select
//                             value={selectedCareerField}
//                             onChange={handleCareerFieldChange}
//                             variant='outlined'
//                             style={{ width: '100%', color:'white', backgroundColor: '#606060' }}
//                         >
//                             {careerFields.map((field) => (
//                                 <MenuItem key={field} value={field}>{field}</MenuItem>
//                             ))}
//                         </Select>
//                     </div>
//                 </DialogContent>
//                 <DialogActions style={{ position: 'absolute', bottom: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//                     <Button color='success' variant='contained' onClick={handleSearch}>Search</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }

// export default Modalpopup;

