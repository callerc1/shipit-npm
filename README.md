# shipit-npm

A set of tasks for [Shipit](https://github.com/shipitjs/shipit) used for [npm](https://docs.npmjs.com/) specific tasks on deploy.

Inspired by the [capistrano/composer](https://github.com/capistrano/composer/) extension.


**Features:**

- Triggered on the `updated` or `fetched` event from [shipit-deploy](https://github.com/shipitjs/shipit-deploy)
- Has a direct pass though task to [npm cli](https://docs.npmjs.com/cli)
- Works via [shipit-cli](https://github.com/shipitjs/shipit) and [grunt-shipit](https://github.com/shipitjs/grunt-shipit)

## Install

```
npm install shipit-npm
```

## Usage

Just simply run: (This triggers the `npm` task on the deploy `updated` or `fetched` event. No additional config necessary.)

```
shipit staging deploy

```

Or you can run the tasks separatly :

```
shipit staging npm:init npm:install
shipit staging npm:run --cmd "update"

```


## Options `shipit.config.npm`

### `npm.remote`

Type: `Boolean`
Default: `true`

A Boolean to determine whether to run the task in local workspace or on the remote.

### `npm.installArgs`

Type: `Array` or `String`
Default: []

An array or string specifying npm args passed to the [npm install](https://docs.npmjs.com/cli/install) cmd.

### `npm.installFlags`

Type: `Array` or `String`
Default: []

An array or string specifying npm flags passed to the [npm install](https://docs.npmjs.com/cli/install) cmd.

### `npm.preinstall`

Type: `Boolean`
Default: `false`

A Boolean to determine whether to emit a pre install event (`npm_preinstall`). Note: if you use this feature you will have to emit `npm_pre_install_complete` once your preinstall task is completed eg:
```js
shipit.on('npm_preinstall', function() {
  console.log('MY PRE INSTALL TASK')
  # do somthing cool
  shipit.emit('npm_pre_install_complete')
})
```


### Example `shipitfile.js` options usage

```js
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-npm')(shipit);

  shipit.initConfig({
    default: {
      npm: {
        remote: false,
        installArgs: ['gulp'],
        installFlags: ['-g']
      }
    }
  });
};
```

## Workflow tasks

- npm
  - npm:init
      - Emit event "npm_inited".
  - npm:install
    - Runs npm install (with any Args `npm.installArgs` or Flags `npm.installFlags` defined in options)
    - Emit event "npm_installed"
  - npm:run
      - Runs npm command.

##### Event flow:

- on Event "deploy" (shipit-deploy initialized)
  - Runs *npm:init*
  - on Event "npm_inited"
    - Runs *npm:preinstall* or *npm:install* (Triggered on the `updated` or `fetched` event from [shipit-deploy](https://github.com/shipitjs/shipit-deploy))
- on Event "npm_pre_install_complete"
  - npm:install

## License

MIT
