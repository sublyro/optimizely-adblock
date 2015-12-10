(function () {
    var getCookie = function (name) {
        var match = document.cookie.match(name + '=([^;]*)');
        return match ? match[1] : undefined;
    };
    var setCookie = function (c_name, value, exdays, c_domain) {
        c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
    };
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://s3.amazonaws.com/optimizely-playground/adblock.js", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status === 0) {
                window.ad_blocker = true;
                optimizely.push(['setDimensionValue', 'adblock', 'true']);
                setCookie("ad_blocker", true, 30, window.location.host);
            } else {

                // check if the user has disabled ad blocker
                if (getCookie("ad_blocker") == "true") {
                    optimizely.push(["trackEvent", "userDisabledAdBlock"]);
                }

                window.ad_blocker = false;
                optimizely.push(['setDimensionValue', 'adblock', 'false']);
                setCookie("ad_blocker", false, 30, window.location.host);
            }
        }
    };
})();
