# Rex-Sync NPM

Together with [Rex-Sync Redaxo](https://github.com/AndyBitz/rex-sync-redaxo) this node module will allow you to live update Templates, Modules, AddOns and Assets on your Redaxo Website.


## Quickstart

In order to start you'll need to create two files in your npm root directory.

The first one will be `rex.secrets.json`. This file will contain your credentials to your redaxo system. Make sure to add it to the projects `.gitignore` file.

Example `rex.secrets.json`:

```json
{
  "auth": "auth_key_from_rex-sync-redaxo_addon"
}
```

The next file will be a short configuration file called `rex.config.json`. It will contain paths to the specific directories. This file should be stored in your repo.

Example `rex.config.json`:

```json
{
  "website": "https://www.example.com",
  "templates": "./path/to/templates/",
  "modules": "./path/to/modules/",
  "addons": "./path/to/addons/",
  "assets": "./path/to/assets/"
}
```

Now, install the package through npm:

```bash
npm install -g rex-sync-node
```

... and start

```bash
cd my-project
rex-sync
```

Don't forget to install the [redaxo addon](https://github.com/AndyBitz/rex-sync-redaxo). 


Notes:

> The `modules` folder must look like this: `modules/My Module/output.php`, `modules/My Module/input.php`
> Everything will be identified by their name not their id.
> Files that are deleted in your `Assets` or `AddOns` folder will get deleted on the server as well.
> `Templates` and `Modules` on the other hand will stay on the server since deleting them might break your site in a more _permanant_ way.


## Start it programmatically

In case you want to add it to your existing dev script etc.

```bash
npm install --save-dev rex-sync-node
```

```js
const rex = require('rex-sync-node') // this will start a child process
rex() // this will return the child process
```


## Contribute

Feel free to open an issue or a pull request.


### Developing on `rex-sync-node`

* Create a `rex.secrets.json` file.
* Add your website to `rex.secrets.json` instead. So you won't accidentally commit it.
* Run `npm run dev`. This will enable the debug log.
