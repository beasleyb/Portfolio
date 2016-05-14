/*!
* Custom JS for Brandon Beasley's portfolio
* www.brandonbeasley.site
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 5/12/2016
*/

"use strict";

// Call _init on DOM ready.
$(function(){
	_init();
});

// _init calls modularized, named functions.
function _init() {
	a11y();
	validate();
}