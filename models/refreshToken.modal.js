'use strict';
const { Schema, model } = require('mongoose'); 
var RefreshTokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
        }
    },
    {
        collection: 'RefreshTokens',
        timestamps: true,
    },
);

// Export the model
module.exports = model('RefreshToken', RefreshTokenSchema);
