'use strict'

const ui =       require('cli-styles')
const esc =      require('ansi-escapes')
const chalk =    require('chalk')
const figures =  require('figures')
const keypress = require('keypress')



const defaults = {
	  in:      process.stdin
	, out:     process.stdout

	, values:  []
	, cursor:  0

	, done:    false
	, aborted: false
}



const MultiselectPrompt = {

	  selected: function () {
		return this.values.filter((v) => v.selected)
	}

	, reset: function () {
		this.cursor = 0
		for (let v of this.values) v.selected = false
	}

	, abort: function () {
		this.done = this.aborted = true
		this.render()
		this._end()
		this.out.write('\n')
		this._reject()
	}

	, submit: function () {
		this.done = true
		this.aborted = false
		this.render()
		this._end()
		this.out.write('\n')
		this._resolve(this.selected().map((v) => v.value))
	}



	, left: function () {
		this.values[this.cursor].selected = false
		this.render()
	}
	, right: function () {
		this.values[this.cursor].selected = true
		this.render()
	}
	, ' ': function () {
		const v = this.values[this.cursor]
		v.selected = !v.selected
		this.render()
	}

	, up: function () {
		this.cursor = --this.cursor % this.values.length
		this.render()
	}
	, down: function () {
		this.cursor = ++this.cursor % this.values.length
		this.render()
	}



	, renderValue: function (v, i) {
		return (v.selected ? chalk.green(figures.tick) : ' ')
		+ ' '
		+ (this.cursor === i ? chalk.cyan.underline(v.title) : v.title)
	}

	, render: function () {
		this.out.write(esc.eraseLines(this.values.length + 1) + [
			  ui.symbol(this.done, this.aborted)
			, chalk.bold(this.msg), ui.delimiter
		].join(' ') + '\n'
		+ this.values.map(this.renderValue.bind(this)).join('\n'))
	}
}



const multiselectPrompt = (msg, values, opt) => new Promise((resolve, reject) => {
	if ('string' !== typeof msg) throw new Error('Message must be string.')
	if (!Array.isArray(values)) throw new Error('Values must be in an array.')
	if (Array.isArray(opt) || 'object' !== typeof opt) opt = {}

	values = values.map((v) => Object.assign(Object.create(v), {
		selected: false
	}))

	let prompt = Object.assign(Object.create(MultiselectPrompt), defaults, opt)
	Object.assign(prompt, {
		  msg, values
		, _resolve:     resolve
		, _reject:      reject
	})

	const onKeypress = function (raw, key) {
		let c = ui.keypress(raw, key)
		if (prompt[c]) prompt[c]()
		else prompt.out.write(esc.beep)
	}
	keypress(prompt.in)
	prompt.in.on('keypress', onKeypress)

	const oldRawMode = prompt.in.isRaw
	prompt.in.setRawMode(true)
	prompt.out.write('\n'.repeat(prompt.values.length) + esc.cursorHide)

	prompt._end = () => {
		prompt.in.removeListener('keypress', onKeypress)
		prompt.in.setRawMode(oldRawMode)
		prompt.out.write(esc.cursorShow)
	}

	prompt.render()
})



module.exports = Object.assign(multiselectPrompt, {MultiselectPrompt})
