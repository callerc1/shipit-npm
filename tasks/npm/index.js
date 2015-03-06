var utils = require('shipit-utils');
/**
 * Register NPM tasks.
 * - npm
 * - npm:install
 * - npm:run
 */

module.exports = function (gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);
  require('./install')(gruntOrShipit);
  require('./run')(gruntOrShipit);

  utils.registerTask(gruntOrShipit, 'npm', [
    'npm:install'
  ]);

  shipit.on('updated', function () {
    utils.runTask(gruntOrShipit, 'npm');
  });
};
