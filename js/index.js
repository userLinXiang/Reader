/*
 * @Author: linxiang
 * @Date: 2022-02-25 08:40:25
 * @LastEditTime: 2022-02-25 09:02:02
 * @LastEditors: linxiang
 * @Description:  
 */

var sTopBtn = document.getElementsByClassName('s-top-btn')[0],
    header = document.getElementsByClassName('list-hd')[0];

addEvent(window, 'scroll', function() {
    var sTop = getScrollOffset().top;
    sTopBtn.style.display = sTop ? 'block' : 'none';
});

addEvent(sTopBtn, 'click', function() {
    window.scrollTo(0, 0);
});

addEvent(header, 'click', function() {
    window.scrollTo(0, 0);
});