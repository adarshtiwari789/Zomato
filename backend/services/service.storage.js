// Load .env as early as possible when this module is required
require('dotenv').config();

const ImageKit = require('imagekit');

// Standardize environment variable names and use them here.
// Use IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT in your .env
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
const privateKey = "private_iRlIq0sHaT2zId8XJUo6qzA7SH4=";
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

const image = new ImageKit({
    publicKey: publicKey,
    privateKey: privateKey,
    urlEndpoint: urlEndpoint
});

module.exports = image;



