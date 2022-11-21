const { exec } = require("child_process");
const fs = require('fs')
const mv = require("mv");

const myArgs = process.argv.slice(2);
const block_name = myArgs[0];
const block_type = myArgs[1];
const relative_path = 'blocks/' + block_name;

if(fs.existsSync(relative_path)){
    console.log('the block exists already');
} else {
    const block_package = get_block_package(block_name);
    exec(`npx @wordpress/create-block ${block_name} ${block_type === 'dynamic' ? '--variant dynamic' : ''} --no-plugin`, (error, stdout, stderr) => {

        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        const mv = require('mv');
        const destination = relative_path + '/src';
        mv(block_name, destination, {mkdirp: true}, function(err) {
            const filename = relative_path + '/package.json';
            fs.writeFile(filename, JSON.stringify(block_package, null, 2), 'utf8', (error) => {
                if(error !== null){
                    console.log('error from write file: ' + error);
                }
            });
        });

    });

}

function get_block_package(block_name){
    return {
        "name": block_name,
        "description": "Gutenberg block " + block_name,
        "main": "build/index.js",
        "scripts": {
            "build": "wp-scripts build",
            "format": "wp-scripts format",
            "lint:css": "wp-scripts lint-style",
            "lint:js": "wp-scripts lint-js",
            "packages-update": "wp-scripts packages-update",
            "plugin-zip": "wp-scripts plugin-zip",
            "start": "wp-scripts start"
        },
        "devDependencies": {
            "@wordpress/scripts": "^24.5.0",
            "parent-module": "^3.0.0"
        },
        "dependencies": {
            "@wordpress/block-editor": "^10.4.0",
            "@wordpress/element": "^4.19.0",
            "async": "^3.2.4",
            "caller-path": "^4.0.0",
            "del": "^7.0.0"
        }
    }
}