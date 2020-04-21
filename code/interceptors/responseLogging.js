
const _get = require('lodash.get');

module.exports = {
    process(handlerInput) {
        // console.log(`responseInterceptor.logging()`);
        
        console.log(`Response object: ${JSON.stringify(handlerInput.responseBuilder.getResponse(), null, 4)}`);
    }
};
