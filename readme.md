# multiselect-prompt

**A prompt to select zero or more items.**

[![asciicast](https://asciinema.org/a/41496.png)](https://asciinema.org/a/41496)

[![npm version](https://img.shields.io/npm/v/multiselect-prompt.svg)](https://www.npmjs.com/package/multiselect-prompt)
[![dependency status](https://img.shields.io/david/derhuerst/multiselect-prompt.svg)](https://david-dm.org/derhuerst/multiselect-prompt#info=dependencies)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/multiselect-prompt.svg)](https://david-dm.org/derhuerst/multiselect-prompt#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/multiselect-prompt.svg)

*multiselect-prompt* uses [*cli-styles*](https://github.com/derhuerst/cli-styles) to have a look & feel consistent with other prompts.


## Installing

```
npm install multiselect-prompt
```


## Usage

```js
const prompt = require('multiselect-prompt')

const colors = [
	{title: 'red',    value: '#f00'},
	{title: 'yellow', value: '#ff0'},
	{title: 'green',  value: '#0f0'},
	{title: 'blue',   value: '#00f', selected: true},
	{title: 'black',  value: '#000'},
	{title: 'white',  value: '#fff'}
]

prompt('Which colors do you like?', colors)
.on('abort', (e) => console.log('Interim value', e.value))
.on('abort', (v) => console.log('Aborted with', v))
.on('submit', (v) => console.log('Submitted with', v))
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/multiselect-prompt/issues).
