const fs = require('fs');
const {exec} = require("child_process");
const mv = require("mv");

const home = process.cwd();
const directory = 'blocks';

fs.readdir(directory, async (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    for (const file of files) {
        const destination = directory + '/' + file;

        process.chdir(directory + '/' + file);

        await exec(`npm run build`, (error, stdout, stderr) => {

            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        });

        process.chdir(home);

    }

});