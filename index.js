const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('./sample.pdf');

pdf(dataBuffer).then(function(data) {
  let splitted = data.text.split('CategoryTransaction Type');
  splitted.splice(0, 1);
  let text = splitted.join('CategoryTransaction Type');
  let lines = text.split("Disclaimer")[0].split('\n');
  let report = [];
  let isOnItem = false;
  let currentItem = {};
  let currentItemFieldNumber = 0;
  for (let i in lines) {
    if (isOnItem) {
      switch (currentItemFieldNumber) {
        case 1:
          currentItem.time = lines[i].trim();
          currentItemFieldNumber++;
          break;
        case 2:
          currentItem.entityName = lines[i].trim();
          currentItemFieldNumber++;
          break;
        case 3:
          if (lines[i].trim().indexOf(' | ') < 0) {
            currentItem.entityDetail = lines[i].trim();
          }
          currentItemFieldNumber++;
          break;
        case 4:
          currentItem.transactionNumber = lines[i].trim().split(' | ')[0];
          currentItem.transactionType = lines[i].trim().split(' | ')[1];
          currentItemFieldNumber++;
          break;
        case 5:
          if (lines[i].trim().split(' ')[0] === '-') {
            currentItem.mutationType = 'credit';
          } else if (lines[i].trim().split(' ')[0] === '+') {
            currentItem.mutationType = 'debit';
          }
          currentItem.amount = lines[i].trim().split(' ')[1];
          isOnItem = false;
          currentItemFieldNumber = 0;
          console.log(currentItem);
          report.push(currentItem);
          currentItem = {};
          break;
      }
    } else {
      let isError = false;
      let date;
      let dateString;
      try {
        date = new Date(lines[i]);
        dateString = date.toString();
      } catch (e) {
        isError = true;
      }
      if (!isError && dateString != 'Invalid Date') {
        isOnItem = true;
        currentItem.date = date;
        currentItemFieldNumber = 1;
      }
    }
  }
  console.log(report);
});
