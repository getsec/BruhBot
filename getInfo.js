const fs = require('fs');
const soundFiles = fs.readdirSync('./assets').filter(file => file.endsWith('.mp3'));


soundFiles.forEach(i => {
    let path = `./assets/${i}`
    console.log(path)
});