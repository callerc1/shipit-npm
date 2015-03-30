# shipit-npm

A set of tasks for [Shipit](https://github.com/shipitjs/shipit) used for npm specific tasks on deploy.

Inspired by the [capistrano/composer](https://github.com/capistrano/composer/) extension.


**Features:**

- Triggered on the `updated` event from [shipit-deploy](https://github.com/shipitjs/shipit-deploy)
- Has a direct pass though task to npm cli
- Works via [shipit-cli](https://github.com/shipitjs/shipit) and [grunt-shipit](https://github.com/shipitjs/grunt-shipit)

## Install

```
npm install shipit-npm
```

## Usage

Just simply run: (This triggers the `npm` task on the deploy `updated` event. No additional config necessary.)

```
shipit staging deploy

```

Or you can run the tasks separatly :

```
shipit staging npm:init npm:install
shipit staging npm:run --cmd "update"

```


## Options `shipit.config.npm`

### `remote`

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


### Example `shipitfile.js` options usage

```js
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-npm')(shipit);

  shipit.initConfig({
    default: {
      npm: {
        remote: false,
        installArgs: ['gulp']
        installFlags: ['-g'];
      }
    }
  });
};
```

## Workflow tasks

- deploy (event)
  - npm:init
    - Emit event "npm_inited".
- npm_inited (event)
  - npm:install
    - Emit event "npm_installed"

## License

MIT
