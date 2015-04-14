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
  require('./preinstall')(gruntOrShipit);
  require('./install')(gruntOrShipit);
  require('./cmd')(gruntOrShipit);

  utils.registerTask(gruntOrShipit, 'npm:run', [
    'npm:init',
    'npm:cmd'
  ]);


  shipit.on('deploy', function () {

    utils.runTask(gruntOrShipit, 'npm:init')

    shipit.on('npm_inited', function () {
      var shipit = utils.getShipit(gruntOrShipit);
      var onEvent = shipit.config.npm.remote ? 'updated' : 'fetched';
      var task = shipit.config.npm.preinstall ? 'npm:preinstall': 'npm:install';

      shipit.on(onEvent, function () {
        utils.runTask(gruntOrShipit, task);
      });
    });

  });

  shipit.on('npm_pre_install_complete', function () {
    utils.runTask(gruntOrShipit, 'npm:install');
  });

};
