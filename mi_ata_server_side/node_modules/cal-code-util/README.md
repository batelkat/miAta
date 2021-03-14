# cal-code-util

[![npm version](https://badge.fury.io/js/cal-code-util.svg)](https://badge.fury.io/js/cal-code-util)
[![npm module downloads](http://img.shields.io/npm/dt/cal-code-util.svg)](https://www.npmjs.org/package/cal-code-util)
[![Build Status](https://travis-ci.org/peshitta/cal-code-util.svg?branch=master)](https://travis-ci.org/peshitta/cal-code-util)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/peshitta/cal-code-util/blob/master/LICENSE)
[![Dependency Status](https://david-dm.org/peshitta/cal-code-util.svg)](https://david-dm.org/peshitta/cal-code-util)
[![Coverage Status](https://coveralls.io/repos/github/peshitta/cal-code-util/badge.svg?branch=master)](https://coveralls.io/github/peshitta/cal-code-util?branch=master)
[![Gitter](https://badges.gitter.im/peshitta/peshitta.svg "Join the chat at https://gitter.im/peshitta/Lobby")](https://gitter.im/peshitta/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Aramaic CAL code transliteration utilities

## Installation

In order to use this library, [Node.js](https://nodejs.org) should be installed. 
Then run:
```
npm install cal-code-util --save
```

Following bundles are available:
* `cal-code-util.js` - UMD ES5 version for use in browser, node, etc.
* `cal-code-util.min.js` - minified version of `cal-code-util.js`
* `cal-code-util.esm.js` - ES6 module version, suitable for bundling with other 
libraries and applications

The package could also be downloaded directly from:
[https://registry.npmjs.org/cal-code-util/-/cal-code-util-1.1.7.tgz](https://registry.npmjs.org/cal-code-util/-/cal-code-util-1.1.7.tgz)

## More information

[Peshitta App](https://peshitta.github.io)

[Beth Mardutho](https://sedra.bethmardutho.org/about/fonts)

[CAL](http://cal1.cn.huc.edu/searching/fullbrowser.html)

## License

[MIT](https://github.com/peshitta/cal-code-util/blob/master/LICENSE)

## Contributing

The final goal for this work is to learn the Word of God as recorded by
[Peshitta](https://en.wikipedia.org/wiki/Peshitta).
You are welcomed to improve this implementation or provide feedback. Please
feel free to [Fork](https://help.github.com/articles/fork-a-repo/), create a
[Pull Request](https://help.github.com/articles/about-pull-requests/) or
submit [Issues](https://github.com/peshitta/cal-code-util/issues).

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

* [calCodeUtil](#module_calCodeUtil)
    * [.consonantsByName](#module_calCodeUtil.consonantsByName) : <code>Object.&lt;string, string&gt;</code>
    * [.consonants](#module_calCodeUtil.consonants) : <code>Array.&lt;string&gt;</code>
    * [.extraConsonants](#module_calCodeUtil.extraConsonants) : <code>Array.&lt;string&gt;</code>
    * [.allConsonants](#module_calCodeUtil.allConsonants) : <code>Array.&lt;string&gt;</code>
    * [.vowelsByName](#module_calCodeUtil.vowelsByName) : <code>Object.&lt;string, string&gt;</code>
    * [.commonVowels](#module_calCodeUtil.commonVowels) : <code>Array.&lt;string&gt;</code>
    * [.easternVowels](#module_calCodeUtil.easternVowels) : <code>Array.&lt;string&gt;</code>
    * [.vowels](#module_calCodeUtil.vowels) : <code>Array.&lt;string&gt;</code>
    * [.diacriticsByName](#module_calCodeUtil.diacriticsByName) : <code>Object.&lt;string, string&gt;</code>
    * [.diacritics](#module_calCodeUtil.diacritics) : <code>Array.&lt;string&gt;</code>
    * [.letterAsciiMap](#module_calCodeUtil.letterAsciiMap) : <code>Object.&lt;string, string&gt;</code>
    * [.punctuation](#module_calCodeUtil.punctuation) : <code>Array.&lt;string&gt;</code>
    * [.dotting](#module_calCodeUtil.dotting) : <code>Array.&lt;string&gt;</code>
    * [.bdwl](#module_calCodeUtil.bdwl) : <code>Array.&lt;string&gt;</code>
    * [.isConsonant](#module_calCodeUtil.isConsonant) ⇒ <code>boolean</code>
    * [.isVowel](#module_calCodeUtil.isVowel) ⇒ <code>boolean</code>
    * [.isDiacritic](#module_calCodeUtil.isDiacritic) ⇒ <code>boolean</code>
    * [.isPunctuation](#module_calCodeUtil.isPunctuation) ⇒ <code>boolean</code>
    * [.isDotting](#module_calCodeUtil.isDotting) ⇒ <code>boolean</code>
    * [.isDotted](#module_calCodeUtil.isDotted) ⇒ <code>boolean</code>
    * [.removeDotting](#module_calCodeUtil.removeDotting) ⇒ <code>string</code>
    * [.sort](#module_calCodeUtil.sort) ⇒ <code>number</code>
    * [.isBdwlPrefix](#module_calCodeUtil.isBdwlPrefix) ⇒ <code>boolean</code>

<a name="module_calCodeUtil.consonantsByName"></a>

### calCodeUtil.consonantsByName : <code>Object.&lt;string, string&gt;</code>
CAL consonant name to value map

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.consonants"></a>

### calCodeUtil.consonants : <code>Array.&lt;string&gt;</code>
CAL consonants

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.extraConsonants"></a>

### calCodeUtil.extraConsonants : <code>Array.&lt;string&gt;</code>
Extra CAL consonants specific to Palestinian or Hebrew

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.allConsonants"></a>

### calCodeUtil.allConsonants : <code>Array.&lt;string&gt;</code>
Base consonants + extra consonants

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.vowelsByName"></a>

### calCodeUtil.vowelsByName : <code>Object.&lt;string, string&gt;</code>
CAL vowel name to value map

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.commonVowels"></a>

### calCodeUtil.commonVowels : <code>Array.&lt;string&gt;</code>
CAL common vowels

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.easternVowels"></a>

### calCodeUtil.easternVowels : <code>Array.&lt;string&gt;</code>
CAL eastern/hebrew only vowels

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.vowels"></a>

### calCodeUtil.vowels : <code>Array.&lt;string&gt;</code>
CAL vowels including Eastern/Hebrew ones

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.diacriticsByName"></a>

### calCodeUtil.diacriticsByName : <code>Object.&lt;string, string&gt;</code>
Sedra/CAL diacritic name map
1. qushaya: __'__ - dot above
2. rukkakha: __,__ - dot below
3. lineaOccultans: **_** - linea occultans
4. seyame: __*__ - seyame, rebwe

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.diacritics"></a>

### calCodeUtil.diacritics : <code>Array.&lt;string&gt;</code>
Sedra/CAL diacritic characters:
1. __'__ dot above, Qushaya
2. __,__ dot below, Rukkakha
3. **_** line under
4. __*__ Seyame

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.letterAsciiMap"></a>

### calCodeUtil.letterAsciiMap : <code>Object.&lt;string, string&gt;</code>
CAL to ordinal ASCII value. Used for sorting:
a b c d e f g h i j k l m n o p q r s t u v
w x y z { | }

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.punctuation"></a>

### calCodeUtil.punctuation : <code>Array.&lt;string&gt;</code>
Common punctuation

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.dotting"></a>

### calCodeUtil.dotting : <code>Array.&lt;string&gt;</code>
Vowels and diacritics: used for consonantal only mapping

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.bdwl"></a>

### calCodeUtil.bdwl : <code>Array.&lt;string&gt;</code>
Bdwl consonants

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
<a name="module_calCodeUtil.isConsonant"></a>

### calCodeUtil.isConsonant ⇒ <code>boolean</code>
Is character c a CAL consonant

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
**Returns**: <code>boolean</code> - true if c is CAL consonant  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>string</code> | input character |

<a name="module_calCodeUtil.isVowel"></a>

### calCodeUtil.isVowel ⇒ <code>boolean</code>
Is character c a CAL vowel

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
**Returns**: <code>boolean</code> - true if c is CAL vowel  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>string</code> | input character |

<a name="module_calCodeUtil.isDiacritic"></a>

### calCodeUtil.isDiacritic ⇒ <code>boolean</code>
Is character c a diacritic? Same characters used for both Sedra 3 and CAL.

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
**Returns**: <code>boolean</code> - true if c is a diacritic  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>string</code> | input character |

<a name="module_calCodeUtil.isPunctuation"></a>

### calCodeUtil.isPunctuation ⇒ <code>boolean</code>
Is character c a common punctuation char?

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
**Returns**: <code>boolean</code> - true if c is common punctuation  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>string</code> | input character |

<a name="module_calCodeUtil.isDotting"></a>

### calCodeUtil.isDotting ⇒ <code>boolean</code>
Returns true if c is dotting character

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
**Returns**: <code>boolean</code> - true if c is dotting  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>string</code> | input character |

<a name="module_calCodeUtil.isDotted"></a>

### calCodeUtil.isDotted ⇒ <code>boolean</code>
Return true if input word has vowels or diacritics

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
**Returns**: <code>boolean</code> - true if word has vowels or diacritics  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>string</code> | input CAL code word |

<a name="module_calCodeUtil.removeDotting"></a>

### calCodeUtil.removeDotting ⇒ <code>string</code>
Remove dotting (vowels and diacritics), leaving consonantal word only.

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
**Returns**: <code>string</code> - consonantal word  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>string</code> | input word to be processed |

<a name="module_calCodeUtil.sort"></a>

### calCodeUtil.sort ⇒ <code>number</code>
Comparator function to be used for sorting CAL words

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
**Returns**: <code>number</code> - -1, 0, 1 depending on word sorting  

| Param | Type | Description |
| --- | --- | --- |
| word1 | <code>string</code> | first word to compare |
| word2 | <code>string</code> | second word to compare |

<a name="module_calCodeUtil.isBdwlPrefix"></a>

### calCodeUtil.isBdwlPrefix ⇒ <code>boolean</code>
Return true if word is bdwl prefixed starting with index

**Kind**: static constant of [<code>calCodeUtil</code>](#module_calCodeUtil)  
**Returns**: <code>boolean</code> - true if word is bdwl prefixed  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>string</code> | word to test |
| index | <code>number</code> | position in word to start checking from |

