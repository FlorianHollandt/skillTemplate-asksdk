
# Template Skill

This is the ASK SDK v2 template Skill of Florian Hollandt, and it contains a number of configurations that have proven useful over a number of projects.
To build with internationalization (i18n) in mind, the template supports the locales `en-US`, `en-GB` and `de-DE` from the start.

## Skill Infrastructure
This template uses the CloudFormation Deployer, with a customized template. It deploys the following resources and parameters:

- Parameter: **Project Alias** (`templateSkill`)
  - Used as prefix for the name of various resources, e.g. `templateSkill-lambda`
- Parameter: **Debug Mode** (`true`)
  - A toggle for the Skill to emit an error response that includes information from the error stack
- Parameter: **Lambda Timeout** (`3`)
  - The timeout of the Lambda function in seconds
- Parameter: **Lambda Memory Size** (`128`)
  - The memory size of the Lambda function in MB
- Parameter: **Lambda runtime** (`nodejs12.x`)
- Parameter: **Lambda handler** (`index.handler`)
- Parameter: **CloudWatch log retention** (`1`)
  - The retention period for CloudWatch logs in days
- Parameters: **SkillId**, **CodeBucket**, **CodeKey**, **CodeVersion**
  - Populated by `cfn-deployer`
- Resource: **Lambda function**
  -  Uses the `Lambda-*` parameters for configuration
  -  Uses **Debug Mode** and **Project Alias** as environment variables
- Resource: **Lambda Role**
  - A role that allows creating AWS Cloudwatch log streams for the Skill stack's log group
- Resource: **Lambda Alias**
  - Name: `dev` (a second alias `prod` can be added later)
  - Using `$LATEST` function version
- Resource: **Lambda Event Permission**
  - Allows invocation from Skill with parameter **Skill ID**
  - Specific to the `dev` alias
- Resource: **CloudWatch Log Group**
  - Creates the corresponding log group for the **Lambda Role**
  - Configured with limited log retention

## Skill Manifest & Interaction Model
The Skill package already contains some useful factors:
- Interaction models for locales `en-US`, `en-GB` and `de-DE`
- Some placeholder values for the Skills store, e.g. icon, description, sample phrases etc

##  Skill Code
The Skill code contains the following features:
- **i18next Integration**
  - Using the request interceptor `localizarion` to make localization strings available via the `handlerInput.t()` method
  - Containing sample translation assets for `de` and `en` languages
- **Logging**
  - Contains a request interceptor `requestLogging` that logs the full `handlerInput` in the first request of each session, and only the `handlerInput.requestEnvelope.request` object afterwards
  - Contains a response interceptor `responseLoggin` that logs the response text
- **Config**
  - Contains a file `config.js` for configurations, including `debugMode` that is parsed from the Lambda's environment variable `DEBUG_MODE`
- **Error handling**
  - If the `ErrorHandler` gets called and an error stack it available, the Skill will respond with the description of the error and its localtion if `debugMode` is set to `true`. Otherwise it will only emit a short negative sound.