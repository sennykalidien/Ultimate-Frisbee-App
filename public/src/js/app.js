/*********************************************************
	NAMESPACE
*********************************************************/
var UFA = UFA || {};
'use strict';

/*********************************************************
    LAUNCH APP
*********************************************************/
UFA.launcher = ( () => {

    function init() {
        document.addEventListener("DOMContentLoaded", function () {
            UFA.ux.init();
            UFA.router.init();
        });
    }

    return {
        init: init
    };

})();

UFA.launcher.init();
