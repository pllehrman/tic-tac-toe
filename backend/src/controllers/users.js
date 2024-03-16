const express = require('express');
const User = require('../db/models/user');
const { createCustomError } = require('../middleware/customError');
const asyncWrapper = require('../middleware/asyncWrapper');

const newUser = asyncWrapper( async (req, res) => {
    const { username }  = req.body;

    const user = await User.create(username);

    if (!user) {
        throw createCustomError(`User unable to be created with ${username} username.`, 500);
    }

    res.status(200).json({data: user});
});

module.exports = {
    newUser
}