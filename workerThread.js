const { workerData, parentPort } = require('worker_threads');
const fs = require('fs');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const mongoose = require('./mongoConnect');
const schemas = require('./mongoSchemas');

const { filePath, fileType } = workerData;
console.log(`value of filePath ${filePath} and fileType ${fileType}`)

const collections = {
  agent: schemas.Agent,
  user: schemas.User,
  account: schemas.UserAccount,
  lob: schemas.LOB,
  carrier: schemas.Carrier,
  policy: schemas.Policy,
};

const insertData = async (data, collection) => {
  const model = collections[collection];
  await model.insertMany(data);
};

if (fileType === 'csv') {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(`value of results ${JSON.stringify(results)}`);
      const dataByCollection = groupDataByCollection(results);
      console.log(`value of data ${JSON.stringify(dataByCollection)}`)
      insertDataToCollections(dataByCollection);
    });
} else if (fileType === 'xlsx') {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const dataByCollection = groupDataByCollection(data);
  insertDataToCollections(dataByCollection);
}

function groupDataByCollection(data) {
  const groupedData = {
    agent: [],
    user: [],
    account: [],
    lob: [],
    carrier: [],
    policy: [],
  };

  for (const row of data) {
    if (row.agent) {
      groupedData.agent.push(row);
    }

    if (row.email) {
      groupedData.user.push(row);
    }

    if (row.account_name) {
      groupedData.account.push(row);
    }

    if (row.category_name) {
      groupedData.lob.push(row);
    }
    if (row.company_name) {
      groupedData.carrier.push(row);
    }
    if (row.policy_number) {
      groupedData.policy.push(row);
    }
  }

  return groupedData;
}


async function insertDataToCollections(dataByCollection) {
  for (const [collection, data] of Object.entries(dataByCollection)) {
    await insertData(data, collection);
  }
  parentPort.postMessage('Data inserted successfully');
}