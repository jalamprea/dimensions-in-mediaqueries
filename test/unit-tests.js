/* global describe, it */

'use strict';
var fs = require('fs');
var expect  = require('chai').expect,
    dim		= require('../');

describe('dim.dimensionsIn()', function () {
	it('should generate a new array with dimensions found', function () {
		
		// http://mediag.com/news/popular-screen-resolutions-designing-for-all/
		const dimensions = [
		    { width: 5120, height: 3000 }, // MAC 5K Retina
		    { width: 3840, height: 3000 }, // 4K
		    { width: 2560, height: 3000 },
		    { width: 1920, height: 3000 }, // Full HD, Surface Pro 2
		    { width: 1280, height: 3000 }, // Hd
		    { width: 960, height: 3000 },
		    { width: 640, height: 3000 }, // SD
		    { width: 480, height: 3000 },
		    { width: 360, height: 3000 }, // Galaxy S5 */
		    { width: 320, height: 3000 } // iPhone
		];

		var css = fs.readFileSync('./test/test-claraluzroldan.css').toString();

		var res = dim.dimensionsIn(dimensions, css);
		
		expect(res).to.be.an.instanceof(Array);
		expect(res).to.have.lengthOf.above(0);

		console.log('Resolutions:', res);
	});
});
