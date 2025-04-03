import nodemailer from "nodemailer";
import Contact from "../models/contactModel.js";

export const sendContactMail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Save contact data in the database
        const newContact = await Contact.create({ name, email, subject, message });

        // Configure Nodemailer Transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail
                pass: process.env.EMAIL_PASS, // App Password
            }
        });

        // Email Content - Send to Admin
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL, // Send to the admin instead of user
            subject: `New Contact Form Submission: ${subject}`,
            text: `You received a new contact message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Email sent to admin successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email." });
    }
};
