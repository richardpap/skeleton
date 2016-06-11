'use strict';

import { InitPlugins }   from './modules/initPlugins.es6';


$(function(window, document, undefined) {


	let plugins = new InitPlugins();
	plugins.webfonts().carousel();
	






}(window, document));

