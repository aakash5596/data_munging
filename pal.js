
 const fs = require('fs');
  const readline = require('readline');
  const stream = require('stream');
function funct() {
 

  const file = ['./India2011.csv', './IndiaSC2011.csv', './IndiaST2011.csv'];
  let header = [];
  const dict = {};
  const data = {};
  let fileRead = 0;
  const arr = [];
  const arr1 = [];
  const ostream = fs.createWriteStream('plot1.json');
  const ostream1 = fs.createWriteStream('plot2.json');


  for (let fileindex = 0; fileindex < 3; fileindex += 1) {
    let i = 0;
    const instream = fs.createReadStream(file[fileindex]);

    const outstream = new stream();
    const rl = readline.createInterface(instream, outstream);
    rl.on('line', (line) => {
      let row = [];
      // console.log(line);
      if (i === 0) {
        header = line.toString().split(',');
        // console.log(colname[0]);

        i += 1;
      } else {
        row = line.toString().split(',');


        if (row[4] === 'Total' && row[5] !== 'All ages' && row[5] !== '0-6' && row[5] !== 'Age not stated') {
          if (row[5] in dict) {
            dict[row[5]] += parseInt(row[12], 10);
          } else {
            dict[row[5]] = parseInt(row[12], 10);
          }
        }


        if (row[4] === 'Total' && row[5] !== 'All ages' && row[5] !== '0-6' && row[5] !== 'Age not stated') {
          if (header[15] in data) {
            data[header[15]] += parseInt(row[15], 10);
          } else {
            data[header[15]] = parseInt(row[15], 10);
          }
          if (header[18] in data) {
            data[header[18]] += parseInt(row[18], 10);
          } else {
            data[header[18]] = parseInt(row[18], 10);
          }
          if (header[21] in data) {
            data[header[21]] += parseInt(row[21], 10);
          } else {
            data[header[21]] = parseInt(row[21], 10);
          }
          if (header[24] in data) {
            data[header[24]] += parseInt(row[24], 10);
          } else {
            data[header[24]] = parseInt(row[24], 10);
          }
          if (header[27] in data) {
            data[header[27]] += parseInt(row[27], 10);
          } else {
            data[header[27]] = parseInt(row[27], 10);
          }
          if (header[30] in data) {
            data[header[30]] += parseInt(row[30], 10);
          } else {
            data[header[30]] = parseInt(row[30], 10);
          }
          if (header[33] in data) {
            data[header[33]] += parseInt(row[33], 10);
          } else {
            data[header[33]] = parseInt(row[33], 10);
          }
          if (header[36] in data) {
            data[header[36]] += parseInt(row[36], 10);
          } else {
            data[header[36]] = parseInt(row[36], 10);
          }
          if (header[39] in data) {
            data[header[39]] += parseInt(row[39], 10);
          } else {
            data[header[39]] = parseInt(row[39], 10);
          }
        }
      }
    // process line here
    });
    function write1() {
    // var i=0;
      for (const key in dict) {
        arr.push({ age_group: key, number: dict[key] });
      // arr[i]["number"] = dict[key];
      // i++;
      }
      return arr;
    }
    function write2() {
    // var i=0;
      for (const key in data) {
        arr1.push({ Education: key, number: data[key] });
      // arr[i]["number"] = dict[key];
      // i++;
      }
      return arr1;
    }

    rl.on('close', () => {
      fileRead += 1;

      if (fileRead === 3) {
        const a = write1();
        const b = write2();
        const x = JSON.stringify(a);
        const y = JSON.stringify(b);
        /* Create first file to plot for i.e agegroup versus number of literate persons */

        ostream.write(x);
        ostream1.write(y);
      }
    });
  }
}
funct();
