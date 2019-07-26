'use strict';

const mediaQuery = require('css-mediaquery');

exports.dimensionsIn = dimensionsIn;
function dimensionsIn(dimensions, css) {

    let reg = new RegExp("(@media)(.*?)(\{)", 'g');
    let matches = css.match(reg);
    if (!matches) {
        return [];
    }
    
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
    let mq = null;
    for (let i = matches.length - 1; i >= 0; i--) {
        mq = matches[i];
        if (mq.indexOf('min-w')<0 && mq.indexOf('max-w')<0) {
            continue;
        }
        if (mq.indexOf('device-pixel-ratio')>0) {
            continue;
        }
        if (mq.indexOf('2 / 1')>0) {
            mq = mq.replace('2 / 1', '2/1');
        }

        // avoid errors like screen and (max-width:) in claraluzroldan.com.co
        if (mq.indexOf(':)')>0) {
            continue;
        }

        // WTF?
        if(mq.indexOf('min-')===0 || mq.indexOf('max-')===0) {
            mq = '(' + mq;
        }

        // (min-width:1440px + 24px * 4)
        if (mq.search('px')>0 && mq.search(/px\)/)<0 ) {
            mq = mq.replace(/px.*?\)/g, 'px)');
        }

        // console.log('\nChecking rule:', mq);
        ast = mediaQuery.parse(mq);

        if(ast[0].expressions.length===0) {
            console.log('No expressions found on', ast[0]);
            continue;
        }
        
        let exp = ast[0].expressions[0];
        let k = 0;

        let _mq = mq;
        let _mqValue = parseInt(exp.value.replace('px', ''));

        // console.log('==> Evaluating: ', _mq);
        if(exp.modifier==='min') {
            while( k < dimensions.length && mediaQuery.match(_mq, {type:'screen', width: dimensions[k].width}) ) {
                k++;
            }
            k--;
        } else if(exp.modifier==='max') {
            // while( k < dimensions.length && !mediaQuery.match(_mq, {type:'screen', width: dimensions[k].width}) ) {
            while( k < dimensions.length && _mqValue<dimensions[k].width ) {
                k++;
            }
            k--;
        }
        if(k > 0 && k < dimensions.length) {
            // console.log(' - Match:', dimensions[k]);
            if (keep.indexOf(dimensions[k]) < 0) {
                keep.push( dimensions[k] );
            }
        }
    }
    return keep.sort();
}
