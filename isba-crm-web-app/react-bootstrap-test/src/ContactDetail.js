import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContactDetail.css'; // Ensure CSS is correctly imported

const ContactDetail = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const [contactDetails, setContactDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(`Attempting to fetch details for contact ID: ${contactId}`);
        const fetchContactDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/contact/${contactId}`);
                console.log("Data fetched successfully:", response.data);
                setContactDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch contact details:', error);
                setError(error);
                setLoading(false);
            }
        };
    
        fetchContactDetails();
    }, [contactId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data. Please try refreshing the page.</div>;
    }

    if (!contactDetails) {
        console.log("No data received. Possible empty response or 404 error.");
        return <div>No contact details available. It's possible the contact does not exist.</div>;
    }

    return (
        <div className="outer-wrapper">
            <div className="inner-wrapper">
                <h1>Contact Details</h1>
                {contactDetails && (
                    <>
                        <p><strong>Name:</strong> {contactDetails['First Name']} {contactDetails['Last Name']}</p>
                        <p><strong>Contact ID:</strong> {contactDetails['Contact Id']}</p>
                        <p><strong>LinkedIn:</strong> <a href={contactDetails.LinkedInUrl} target="_blank" rel="noopener noreferrer">{contactDetails.LinkedInUrl}</a></p>
                        <p><strong>Country:</strong> {contactDetails.Country}</p>
                        <p><strong>City:</strong> {contactDetails.City}</p>
                        <p><strong>Date Added:</strong> {new Date(contactDetails['Date Contact Added to Database']).toLocaleDateString()}</p>
                        <p><strong>Date Updated:</strong> {new Date(contactDetails['Date Contact Updated']).toLocaleDateString()}</p>
                        <p><strong>College:</strong> {contactDetails['College Studied At']}</p>
                        <p><strong>Field of Study:</strong> {contactDetails['Field of Study']}</p>
                        <p><strong>Degree Type:</strong> {contactDetails['Degree Type']}</p>
                        <p><strong>Graduated:</strong> {contactDetails['Year Graduated']}</p>
                        <p><strong>Email:</strong> {contactDetails['Primary Email']}</p>
                    </>
                )}
                <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
            </div>
        </div>
    );
    
};

export default ContactDetail;
