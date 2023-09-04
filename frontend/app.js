// app.js
const express = require('express');
const axios = require('axios');
const airtableConfig = require('./airtableConfig');
const app = express();

app.set('view engine', 'ejs');

// Define a route to fetch dropdown options from Airtable
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${airtableConfig.baseId}/${airtableConfig.tableName}`,
      {
        headers: {
          Authorization: `Bearer ${airtableConfig.apiKey}`,
        },
      }
    );
    const records = response.data.records;
    // Extract dropdown options from records
    const dropdownOptions = records.map((record) => record.fields.YOUR_FIELD_NAME);
    res.render('index', { dropdownOptions });
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    res.status(500).send('Error fetching data from Airtable.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
