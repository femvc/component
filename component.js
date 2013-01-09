'use strict';
//    ____     ____                _   _     ____          ____      ____                   
//  /\  __\  /\  __\    /'\_/`\  /\ \/\ \  /\  __`\      /\  __`\  /\  __`\    /'\_/`\      
//  \ \ \_/_ \ \ \_/_  /\      \ \ \ \ \ \ \ \ \ \_\     \ \ \ \_\ \ \ \ \ \  /\      \     
//   \ \  __\ \ \  __\ \ \ \_/\_\ \ \ \ \ \ \ \ \  __     \ \ \  __ \ \ \ \ \ \ \ \_/\_\    
//    \ \ \_/  \ \ \_/_ \ \ \\ \ \ \ \ \_/ \ \ \ \_\ \  __ \ \ \_\ \ \ \ \_\ \ \ \ \\ \ \   
//     \ \_\    \ \____/ \ \_\\ \_\ \ `\___/  \ \____/ /\_\ \ \____/  \ \_____\ \ \_\\ \_\  
//      \/_/     \/___/   \/_/ \/_/  `\/__/    \/___/  \/_/  \/___/    \/_____/  \/_/ \/_/  
//                                                                                          
//                                                                                          

/**  
 * 文本输入框控件 
 * 
 * @desc 唯一标识
 * [闪光点] 可以create或通过模板两种方式创建
 * [缺点] 创建过程步骤不太明确
 * [解决方案] 借鉴Action的创建过程
 *
 * @constructor
 */

/**
 * 文本输入框组件
 *
 * @param {Object} options 控件初始化参数.
 */
bui.Component = function(options) {
    this.initOptions(options);
    this.form = 1;
    // 类型声明，用于生成控件子dom的id和class
    this.type = 'component';
};

bui.Component.prototype = {
    /**
     * 将文本框设置为不可写
     *
     * @public
     */
    disable: function(disabled) {
        if (typeof disabled === 'undefined') {
            disabled = true;
        }
        if (disabled) {
            this.main.disabled = 'disabled';
            this.setState('disabled');
        } else {
            this.main.removeAttribute('disabled');
            this.removeState('disabled');
        }
    },

    /**
     * 设置控件为只读
     *
     * @public
     * @param {Object} readOnly
     */
    setReadOnly: function(readOnly) {
        readOnly = !!readOnly;
        this.main.readOnly = readOnly;
        /*this.main.setAttribute('readOnly', readOnly);*/
        this.readOnly = readOnly;
        readOnly ? this.setState('readonly') : this.removeState('readonly');
    },

    /**
     * 渲染控件
     *
     * @protected
     * @param {Object} main 控件挂载的DOM.
     */
    render: function(main) {
        var me = this;
        if (main) {
            me.main = main;
            // 绘制控件行为
            bui.Control.render.call(me);
        }
    },

    /**
     * 获取键盘敲击的事件handler
     *
     * @private
     * @return {Function}
     */
    getPressHandler: function() {
        var me = this;
        return function(e) {
            e = e || window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == 13) {
                return me.onenter();
            }
        };
    },

    onenter: new Function(),

    onfocus: new Function(),

    onblur: new Function(),

    /**
     * 释放控件
     *
     * @public
     */
    dispose: function() {
        // 卸载main的事件
        var main = this.main;
        main.onkeypress = null;
        main.onchange = null;
        main.onpropertychange = null;
        main.onfocus = null;
        main.onblur = null;

        bui.Control.prototype.dispose.call(this);
    }
};
/*通过bui.Control派生bui.Button*/
//bui.Control.derive(bui.Component);
bui.inherits(bui.Component, bui.Control);
