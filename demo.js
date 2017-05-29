'use strict'

const multiselectPrompt = require('./index')



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

multiselectPrompt('Which colors do you like?', colors)
// .on('data', (data) => console.log('Changed to', selected(data.value)))
.on('abort', (items) => console.log('Aborted with', selected(items)))
.on('submit', (items) => console.log('Submitted with', selected(items)))
