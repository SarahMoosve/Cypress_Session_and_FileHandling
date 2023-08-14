   const cypress = require("cypress");
const { defineConfig } = require("cypress");


async function setupNodeEvents(on, config) {

  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
 
  /*on('task', {
    excelToJsonConverter(filePath)
    {
      const result = excelToJson ({
      source: fstat.readFileSync(filePath)
    })
    return result
  }
  })*/

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: "xjao74",
  defaultCommandTimeout: 20000,

  env: {
    url: "https://rahulshettyacademy.com",
   // userId: "sarah",
   // password: "123456"
  },
  retries: {
    runMode: 1,
  },

  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/UI/**/*.js'
  },
  
});
