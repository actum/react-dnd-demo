import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const {JSDOM} = jsdom;
const doc = new JSDOM('<!doctype html><html><body></body></html>');
const win = doc.window;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
    if (!(key in global)) global[key] = window[key];
});

chai.use(chaiImmutable);