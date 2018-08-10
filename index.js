'use strict';

const mediaQuery = require('css-mediaquery');

exports.dimensionsIn = dimensionsIn;
function dimensionsIn(dimensions, css) {

    let reg = new RegExp("(@media)(.*?)(\{)", 'g');
    let matches = css.match(reg);

    let screens = matches.filter((rule, index) => {
        rule = rule.replace(': ', ':');
        if (rule.indexOf('print')>0 || matches.indexOf(rule)!==index)
    	   return false;
        return true;
    });
    matches = screens.map(rule => {
        rule = rule.substring(7, rule.length-1).trim();
        return rule;
    });

    let keep = [];
    let ast = null;
    for (let i = matches.length - 1; i >= 0; i--) {
        mq = matches[i];
        if(mq.indexOf('min-w')<0 && mq.indexOf('max-w')<0) {
            continue;
        }
        ast = mediaQuery.parse(mq);

        if(ast[0].expressions.length===0) {
            console.log('No expressions found on', ast[0]);
            continue;
        }
        
        let exp = ast[0].expressions[0];
        let k = 0;

        // console.log('Evaluating: ', matches[i]);
        if(exp.modifier==='min') {
            while( k < dimensions.length && mediaQuery.match(matches[i], {type:'screen', width: dimensions[k].width}) ) {
                k++;
            }
            k--;
        } else if(exp.modifier==='max') {
            while( k < dimensions.length && !mediaQuery.match(matches[i], {type:'screen', width: dimensions[k].width}) ) {
                k++;
            }
        }
        if(k > 0 && k < dimensions.length) {
            // console.log('Match:', dimensions[k]);
            if (keep.indexOf(dimensions[k]) < 0) {
                keep.push( dimensions[k] );
            }
        }
    }
    return keep.sort();
}
