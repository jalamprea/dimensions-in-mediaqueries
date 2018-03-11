# dimensions-in-mediaqueries

Find what set of dimensions match with mediaqueries found in a CSS string


Usage
-----

This package has one export: `dimensionsIn()`, which will detect all mediaqueries included in
the CSS string and find which of them match with the dimensions passed as array.

### dimensionsIn

The `dimensionsIn()` method receive the array of dimmensions (each object should have an width 
and height properties), and recive the CSS string. This method will find all possible mediaqueries
in the CSS and validate them among the dimensions. 
The returned array will have only the set of dimensions that match with mediaqueries found in CSS.

```javascript

var fs = require('fs');
var dim = require('dimensions-in-mediaqueries');

var dimensions = [
	{ width: 1280, height: 960 },
	{ width: 960, height: 720 },
];
var styles = fs.readFileSync('./sample.min.css').toString();
var dim = require('dimensions-in-mediaqueries');

var matched = dim.dimensionsIn(dimensions, styles);

console.log(matched); // => []
```

This package internally depend of [css-mediaqueries]: https://github.com/ericf/css-mediaquery/

License
-------

This software is free to use under the MIT license.
See the [LICENSE file][] for license text and copyright information.