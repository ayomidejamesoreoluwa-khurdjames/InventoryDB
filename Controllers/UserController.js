const User = require('../Models/Users');
const bcrypt = require('bcryptjs');

// console.log("Product model:", Product);

exports.createUser = async (req, res) => {
    try {

          const { name, email, password, gender, phone, role, HasAdminAccess } = req.body;

        if (!req.body.name || !req.body.email || !req.body.password || !req.body.gender || !req.body.phone || !req.body.role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        return res.status(400).json({ message: "Email Already Exists" });
    }

    const existingPhone = await User.findOne({ phone: req.body.phone });

    if (existingPhone) {
        return res.status(400).json({ message: "Phone Number Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


        const newUser = new User({ 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            phone: req.body.phone,
            role: req.body.role || 'user',
            HasAdminAccess: req.body.HasAdminAccess || false
        });

        await newUser.save();
        res.status(200).json({ message: 'User Created Successfully', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error Creating User', error: error.message });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status(400).json({ message: 'PLease provide all required fields' });
        }

        const foundUser = await User.findOne ({ email });
        if ( !foundUser )
            return res.status(404).json({ message: 'User not found' });

    


    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid Password' });
    }


    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: newUser._id, name: newUser.name, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login Successful', token });
} catch (error)  {
    res.status(500).json({ message: 'Error Logging In', error: error.message });
}};

