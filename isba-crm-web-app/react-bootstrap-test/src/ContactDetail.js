import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContactDetail.css';

const ContactDetail = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [contactDetails, setContactDetails] = useState(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/contact/${contactId}`);
        console.log("Fetched data:", response.data);  // Detailed log of the fetched data
        setContactDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch contact details:', error);
      }
    };

    fetchContactDetails();
  }, [contactId]);

  if (!contactDetails) return <div>Loading...</div>;

  return (
    <div className="outer-wrapper">
      <div className="inner-wrapper">
        <h1>Contact Details</h1>
        {contactDetails ? (
          <>
            <p><strong>Name:</strong> {contactDetails.First} {contactDetails.Last}</p>
            <p><strong>Contact ID:</strong> {contactDetails.ContactID}</p>
            <p><strong>LinkedIn:</strong> {contactDetails.LinkedInUrl}</p>
            <p><strong>Country:</strong> {contactDetails.Country}</p>
            <p><strong>City:</strong> {contactDetails.City}</p>
            <p><strong>Date Added:</strong> {contactDetails.CreateDate}</p>
            <p><strong>Date Updated:</strong> {contactDetails.UpdateDate}</p>
            <p><strong>College:</strong> {contactDetails.institute}</p>
            <p><strong>Field of Study:</strong> {contactDetails.FieldOfStudy}</p>
            <p><strong>Degree Type:</strong> {contactDetails.TypeofDegree}</p>
            <p><strong>Graduated:</strong> {contactDetails.GraduationYear}</p>
            <p><strong>Email:</strong> {contactDetails.Email1}</p> </>
        ) : (
          <p>No contact details available.</p>
        )}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
    </div>
  );
};

export default ContactDetail;
