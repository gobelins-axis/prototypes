// Utils
const fs = require('fs');
const yargs = require('yargs');
const md5 = require('md5');
const { exec } = require('child_process');

// Config
require('dotenv').config();

// Request options
const options = yargs
    .usage('Usage: --name <name>')
    .option('n', { alias: 'name', describe: 'Sketch name', type: 'string', demandOption: true })
    .option('w', { alias: 'watch', describe: 'Watch file changes', type: 'bool', demandOption: false })
    .argv;

const port = process.env.PORT;
const fqbn = process.env.FQBN;
const sketch = options.name;
const sketchPath = `./${sketch}/${sketch}.ino`;

const commandCompile = `arduino-cli compile --fqbn ${fqbn} ${sketch}`;
const commandUpload = `arduino-cli upload -p ${port} --fqbn ${fqbn} ${sketch}`;

let sketchContent = md5(fs.readFileSync(sketchPath));
let allowCompile = true;

function setup() {
    compileAndUpload();

    if (options.watch) watch();
}   

function watch() {
    console.log('Waiting for changes...');
    fs.watch(sketchPath, fileChangeHandler);
}

function fileChangeHandler(event, filename) {
    if (!allowCompile || !filename || event !=='change') return;

    const newSketchContent = md5(fs.readFileSync(sketchPath));

    // Check if file content is newer to prevent 
    // compiling on save but no changes
    if (newSketchContent !== sketchContent) {
        compileAndUpload();
    }
    
    sketchContent = newSketchContent;
}

function compileAndUpload() {
    if (!allowCompile) return;

    console.log('⏳ Compiling...');
    
    exec(commandCompile, (compileError, compileResponse) => {

        if (compileError) {
            console.error('❌ Compiling Failed');
            console.error(compileError);
            return;
        };
    
        console.log(`✅ Compile success`);
        console.log(compileResponse);

        console.log('⏳ Uploading...');
    
        exec(commandUpload, (uploadError, uploadResponse) => {

            if (uploadError) {
                console.error('❌ Uploading Failed');
                console.error(uploadError);
                return;
            };

            allowCompile = true;
    
            console.log(`✅ Upload success!`);
            console.log(uploadResponse);
        });
    });
}

setup();