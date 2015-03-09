var utils = require('shipit-utils');
var init = require('../../lib/init');

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
  ], false);

  shipit.on('deploy', function () {

    shipit = init(shipit);

    var onEvent = shipit.config.npm.remote ? 'updated' : 'fetched';

    shipit.on(onEvent, function () {
      utils.runTask(gruntOrShipit, 'npm');
    });

  });

};
