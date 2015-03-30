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

    utils.runTask(gruntOrShipit, 'npm:init')

    shipit.on('npm_inited', function () {
      var shipit = utils.getShipit(gruntOrShipit);
      var onEvent = shipit.config.npm.remote ? 'updated' : 'fetched';

      shipit.on(onEvent, function () {
        utils.runTask(gruntOrShipit, 'npm:install');
      });
    });

  });

};
