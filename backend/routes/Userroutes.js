const express = require("express")
const Users = require("../models/Users")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const bcryptjs = require("bcryptjs")
const Roles_Model = require("../models/UserRoles");
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/profileImages'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))

    }
})

const uploads = multer({ storage });


router.get("/role", async (req, res) => {

    const userRoles = await Roles_Model.find();


    return res.status(200).json(userRoles);


})


router.get('/', async (req, res) => {
    try {
        const FetchUserData = await Users.find()
        res.status(200).json(FetchUserData);

    } catch {
        res.status(400).json({ message: 'Failed to fetch events' });

    }
})

router.post("/login", async (req, res) => {
    const { Useremail, Userpassword } = req.body;
    try {
        // Check if user exists
        const userExist = await Users.findOne({ Useremail: Useremail });

        // Agar user nahi milta to error return karna hai
        if (!userExist) {
            return res.status(401).json({ error: "Credentials wrong" });
        }

        // Password comparison
        const comparePass = await bcryptjs.compare(Userpassword, userExist.Userpassword);

        // Agar password match nahi karta to error return karna hai
        if (!comparePass) {
            return res.status(401).json({ error: "Credentials wrong pass" });
        }
        console.log(userExist)

        // Token generate karna
        const token = await jwt.sign(
            { userId: userExist._id, Useremail: userExist.Useremail, Userrole: userExist.Userrole, Username: userExist.Username, Userimage: userExist.Userimage, Userpassword: userExist.Userpassword },
            'regsecret',
            { expiresIn: '30d' }

        );
        console.log(token)


        return res.status(200).json({ success: "Login Successfully", token: token });
    } catch (error) {
        console.log(error);
        // General error response
        return res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/', uploads.single('Userimage'), async (req, res) => {
    try {
        const { Username, Useremail, Userpassword, Userage, Userrole } = req.body;
        const Userimage = req.file ? req.file.filename : '';
        

        if (!Userimage) {
            return res.status(400).json({ error: "Profile image is required" });
        }

        const salt = await bcryptjs.genSalt(5);
        const encPassword = await bcryptjs.hash(Userpassword, salt);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const nameCheck = nameRegex.test(Username);
        const EmailCheck = emailRegex.test(Useremail);
        const passCheck = passwordRegex.test(Userpassword);

        if (!nameCheck) return res.status(401).json({ error: "Enter Valid Name" });
        if (!EmailCheck) return res.status(401).json({ error: "Enter Valid Email" });
        if (!passCheck) return res.status(401).json({ error: "Password must be contain at least 8 characters" });
        if (Userage < 18) return res.status(401).json({ error: "Your Age must be 18 or above" });
        if (!Userrole) return res.status(401).json({ error: "Enter Your Role" });

        const userExistingEmail = await Users.findOne({ Useremail });
        if (userExistingEmail) return res.status(400).json({ error: "Email already exists" });

        const userAdd = await Users.create({
            Username:Username,
            Useremail:Useremail,
            Userpassword: encPassword,
            Userage:Userage,
            Userrole:Userrole,
            Userimage:Userimage
        });

        return res.status(200).json({ success: "Account created successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Users.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Clear token from the cookies
        res.clearCookie('UserAuthToken');

        return res.status(200).json({ success: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting User:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});



// update route

router.put('/:id', uploads.single('Userimage'), async (req, res) => {
    try {
        const { id } = req.params;
        const { Username, Useremail, Userpassword, Userage, Userrole } = req.body;
        let updatedData = {};

        // Validate data
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (Username && !nameRegex.test(Username)) {
            return res.status(400).json({ error: "Invalid name format" });
        }

        if (Useremail && !emailRegex.test(Useremail)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (Userpassword && !passwordRegex.test(Userpassword)) {
            return res.status(400).json({ error: "Password must contain at least 8 characters, including upper/lowercase, a number, and a special character" });
        }

        if (Userage && Userage < 18) {
            return res.status(400).json({ error: "Age must be 18 or above" });
        }

        if (Userrole && !Userrole) {
            return res.status(400).json({ error: "Role is required" });
        }

        // Update the fields that are provided
        if (Username) updatedData.Username = Username;
        if (Useremail) updatedData.Useremail = Useremail;
        if (Userpassword) {
            const salt = await bcryptjs.genSalt(5);
            updatedData.Userpassword = await bcryptjs.hash(Userpassword, salt);
        }
        if (Userage) updatedData.Userage = Userage;
        if (Userrole) updatedData.Userrole = Userrole;

        // If a new profile image is provided
        if (req.file) {
            updatedData.Userimage = req.file.filename;
        }

        // Find user and update
        const updatedUser = await Users.findByIdAndUpdate(id, updatedData, { new: true });
        console.log(updatedUser)

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ success: "User updated successfully", updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: "Server error" });
    }
});



// Initialize transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use another service or SMTP server
    auth: {
        user: process.env.EMAIL_USER, // Replace with your email
        pass: process.env.EMAIL_PASS, // Replace with your email password or app password
    },
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Validate user by email
    const user = await Users.findOne({ Useremail : email });
    console.log(user)
    if (!user) return res.status(400).send('User with this email does not exist.');

    // Generate a random pin code (or token)
    const pinCode = crypto.randomBytes(3).toString('hex'); // 6-character pin
    user.resetPasswordPin = pinCode;
    // user.resetPasswordExpires = Date.now() + 3600000; // 1-hour expiration time
    await user.save();

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.Useremail,
        subject: 'Password Reset',
        text: `Your password reset pin code is: ${pinCode}`,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Pin code sent to email.');
        }
    });
});

// Verify Pin Code
router.post('/verify-pin', async (req, res) => {
    const { email, pin } = req.body;

    try {
        const user = await Users.findOne({ Useremail: email });

        // if (!user || user.resetPasswordPin !== pin || user.resetPasswordExpires < Date.now()) {
        //     return res.status(400).json({ error: 'Invalid or expired pin.' });
        // }

        return res.status(200).json({ message: 'Pin verified. You can now reset your password.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});


// Reset Password
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await Users.findOne({ Useremail: email });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        // Update user password and clear pin fields
        user.Userpassword = hashedPassword;
        user.resetPasswordPin = undefined;
        user.pinExpiration = undefined;

        await user.save();

        return res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});




module.exports = router;
