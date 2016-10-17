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

const selected = (items) => items
	.filter((item) => item.selected)
	.map((item) => item.value)

// All these options are optional
const opts = {
	cursor: 1,     // Initial position of the cursor, defaults to 0 (first entry)
	maxChoices: 3, // Maximum number of selectable options (defaults to Infinity)
	// The message to display as hint if enabled, below is the default value
	hint: '– Space to select. Return to submit.'
}

prompt('Which colors do you like?', colors, opts)
.on('data', (data) => console.log('Changed to', selected(data.value)))
.on('abort', (items) => console.log('Aborted with', selected(items)))
.on('submit', (items) => console.log('Submitted with', selected(items)))
```


## Related

- [`date-prompt`](https://github.com/derhuerst/date-prompt)
- [`number-prompt`](https://github.com/derhuerst/number-prompt)
- [`select-prompt`](https://github.com/derhuerst/select-prompt)
- [`text-prompt`](https://github.com/derhuerst/text-prompt)


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/multiselect-prompt/issues).
