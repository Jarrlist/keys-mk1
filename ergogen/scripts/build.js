const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = 'output';
const INPUT_FILE = 'input.yaml';

function runCommand(command) {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        process.exit(1);
    }
}

function findFiles(dir, extension, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            findFiles(filePath, extension, fileList);
        } else if (path.extname(file) === extension) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

console.log('--- Running Ergogen ---');
// Using local ergogen executable
runCommand(`npx ergogen ${INPUT_FILE} -o ${OUTPUT_DIR}`);

console.log('\n--- Converting JSCAD to STL ---');
const jscadFiles = findFiles(OUTPUT_DIR, '.jscad');

const INJECTION_HEADER = `
const jscadApi = require('@jscad/csg/api');
const { CSG, CAG } = jscadApi.csg;
const { translate, rotate, scale, mirror, hull, chain_hull, expand, contract } = jscadApi.transformations;
const { union, difference, intersection } = jscadApi.booleanOps;
const { linear_extrude, rectangular_extrude, rotate_extrude } = jscadApi.extrusions;
const { circle, square, polygon } = jscadApi.primitives2d;
const { cube, sphere, cylinder, polyhedron, torus } = jscadApi.primitives3d;
const { sin, cos, tan, asin, acos, atan, atan2, ceil, floor, abs, min, max, r2d, d2r, sqrt, pow, log, sign } = jscadApi.maths;
`;

if (jscadFiles.length === 0) {
    console.log('No .jscad files found to convert.');
} else {
    jscadFiles.forEach(file => {
        const outputFile = file.replace('.jscad', '.stl');
        console.log(`Converting ${file} -> ${outputFile}`);
        
        // Prepare file for JSCAD CLI (ensure API available and module.exports exists)
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Inject require if missing
        if (!content.includes("require('@jscad/csg/api')")) {
             console.log('  -> Injecting JSCAD API shim');
             content = INJECTION_HEADER + content;
             modified = true;
        }

        // Inject export if missing
        if (!content.includes('module.exports')) {
            console.log('  -> Appending module.exports');
            content += '\nmodule.exports = { main };\n';
            modified = true;
        }
        
        if (modified) {
             fs.writeFileSync(file, content);
        }

        // Using local jscad CLI (v1)
        runCommand(`npx @jscad/cli "${file}" -of stla -o "${outputFile}"`);

        // Remove the original .jscad file
        try {
            fs.unlinkSync(file);
            console.log(`  -> Removed ${file}`);
        } catch (err) {
            console.error(`  -> Failed to remove ${file}: ${err.message}`);
        }
    });
}

console.log('\n--- Build Complete ---');
