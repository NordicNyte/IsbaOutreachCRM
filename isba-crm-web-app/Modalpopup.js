import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Select, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { useState } from "react";
import { Stack } from "react-bootstrap";
import './Modalpopup.css';


const Modalpopup = () => {
    const [open, openchange] = useState(false);
    const [careerField, setCareerField] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [helpWith, setHelpWith] = useState('');

    const functionopenpopup = () => {
        openchange(true);
    }

    const closepopup = () => {
        openchange(false);
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '2em'}}>Search Career Details</h1>
            <Button onClick={functionopenpopup} color='primary' variant='contained'>Open Popup</Button>
            <Dialog fullScreen open={open} onClose={closepopup} fullWidth maxWidth='sm'>
                <DialogTitle style={{ backgroundColor: '#2774AE', color:'white', fontWeight: 'semi-bold', fontSize: '2em'}}>Career Details <IconButton onClick={closepopup} style={{ float: 'right', color:'white'}}><CloseIcon ></CloseIcon></IconButton></DialogTitle>
                <DialogContent style={{ backgroundColor: '#2774AE', color:'white',  }}>
                    <DialogContentText>This screen is about user details</DialogContentText>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={{ marginRight: '20px', width: '30%' }}>
                            <Typography variant="body1">Career Field: {careerField}</Typography>
                            <Select
                                value={careerField}
                                onChange={(e) => setCareerField(e.target.value)}
                                variant='outlined'
                                label='Career Fields'
                                style={{ width: '100%', color:'white', backgroundColor: '#606060' }}
                            >
                                <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                                <MenuItem value="Data Scientist">Data Scientist</MenuItem>
                                <MenuItem value="UX/UI Designer">UX/UI Designer</MenuItem>
                            </Select>
                        </div>
                        <div style={{ marginRight: '20px', width: '30%' }}>
                            <Typography variant="body1">Job Title: {jobTitle}</Typography>
                            <Select
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                variant='outlined'
                                label='Job Title'
                                style={{ width: '100%', color:'white', backgroundColor: '#606060' }}
                            >
                                <MenuItem value="Software Developer">Software Developer</MenuItem>
                                <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                                <MenuItem value="Graphic Designer">Graphic Designer</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '30%' }}>
                            <Typography variant="body1">Years of Experience: {experience}</Typography>
                            <Select
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                variant='outlined'
                                label='Years of Experience'
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
                            <Typography variant="body1">Location: {location}</Typography>
                            <Select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                variant='outlined'
                                label='Location'
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





// import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close'
// import { useState } from "react";
// import { Stack } from "react-bootstrap";
// import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

// const Modalpopup = () => {
//     const [open,openchange]=useState(false);
//     const functionopenpopup=()=>{
//         openchange(true);
//     }
//     const closepopup=()=>{
//         openchange(false);
//     }
//     return (
//         <div style={{textAlign:'center'}}>
//             <h1>MUI - Dialog</h1>
//             <Button onClick={functionopenpopup} color='primary' variant='contained'>Open Popup</Button>
//             <Dialog fullScreen open={open} onClose={closepopup} fullWidth maxWidth='sm'>
//                 <DialogTitle>Career Details <IconButton onClick={closepopup} style={{float: 'right'}}><CloseIcon color='primary'></CloseIcon></IconButton></DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>This screen is about user details</DialogContentText>
//                     <Stack spacing={4} margin={2}>
//                         <TextField variant='outlined' label='Career Fields'></TextField>
//                         <TextField variant='outlined' label='Job Title'></TextField>
//                         <TextField variant='outlined' label='Years of Experience'></TextField>
//                         <TextField variant='outlined' label='Location'></TextField>
//                         <TextField variant='outlined' label='Can help with:'></TextField>
//                     </Stack>
//                 </DialogContent>
//                 <DialogActions style={{ position: 'absolute', bottom: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//                     <Button color='success' variant='contained'>Search</Button>
//                     {/* <Button onClick={closepopup} color='error' variant='contained'>Close</Button> */}
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );


// }


// export default Modalpopup;

