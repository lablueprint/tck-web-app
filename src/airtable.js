// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey, endpointUrl: 'https://proxy.sequin.io/api.airtable.com' })
  .base(airtableConfig.baseKey);

export default base;
