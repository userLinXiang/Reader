/*
 * @Author: linxiang
 * @Date: 2022-03-04 08:32:59
 * @LastEditTime: 2022-03-04 09:21:25
 * @LastEditors: linxiang
 * @Description:  
 */
;(function() {

    // 获取视口高度和滚动高度
    // 定时器 播放状态定义
    var wHeight = getViewPortSize().height,
        sHeight = getScrollHeight().height,
        playing = false,
        t = null;

    var AutoReader = function(opt) {
        // 先保存配置文件
        this.playBtn = opt.playBtn;
        this.sTopBtn = opt.sTopBtn;
        this.playImg = opt.playImg;
        this.pauseImg = opt.pauseImg;

        if (!this.playBtn || !this.sTopBtn || !this.playImg || !this.pauseImg) {
            console.log(paramsError());
            return;
        }

        // 保存当前的this
        var _self = this;

        // 监听全局滚动事件 触发置顶按钮显示
        addEvent(window, 'scroll', function() {
            var top = getScrollOffset().top;
            
            // 改变this指向调用
            // 滚动到顶部的距离如果是0的话 是不是要隐藏置顶按钮？
            if (top <= 0) {
                _self.sTopHide();
            } else {
                _self.sTopShow();
            }
            
        });

        // 给置顶按钮增加置顶事件
        addEvent(this.sTopBtn, 'click', function() {
            window.scrollTo(0, 0);
            stopScroll.call(_self);
        });

        // 给播放按钮绑定事件
        addEvent(this.playBtn, 'click', function() {
            _self.playBtnClick();
        });

    }

    AutoReader.prototype = {
        sTopShow: function() {
            this.sTopBtn.style.display = 'block';
        },
        sTopHide: function() {
            this.sTopBtn.style.display = 'none';
        },
        playBtnClick: function() {
            // 点击的时候就应该先获取距离顶部的高度
            // 不变的视口高度跟滚动高度先在外部获取
            // 定时器跟播放状态都在外部定义
            var _self = this,
                top;

            // 如果已经是在底部的情况下 不做任何操作
            if (sHeight <= wHeight + top) {
                return;
            }
            clearInterval(t);
            if (!playing) {
                // 暂停状态下 点击播放
                t = setInterval(function() {
                    top = getScrollOffset().top;

                    if (sHeight <= wHeight + top) {
                        stopScroll.call(_self);
                        return;
                    }

                    _self.playBtn.style.backgroundImage = 'url(' + _self.pauseImg + ')';
                    window.scrollBy(1, 1);
                    playing = true;
                }, 1)
            } else {
                stopScroll.call(_self);
            }
        }
    }

    // 抽离重复函数
    function stopScroll() {
        clearInterval(t);
        this.playBtn.style.backgroundImage = 'url(' + this.playImg + ')';
        playing = false;
    }

    // 插件报错
    function paramsError() {
        return new Error('请查看所有参数是否都已配置！')
    }

    window.AutoReader = AutoReader;

})();
