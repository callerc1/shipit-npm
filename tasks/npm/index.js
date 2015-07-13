var utils = require('shipit-utils');

/**
 * Register NPM tasks.
 * - npm
 * - npm:install
 * - npm:run
 */

module.exports = function (gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);

  require('./init')(gruntOrShipit);
  require('./install')(gruntOrShipit);
  require('./cmd')(gruntOrShipit);

  utils.registerTask(gruntOrShipit, 'npm:run', [
    'npm:init',
    'npm:cmd'
  ]);

  shipit.on('deploy', function () {
    shipit.start('npm:init');

    shipit.on('npm_inited', function () {
      if (shipit.config.npm.triggerEvent) {
        shipit.on(shipit.config.npm.triggerEvent, function () {
          shipit.start('npm:install');
        });
      }
    });

  });
};
