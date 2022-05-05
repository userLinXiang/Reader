/*
 * @Author: linxiang
 * @Date: 2022-02-25 09:14:44
 * @LastEditTime: 2022-02-25 10:26:42
 * @LastEditors: linxiang
 * @Description:  
 */
// 先获取视口高度
// 再获取滚动高度
var vHeight = getViewPortSize().height,
    sHeight = getScrollHeight().height,
    playing = false,
    t = null;
;(function() {
    var AutoReader = function(opt) {
        this.playBtn = opt.playBtn;
        this.sTopBtn = opt.sTopBtn;
        this.playImg = opt.playImg;
        this.pauseImg = opt.pauseImg;

        var _self = this;

        addEvent(window, 'scroll', function() {
            _self.sTopBtnShow()
        })

        addEvent(this.sTopBtn, 'click', function() {
            window.scrollTo(0, 0);
            _self.playBtn.style.backgroundImage = 'url('+ _self.playImg + ')';
            clearInterval(t);
            playing = false;
        })

        addEvent(this.playBtn, 'click', function() {
            _self.playBtnClick();
        })
    }

    AutoReader.prototype = {
        playBtnClick: function() {
            var sTop = getScrollOffset().top,
                _self = this;

            if (sHeight === vHeight + sTop) {
                return;
            }

            if (!playing) {
                t = setInterval(function() {
                    sTop  = getScrollOffset().top;
                    if (sHeight <= vHeight + sTop) {
                        clearInterval(t);
                        _self.playBtn.style.backgroundImage = 'url('+ _self.playImg + ')';
                        playing = false;
                        return;
                    } else {
                        window.scrollBy(0, 1);
                        _self.playBtn.style.backgroundImage = 'url('+ _self.pauseImg + ')';
                    }
                }, 1);
                playing = true;
            } else {
                clearInterval(t);
                playing = false;
                _self.playBtn.style.backgroundImage = 'url('+ _self.playImg + ')';
            }
            
        },
        sTopBtnShow: function() {
            var sTop = getScrollOffset().top;
            this.sTopBtn.style.display = sTop ? 'block' : 'none';
        },

    }

    window.AutoReader = AutoReader;

})();
