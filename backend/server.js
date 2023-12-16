const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line for CORS support

const app = express();
const port = 5000; // Change the port as needed

// Enable CORS
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json());

// API endpoint for handling contact form submissions
app.post('/contact', async (req, res) => {
  try {
    const formDetails = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'yukiku.store',
      port: 465,
      secure: true,
      auth: {
        user: 'admin@yukiku.store',
        pass: 'LPvF[hbooWt*',
      },
    });

    // Define the email message
    const mailOptions = {
      from: 'admin@yukiku.store',
      to: 'rickyk@yukiku.store',
      subject: 'New Contact Form Submission',
      html: `
        <p>First Name: ${formDetails.firstName}</p>
        <p>Last Name: ${formDetails.lastName}</p>
        <p>Email: ${formDetails.email}</p>
        <p>Phone: ${formDetails.phone}</p>
        <p>Message: ${formDetails.message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send a success response
    res.json({ code: 200, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: 'Something went wrong, please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
