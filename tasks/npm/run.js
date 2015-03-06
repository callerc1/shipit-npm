var utils = require('shipit-utils');
var chalk = require('chalk');
var sprintf = require('sprintf-js').sprintf;
var init = require('../../lib/init');
var Bluebird = require('bluebird');
var argv = require('yargs').argv;

/**
 * run task allows access to any npm cli command
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'npm:run', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);
    shipit = init(shipit);

    function run(remote) {
      var method = remote ? 'remote' : 'local';
      if(!argv.cmd) return shipit.log(chalk.red('Please specify a npm command eg', chalk.gray('shipit staging npm:run', chalk.white('--cmd "update"'))));
      return shipit[method](
        sprintf('cd %s && npm %s', shipit.currentPath, argv.cmd)
      );
    }

    shipit.log('Running - npm ' + argv.cmd);
    return run(shipit.config.npm.remote)
    .then(function () {
      shipit.log(chalk.green('Complete - npm ' + argv.cmd));
    });
  }
};
