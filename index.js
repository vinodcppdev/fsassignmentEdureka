const fs = require('fs')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')


const argv = yargs(hideBin(process.argv)).argv



if (argv.file) {
    console.log(argv.file)
    //read files.json
    fs.readFile('files.json', 'utf8', function (err, data) {
        let fileNames;
        if (data) {
            filenames = JSON.parse(data);
            var fileNamesMap = filenames.names.reduce(function (result, item, index, array) {
                result[item] = item; //a, b, c
                return result;
            }, {}) //watch out the empty {}, which is passed as "result"
            console.log(fileNamesMap);
            if (fileNamesMap[argv.file]) {
                console.log("file already exists")
            }
            else {
                let data = "You are awesome.";
                fs.writeFile(argv.file, data, (err) => {
                    if (err)
                        console.log(err);
                });
                filenames.names.push(argv.file);
                console.log(filenames);
                let newFileNames = JSON.stringify(filenames);
                console.log(newFileNames);
                fs.writeFile('files.json', newFileNames, (err) => { })

            }
        }
        else {
                fileNames = new Array(1);
                fileNames[0] = argv.file;
            }
        });

} else {
    console.log('run with file name')
}