/* A JS version of time conversion used in systemd
* Available C version at systemd/src/basic/time-util.c
* Input t = real time microsecond (1463509800000000)
* Use Math.floor() or round() to round to integers.
*/
function format_timestamp_relative(t) {
    var MSEC_PER_SEC = 1000;
    var USEC_PER_SEC = 1000000;
    var USEC_PER_MSEC = 1000;
    var USEC_INFINITY =-1;

    var USEC_PER_MINUTE = 60*USEC_PER_SEC;
    var USEC_PER_HOUR = 60*USEC_PER_MINUTE;
    var USEC_PER_DAY = 24*USEC_PER_HOUR;
    var USEC_PER_WEEK = 7*USEC_PER_DAY;
    var USEC_PER_MONTH = 2629800*USEC_PER_SEC;
    var USEC_PER_YEAR = 31557600*USEC_PER_SEC;

	var s = "";
    var n, d; //change long when needed

    if (t <= 0 || t == USEC_INFINITY)
            return ;
    //subtracting the milliseconds in order to get a whole number instead of a fraction
    var date = new Date();
    n = (date.getTime()-date.getMilliseconds()) * 1000;
    if (n > t) {
            d = n - t;
            s = "ago";
    } else {
            d = t - n;
            s = "left";
    }
    if (d >= USEC_PER_YEAR)
        console.log(d / USEC_PER_YEAR + " years " + (d % USEC_PER_YEAR) / USEC_PER_MONTH + " months " + s);
    else if (d >= USEC_PER_MONTH)
            console.log(d / USEC_PER_MONTH + " months " + (d % USEC_PER_MONTH) / USEC_PER_DAY + " days " + s);
    else if (d >= USEC_PER_WEEK)
            console.log(d / USEC_PER_WEEK + " weeks "+ (d % USEC_PER_WEEK) / USEC_PER_DAY +" days " + s);
    else if (d >= 2*USEC_PER_DAY)
            console.log( d / USEC_PER_DAY +" days " +s);
    else if (d >= 25*USEC_PER_HOUR)
            console.log("1 day "+ (d - USEC_PER_DAY) / USEC_PER_HOUR +"h " +s);
    else if (d >= 6*USEC_PER_HOUR)
            console.log( d / USEC_PER_HOUR +"h " + s);
    else if (d >= USEC_PER_HOUR)
            console.log( d / USEC_PER_HOUR +"h "+ (d % USEC_PER_HOUR) / USEC_PER_MINUTE +"min " + s);
    else if (d >= 5*USEC_PER_MINUTE)
            console.log( d / USEC_PER_MINUTE +"min " + s);
    else if (d >= USEC_PER_MINUTE)
            console.log( d / USEC_PER_MINUTE +"min "+ (d % USEC_PER_MINUTE) / USEC_PER_SEC +"s ");
    else if (d >= USEC_PER_SEC)
            console.log( d / USEC_PER_SEC +"s " + s);
    else if (d >= USEC_PER_MSEC)
            console.log( d / USEC_PER_MSEC +"ms " + s);
    else if (d > 0)
            console.log(d +"us " + s);
    else
            console.log("now");
    return;
}