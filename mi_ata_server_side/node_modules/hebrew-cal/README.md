# hebrew-cal

[![npm version](https://badge.fury.io/js/hebrew-cal.svg)](https://badge.fury.io/js/hebrew-cal)
[![npm module downloads](http://img.shields.io/npm/dt/hebrew-cal.svg)](https://www.npmjs.org/package/hebrew-cal)
[![Build Status](https://travis-ci.org/peshitta/hebrew-cal.svg?branch=master)](https://travis-ci.org/peshitta/hebrew-cal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/peshitta/hebrew-cal/blob/master/LICENSE)
[![Dependency Status](https://david-dm.org/peshitta/hebrew-cal.svg)](https://david-dm.org/peshitta/hebrew-cal)
[![Coverage Status](https://coveralls.io/repos/github/peshitta/hebrew-cal/badge.svg?branch=master)](https://coveralls.io/github/peshitta/hebrew-cal?branch=master)
[![Gitter](https://badges.gitter.im/peshitta/peshitta.svg "Join the chat at https://gitter.im/peshitta/Lobby")](https://gitter.im/peshitta/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Convert Hebrew Ashuri to CAL code

## Installation

In order to use this library, [Node.js](https://nodejs.org) should be installed. 
Then run:
```
npm install hebrew-cal --save
```

Following bundles are available:
* `hebrew-cal.js` - UMD ES5 version for use in browser, node, etc.
* `hebrew-cal.min.js` - minified version of `hebrew-cal.js`
* `hebrew-cal.esm.js` - ES6 module version, suitable for bundling with other 
libraries and applications

The package could also be downloaded directly from:
[https://registry.npmjs.org/hebrew-cal/-/hebrew-cal-1.0.2.tgz](https://registry.npmjs.org/hebrew-cal/-/hebrew-cal-1.0.2.tgz)

## More information

[Peshitta App](https://peshitta.github.io)

[Beth Mardutho](https://sedra.bethmardutho.org/about/fonts)

[CAL](http://cal1.cn.huc.edu/searching/fullbrowser.html)

## License

[MIT](https://github.com/peshitta/hebrew-cal/blob/master/LICENSE)

## Contributing

The final goal for this work is to learn the Word of God as recorded by
[Peshitta](https://en.wikipedia.org/wiki/Peshitta).
You are welcomed to improve this implementation or provide feedback. Please
feel free to [Fork](https://help.github.com/articles/fork-a-repo/), create a
[Pull Request](https://help.github.com/articles/about-pull-requests/) or
submit [Issues](https://github.com/peshitta/hebrew-cal/issues).

To read quick updates about Peshitta app or post questions or feedback, follow
[@peshittap](https://www.twitter.com/peshittap)
at [![@peshittap](http://i.imgur.com/wWzX9uB.png "@peshittap")](https://www.twitter.com/peshittap)or
[![Gitter](https://badges.gitter.im/peshitta/peshitta.svg "Join the chat at https://gitter.im/peshitta/Lobby")](https://gitter.im/peshitta/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Development

```
npm install
```
```
npm run build
```

## API Reference

* [hebrewCal](#module_hebrewCal)
    * [.mapper](#module_hebrewCal.mapper) : <code>Mapper</code>
    * [.toCal](#module_hebrewCal.toCal) ⇒ <code>string</code>

<a name="module_hebrewCal.mapper"></a>

### hebrewCal.mapper : <code>Mapper</code>
Hebrew Mapper

**Kind**: static constant of [<code>hebrewCal</code>](#module_hebrewCal)  
<a name="module_hebrewCal.toCal"></a>

### hebrewCal.toCal ⇒ <code>string</code>
Convert from Hebrew Unicode to CAL

**Kind**: static constant of [<code>hebrewCal</code>](#module_hebrewCal)  
**Returns**: <code>string</code> - the input word converted to CAL code  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>string</code> | input word in Hebrew Unicode |

