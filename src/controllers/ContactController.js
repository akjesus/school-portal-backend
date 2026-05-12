const Contact = require("../models/Contacts");
const Email = require("../utils/Email");
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.getAllContacts();
        res.status(200).json({ success: true, contacts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createContact = async (req, res) => {
    try {
        const { fullName, email, phone, subject, message } = req.body;
        if (!fullName || !email || !phone || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const contact = await Contact.create({ fullName, email, phone, subject, message });
        if (!contact) {
            return res.status(400).json({ success: false, message: "Failed to create contact" });
        }
        const sendEmail = new Email({
          name: contact.fullName,
          email: contact.email,
        });
        await sendEmail.sendContact();
        return res.status(201).json({ success: true, message: "Contact created successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
