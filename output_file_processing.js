const fs = require('fs');

async function outputfileprocessing(data) {
        fileName = "output.txt"; 
    try {
        const filePath = `${process.cwd()}/${fileName}`;
        const dataString = typeof data === 'string' ? data : JSON.stringify(data);

        // Append data to the text file
        fs.appendFile(filePath, dataString + '\n', (err) => {
          if (err) {
            console.error('Error appending to file:', err);
          } else {
            console.log('Data appended to file successfully!');
          }
        });
     

    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { outputfileprocessing };
