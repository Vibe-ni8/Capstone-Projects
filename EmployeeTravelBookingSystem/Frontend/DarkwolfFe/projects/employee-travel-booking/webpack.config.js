const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const config = withModuleFederationPlugin({

  name: 'employeeTravelBooking',

  exposes: {
    './Pages': './projects/employee-travel-booking/src/app/pages/page.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

config.output.scriptType = 'module';

module.exports = config;
