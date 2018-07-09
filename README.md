# quick-shell.js
![npm badge](https://img.shields.io/npm/v/npm.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com) ![license badge](https://img.shields.io/packagist/l/doctrine/orm.svg)

# what is quick-shell.js ?
quick-shell is a `nodejs` lib, which you can use it to create a shell application quickly

# install
install with npm:
```
npm install quick-shell
```

# basic usage
```javascript
let shell = require('quick-shell');

shell
    .welcome('welcome to my shell program')
    .prompt('$ ')
    .listen('echo', (params) => {
        console.log(params);
    })
    .listen('add', (params) => {
        let temp = params.split(' ');
        console.log(
            (parseInt(temp[0]) + parseInt(temp[1])).toString()
        );
    })
    .start();
```

run the js file, a shell will start like this:
```
welcome to my shell program
$
```

when you input 'echo hello world':
```
welcome to my shell program
$ echo hello world
hello world
```

when you input 'add 7 9':
```
welcome to my shell program
$ add 7 9
16
```

just like this, if you want to create a shell application, just use 'listen' to create a listen relation of instruction. As the instruction was caught, its handler whick you input already will be called

# API
import:
```javascript
let shell = require('quick-shell');
```
link style call:
```javascript
shell
    .//...
    .//...
    .start();
```

set the welcome text:
```javascript
shell
    .welcome('your welcome text');
```

set the prompt text:
```javascript
shell
    .prompt('# ');
```

set the error text:
```javascript
shell
    .error({
        inputNothing: 'you input nothing',
        noMatchedInstruction: 'have no matched instruction'
    });
```

create a listen relation:
```javascript
// by the way, the params is same as 'param param param', you need to split it by yourself
shell
    .listen('echo', (params) => {
        console.log(params);
    });
```

if you want more sumtom function, set the callback:
```javascript
shell
    .onStart(() => {
        // do something on shell start
    })
    .onExit(() => {
        // do something on shell exit
    })
    .onLine((line) => {
        // do something when a line inputed
    })
    .onCaught((instruction, params) => {
        // do something when a instruction was caught
    });
```

start the shell program:
```javascript
shell
    .start();
```

# about
* author: china.nanJing.nuaa.kindem
* GitHub: [FlyAndNotDown - quick-shell](https://github.com/FlyAndNotDown/quick-shell)
