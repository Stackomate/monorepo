const ejs = require('ejs');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const warning = `/* WARNING: File Automatically Generated by EJS Template. 
Please DO NOT EDIT as it may be overwritten during build step! */\n\n`

const getPipeableTypings = (limit = 20) => {

    /* Return argument name and its type */
    let argTemplate = (n) => `f${n + 2}: Fn<${String.fromCharCode(65 + n, 65 + n + 1).split('').join(', ')}>`

    let keysArray = [...Array(limit).keys()];


    let paddingLeft = `    `;
    let genericsForType = (n) => [...Array(n + 1).keys()].map(k => String.fromCharCode(65 + k)).join(', ')    
    let genericsDef = (n) => `public run <${genericsForType(n)}>`

    let fallbackType = `${paddingLeft}public run <T, Q>(f1: FnBatcherArg<T, any>, ...args: Fn<any, any>[]) : Q;`;

    let types = keysArray.map(i => `${paddingLeft}${genericsDef(i)}(f1: FnBatcherArg<T, A>${i > 0 ? `, ` : ``}${keysArray.slice(0, i).map(j => argTemplate(j)).join(', ')}): ${String.fromCharCode(65 + i)};`).join('\n');
    
    return `${types}\n${fallbackType}\n`;
}

const getBatchPipeableTypings = (limit = 20) => {

    /* Return argument name and its type */
    let argTemplate = (n) => `f${n + 2}: Fn<${String.fromCharCode(65 + n, 65 + n + 1).split('').join(', ')}>`

    let keysArray = [...Array(limit).keys()];


    let paddingLeft = `    `;
    let genericsForType = (n) => [...Array(n + 1).keys()].map(k => String.fromCharCode(65 + k)).join(', ')    
    let genericsDef = (n) => `<Z, ${genericsForType(n)}>`

    let noFnType = `${paddingLeft}<Z>(a: Batcher<Z>) : Batcher<Z>`;
    let fallbackType = `${paddingLeft}<Z, Q>(a: Batcher<Z>, ...args: Fn<any, any>[]) : Q;`;

    let types = keysArray.map(i => `${paddingLeft}${genericsDef(i)}(a: Batcher<Z>, f1: FnBatcherArg<Z, A>${i > 0 ? `, ` : ``}${keysArray.slice(0, i).map(j => argTemplate(j)).join(', ')}): ${String.fromCharCode(65 + i)};`).join('\n');
    
    return `${noFnType}\n${types}\n${fallbackType}\n`;

}

const getApplyPipeableTypings = (limit = 20) => {

    /* Return argument name and its type */
    let argTemplate = (n) => `f${n + 2}: Fn<${String.fromCharCode(65 + n, 65 + n + 1).split('').join(', ')}>`

    let keysArray = [...Array(limit).keys()];


    let paddingLeft = `    `;
    let genericsForType = (n) => [...Array(n + 1).keys()].map(k => String.fromCharCode(65 + k)).join(', ')    
    let genericsDef = (n) => `<Z, ${genericsForType(n)}>`

    let noFnType = `${paddingLeft}<Z>(a: Z) : Z`;
    let fallbackType = `${paddingLeft}<Z, Q>(a: Z, ...args: Fn<any, any>[]) : Q;`;

    let types = keysArray.map(i => `${paddingLeft}${genericsDef(i)}(a: Z, f1: Fn<Z, A>${i > 0 ? `, ` : ``}${keysArray.slice(0, i).map(j => argTemplate(j)).join(', ')}): ${String.fromCharCode(65 + i)};`).join('\n');
    
    return `${noFnType}\n${types}\n${fallbackType}\n`;

}

glob(`**/*.ejs`, {dot: true, cwd: path.resolve(__dirname, '../src/'), absolute: true}, function (er, files) {

    if (er) return;

    files.forEach(file => {
        console.log(`Processing`, file);

        ejs.renderFile(file, {getPipeableTypings, getBatchPipeableTypings, getApplyPipeableTypings}, {}, function(err, str) {
            if(err) {
                throw new Error(err);
            }
            // str => Rendered HTML string
            let filePath = file.split('.');
            filePath.splice(-1, 1);
            filePath = filePath.join('.');
            console.log(filePath)

            let targetFolder = path.resolve(__dirname, '../src/precompile-output');

            console.log({targetFolder, filePath})

            fs.mkdir(targetFolder, { recursive: true}, function (err) {
                if (err) return cb(err);
                fs.writeFileSync(path.resolve(targetFolder, path.basename(filePath)), `${warning}${str}`);
            });
        });
    })
  })

