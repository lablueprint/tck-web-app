// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
  endpointUrl: process.env.REACT_APP_AIRTABLE_ENDPOINT_URL,
};

const base = new Airtable({
  apiKey: airtableConfig.apiKey,
  endpointUrl: airtableConfig.endpointUrl,
})
  .base(airtableConfig.baseKey);

export default base;
