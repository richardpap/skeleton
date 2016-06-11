(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _initPlugins = require('./modules/initPlugins.es6');

$(function (window, document, undefined) {

	var plugins = new _initPlugins.InitPlugins();
	plugins.webfonts().carousel();
}(window, document));

},{"./modules/initPlugins.es6":2}],2:[function(require,module,exports){
class InitPlugins {

	constructor() {}

	webfonts() {

		WebFont.load({
			google: {
				families: ['Ubuntu:400,300,400italic,700,500:latin,latin-ext']
			}
		});

		return this;
	}

	carousel() {

		if ($('#splash-slider').length) {
			$('#splash-slider').carousel();
		}

		return this;
	}

}

},{}]},{},[1]);
