$.fn.MKtypewriter = function(time) {
    this.each(function() {
        var $ele = $(this), str = $ele.html(), progress = 0, timer = null;
        $ele.html('');
        clearInterval(timer);
        timer = setInterval(function() {
            var current = str.substr(progress, 1);
            if (current == '<') {
                progress = str.indexOf('>', progress) + 1;
            } else {
                progress++;
            }
            $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : '')); //& 按位与，即奇数为true 偶数为false
            if (progress >= str.length) {
                clearInterval(timer);
                $ele.html(str.substring(0, progress - 1));
            }
        }, time);
    });
    return this;
};