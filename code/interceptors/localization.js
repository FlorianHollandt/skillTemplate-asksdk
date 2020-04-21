
const i18n = require('i18next');

const translationStrings = require('./../i18n');

module.exports = {
    process(handlerInput) {
        // console.log(`requestInterceptor.localization()`);
        i18n.init(
            {
                lng: handlerInput.requestEnvelope.request.locale,
                resources: translationStrings,
                returnObjects: true,
            }
        ).then(
            (t) => {
                // handlerInput.t = (...args) => t(...args);
                handlerInput.t = (key, parameters={}) => {
                    // console.log(`I18n key: ${JSON.stringify(key, null, 4)}`);
                    // console.log(`I18n params: ${JSON.stringify(parameters, null, 4)}`);
                    const target = t(key, parameters);
                    // console.log(`Target: ${JSON.stringify(target, null, 4)}`);
                    const value = Array.isArray(target) 
                        ? target[Math.floor(Math.random() * target.length)]
                        : target;
                    // console.log(`Value: ${JSON.stringify(value, null, 4)}`);
                    return value;
                };
            }
        );
    }
};
