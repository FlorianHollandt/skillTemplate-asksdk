
const _get = require('lodash.get');

module.exports = {
    process(handlerInput) {
        // console.log(`requestInterceptor.logging()`);
        
        if (
            handlerInput.requestEnvelope.session.new
        ) {
            console.log(`Handler input: ${JSON.stringify(handlerInput, null, 4)}`);
        } else {
            console.log(`Request object: ${JSON.stringify(handlerInput.requestEnvelope.request, null, 4)}`);
        }
    }
};
