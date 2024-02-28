'use strict';
const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose'); // Erase if already required


// Declare the Schema of the Mongo model
var UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'Users',
        timestamps: true,
    },
);

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

//Export the model
module.exports = model('User', UserSchema);
