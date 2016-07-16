/**
 * WEB�����߱ر���7��JavaScript����
 * **/

/**
 *��ֹ��Ƶ���õ�debounce����
 * ��� debounce ����������Щִ���¼�������������˵�Ǳز����ٵ�������ܵĺ������������ʹ��scroll, resize, key*���¼�����ִ������ʱ��ʹ�ý�Ƶ������Ҳ����ͷ����ش�Ĵ������������Ƶ���� debounce ������Ĵ����ĸ�Ч��
 * ��� debounce �����ڸ�����ʱ������ֻ�������ṩ�Ļص�����ִ��һ�Σ��Դ˽�������ִ��Ƶ�ʡ���������Ƶ�������¼�ʱ�������������Ե���Ϊ��Ҫ��
 **/

// ����һ��������that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Usage
var myEfficientFn = debounce(function() {
    // All the taxing stuff you do
}, 250);
window.addEventListener('resize', myEfficientFn);


/**
 * �趨ʱ��/Ƶ��ѭ����⺯��
 * �����ᵽ�� debounce �����ǽ�����ĳ���¼��Ĵ���������ʱ��û���������¼����ã�������ֻ���Լ�дһ��������ÿ��һ��ʱ����һ�Ρ�
**/

function poll (fn, callback, err, timeout, interval) {
    var startTime = (new Date()).getTime();
    var pi = window.setInterval(function(){
        if (Math.floor(((new Date).getTime() - startTime) / 1000) <= timeout) {
            if (fn()) {
                callback();
            }
        } else {
            window.clearInterval(pi);
            err();
        }
    }, interval)
}


/**
 * ��ֹ�ظ����á�ֻ����ִ��һ�ε�once ����
 * �ܶ�ʱ������ֻϣ��ĳ�ֶ���ֻ��ִ��һ�Σ�����������ʹ�� onload ���޶�ֻ�ڼ������ʱִ��һ�Ρ��������������������Ĳ���ִ��һ�κ�Ͳ������ظ�ִ�С�
 * ��� once �����ܹ���֤���ṩ�ĺ���ִֻ��Ψһ��һ�Σ���ֹ�ظ�ִ�С�
 **/

function once(fn, context) {
    var result;

    return function() {
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}

// Usage
var canOnlyFireOnce = once(function() {
    console.log('Fired!');
});

canOnlyFireOnce(); // "Fired!"
canOnlyFireOnce(); // nada


/**
 * ��ȡһ�����ӵľ��Ե�ַ getAbsoluteUrl
 * ��ȡ���ӵľ��Ե�ַ���������������ô�򵥡��������һ���ǳ�ʵ�õĺ������ܸ������������Ե�ַ����ȡ���Ե�ַ��
 * ����ʹ���� a ��ǩ href �����������ľ���URL��ʮ�ֵĿɿ���
 */

var getAbsoluteUrl = (function() {
    var a;

    return function(url) {
        if(!a) a = document.createElement('a');
        a.href = url;

        return a.href;
    };
})();

// Usage
getAbsoluteUrl('/something'); // http://www.webhek.com/something


/**
 * �ж�һ��JavaScript�����Ƿ���ϵͳԭ������ isNative
 * �ܶ������js�ű�������ȫ�ֱ����������µĺ�������Щ�����Ḳ�ǵ�ϵͳ��ԭ�����������������������������ǲ���ԭ�������ģ�
 * ���������Ȼ������ô�ļ�࣬�����ǿ����������ģ�
 */

;(function() {

    // Used to resolve the internal `[[Class]]` of values
    var toString = Object.prototype.toString;

    // Used to resolve the decompiled source of functions
    var fnToString = Function.prototype.toString;

    // Used to detect host constructors (Safari > 4; really typed array specific)
    var reHostCtor = /^\[object .+?Constructor\]$/;

    // Compile a regexp using a common native method as a template.
    // We chose `Object#toString` because there's a good chance it is not being mucked with.
    var reNative = RegExp('^' +
            // Coerce `Object#toString` to a string
        String(toString)
            // Escape any special regexp characters
            .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
            // Replace mentions of `toString` with `.*?` to keep the template generic.
            // Replace thing like `for ...` to support environments like Rhino which add extra info
            // such as method arity.
            .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    function isNative(value) {
        var type = typeof value;
        return type == 'function'
            // Use `Function#toString` to bypass the value's own `toString` method
            // and avoid being faked out.
            ? reNative.test(fnToString.call(value))
            // Fallback to a host object check because some environments will represent
            // things like typed arrays as DOM methods which may not conform to the
            // normal native pattern.
            : (value && type == 'object' && reHostCtor.test(toString.call(value))) || false;
    }

    // export however you want
    module.exports = isNative;
}());

// Usage
isNative(alert); // true
isNative(myCustomFunction); // false


/**
 * ��JavaScript�����µ�CSS���� insertRule
 * ��ʱ�����ǻ�ʹ��һ��CSSѡ����(���� document.querySelectorAll)����ȡһ�� NodeList ��Ȼ�������ÿ�������޸���ʽ����ʵ�Ⲣ����һ�ָ�Ч����������Ч����������JavaScript�½�һ��CSS��ʽ����
 * ��Щ������Ч�ʷǳ��ߣ���һЩ�����У�����ʹ��ajax�¼���һ��htmlʱ��ʹ����������������㲻��Ҫ�����¼��ص�html���ݡ�
 * **/

// Build a better Sheet object
Sheet = (function() {
    // Build style
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);

    // Build and return a single function
    return function(rule){ style.sheet.insertRule( rule, style.sheet.cssRules.length ); } ;
})();

// Then call as a function
Sheet(".stats { position: relative ; top: 0px }") ;


/**
 * �ж���ҳԪ���Ƿ����ĳ�����Ժ���ʽ matchesSelector
 **/

function matchesSelector(el, selector) {
    var p = Element.prototype;
    var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
    return f.call(el, selector);
}

// Usage
matchesSelector(document.getElementById('myDiv'), 'div.someSelector[some-attribute=true]')