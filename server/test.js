//please ignore this file. It is used for testing purpose
const labelDetection =  require("./vision.js");

async function main(){
    console.log(await labelDetection());
    // labels.forEach(label => {
    //     console.log(label.description);
    // });
};

main(...process.argv.slice(2));
