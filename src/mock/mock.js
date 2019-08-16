var MockAdapter = require('axios-mock-adapter');
var axios = require('axios');

export default (new MockAdapter(axios));