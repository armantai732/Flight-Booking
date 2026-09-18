import { Contact } from "../model/contactModel.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation (optional check if all fields are passed)
    // if (!name || !email || !subject || !message) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required"
    //   });
    // }

    // Direct save without checking existing contacts
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    return res.status(201).json({
      success: true,
      message: "Contact request submitted successfully",
      data: newContact
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};