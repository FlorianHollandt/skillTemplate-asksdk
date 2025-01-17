// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.

const Alexa = require('ask-sdk-core');
const interceptor = require('./interceptors');
const config = require('./config');
const _get = require('lodash.get');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const message = handlerInput.t('welcome');
        const prompt = handlerInput.t('prompt');

        return handlerInput.responseBuilder
            .speak(`${
                message
            } ${
                prompt
            }`)
            .reprompt(prompt)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const message = handlerInput.t('help');
        const prompt = handlerInput.t('prompt');

        return handlerInput.responseBuilder
            .speak(`${
                message
            } ${
                prompt
            }`)
            .reprompt(prompt)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const goodbye = handlerInput.t('goodybe');

        return handlerInput.responseBuilder
            .speak(goodbye)
            .withShouldEndSession(true)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);

        const stack = error.stack.split('\n');
        let errorLocation = stack[1].match(/\/([a-zA-Z0-9_\-\.]+):(\d+):\d+/);
        console.log(`Error location match: ${
            JSON.stringify(errorLocation, null, 4)
        }`);

        let speakOutput = '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01"/>';
        if(
            config.debugMode
            && errorLocation
        ) {
            speakOutput =  `<lang xml:lang="en-US">${
                error.message
            } <break time='200ms'/> Check ${
                errorLocation[1]
            }, line ${
                errorLocation[2]
            }</lang>`;
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(undefined)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
    ) 
    .addRequestInterceptors(
        interceptor.requestLogging,
        interceptor.localization
    )
    .addResponseInterceptors(
        interceptor.responseLogging
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .lambda();
