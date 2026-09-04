const mongose = require('mongoose');

const userSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
gender: {
        type: String,
        required: true
    },
phone: {
        type: String,
        required: true
    },
role: {
        type: String,
        enum: ['Superadmin', 'Storekeeper', 'Salesperson', 'user'],
        default: 'user'
    },
    HasAdminAccess: {
        type: Boolean,
        default: false
    },
}, 
  { timestamps: true }
);

const User = mongose.model('User', userSchema);

module.exports = User;