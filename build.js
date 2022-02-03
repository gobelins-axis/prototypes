// Utils
const yargs = require('yargs');
const { exec } = require('child_process');

// Config
require('dotenv').config();

// Request options
const { name } = yargs
    .usage('Usage: --name <name>')
    .option('n', { alias: 'name', describe: 'Sketch name', type: 'string', demandOption: true })
    .argv;

const port = process.env.PORT;
const fqbn = process.env.FQBN;
const sketch = name;

const commandCompile = `arduino-cli compile --fqbn ${fqbn} ${sketch}`;
const commandUpload = `arduino-cli upload -p ${port} --fqbn ${fqbn} ${sketch}`;

exec(commandCompile, (compileError, compileResponse) => {
    if (compileError) {
        console.error(compileError);
        return;
    };

    console.log(`Compile success: ${compileResponse}`);

    exec(commandUpload, (uploadError, uploadResponse) => {
        if (uploadError) {
            console.error(uploadError);
            return;
        };

        console.log(`Upload success: ${uploadResponse}`);
    });
});