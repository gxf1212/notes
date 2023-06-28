// this file shows successfully the list, with coloring changing like the click-heart. and do not conflict with live2d model
// different from jerry
var arr = new Array("分子模拟", "分子动力学", "增强采样", "自由能微扰", "肿瘤免疫", "计算生物", "定量生物", "生物物理", "化学生物", "生物化学", 
    "纳米药物", "小分子药", "核酸药物", "多肽药物", "RNA结构", "蛋白结构", "信号通路", "抗原肽设计", "蛋白设计", "药物设计", "AI算法", "结构预测",
    "pHLA-TCR", "病毒生物学", "分子机制", "蛋白折叠", "RNA折叠", "理性设计", "单点突变", "新生抗原", "力场参数",
    "B站搬运", "高性能计算", "生物信息", "Python", "程序开发", "LaTeX", "Linux系统");
// var arr = new Array("❤", "💛", "💚", "💙", "💜", "💗", "🖤"); 

!function(e, t, a) {
    function r() {
        for (var e = 0; e < s.length; e++) s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e, 1)) : (s[e].y--, s[e].scale += .004, s[e].alpha -= .013, s[e].el.style.cssText = "left:" + s[e].x + "px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale + "," + s[e].scale + ");color:" + s[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }
    function n() {
        var t = "function" == typeof e.onclick && e.onclick;
        e.onclick = function(e) {
            t && t(),
            o(e)
        }
    }
    function o(e) {
        var a = t.createElement("div");
        a.className = "heart",
        a.innerText = arr[parseInt(arr.length * Math.random())];
        s.push({
            el: a,
            x: e.clientX+5,
            y: e.clientY-10,
            scale: 1,
            alpha: 1,
            color: c()
        }),
        t.body.appendChild(a)
    }
    function i(e) {
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch(t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }
    function c() {
        return "rgb(" + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + ")"
    }
    var s = [];
    e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame ||
        function(e) {
            setTimeout(e, 1e3 / 60)
        },
    i(".heart{position: fixed;}"),
    n(),
    r()
} (window, document);
