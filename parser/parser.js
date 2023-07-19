const fs = require('fs');

const filePath = './data/data.json';


fs.readFile(filePath, 'utf8', (error, data) =>{
    if (error) {
        return error
    }
    else{
        return data
    }
});

