import manageContact from "../../models/Contact.js";


// Submitting Contact message
export const submitContactMessage = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            })
        }

        const newMessage = await manageContact.create({
            name,
            email,
            phone: phone || "",
            subject: subject || "General Inquery",
            message
        })

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Getting all inquiries

export const getAllContactMessages = async (req, res) => {
    try {
        const messages = await manageContact.find().sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            messages
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}