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
        refreshToken: { type: String }
    },
    {
        collection: 'Users',
        timestamps: true,
    },
);


UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});
//Export the model
module.exports = model('User', UserSchema);
