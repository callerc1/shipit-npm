var utils = require('shipit-utils');
var chalk = require('chalk');
var sprintf = require('sprintf-js').sprintf;
var init = require('../../lib/init');
var Bluebird = require('bluebird');

/**
 * Runs npm install
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'npm:install', task, false);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);
    shipit = init(shipit);

    function install(remote) {

      var method = remote ? 'remote' : 'local';
      var cdPath = remote ? shipit.releasePath || shipit.currentPath : shipit.config.workspace;

      if(!cdPath) {
        var msg = remote ? 'Please specify a deploy to path (shipit.config.deployTo)' : 'Please specify a workspace (shipit.config.workspace)'
        throw new Error(
          shipit.log(chalk.red(msg))
        );
      }

      var args = Array.isArray(shipit.config.npm.installArgs) ? shipit.config.npm.installArgs.join(' ') : shipit.config.npm.installArgs;
      var flags = Array.isArray(shipit.config.npm.installFlags) ? shipit.config.npm.installFlags.join(' ') : shipit.config.npm.installFlags;
      var AF = args ? flags ? args.concat(' ',flags) : args : flags ? flags : '';

      return shipit[method](
        sprintf('cd %s && npm i %s', cdPath, AF)
      );

    }

    shipit.log('Installing npm modules.');
    return install(shipit.config.npm.remote)
    .then(function () {
      shipit.log(chalk.green('npm install complete'));
    })
    .catch(function (e) {
      shipit.log(e);
    });
  }
};
