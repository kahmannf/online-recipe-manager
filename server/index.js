'use strict';
const app = require('./app');
const config = require('./config');
require('./email');

app.listen(config.server.port, () => {
    console.log(`Server running on Port ${config.server.port}`);
});
