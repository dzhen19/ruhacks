module.exports = async function labelDetection(imageURL="./chair.jpg") {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
    const fs = require('fs');

    const request ={
        image: {content: fs.readFileSync(imageURL)},
    }

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;
    const res = objects.filter(object => object.score > 0.4);
    return res;
}