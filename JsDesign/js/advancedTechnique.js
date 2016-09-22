/**
 * Javascript 高级技巧
 */

/**
 * 作用域安全的构造函数
 * 构造函数new与非new的区别：
 * 构造函数的作用域赋给新对象,即当前this指向新的实例，而不new 则指向
 *
 * 作用域安全的构造函数在进行任何更改前，首先确认this 对象是正确类型的实例。如果不是，那么会创建新的实例并返回
 */

function Person(name, age, job){
    if(this instanceof Person){
        this.name = name;
        this.age = age;
        this.job = job;
    }else{
        return new Person(name, age, job);
    }
}

var person1 = Person("Nicholas", 29, "Software Engineer");
alert(window.name); //""
alert(person1.name); //"Nicholas"
var person2 = new Person("Shelby", 34, "Ergonomist");
alert(person2.name); //"Shelby"

// ---------------------------------------------------------------------------------------------------------------------

/**
 * 安全的类型检测
 */

function isFunction(value) {
    return Object.prototype.toString.call(value) == '[Object Function]';
}

function isArray(value) {
    return Object.prototype.toString.call(value) == '[Object Array]';
}

function isRegExp(value) {
    return Object.prototype.toString.call(value) == '[Object RegExp]';
}

// 检测原生JSON 对象

var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON) == '[object JSON]';

/**
 * 函数绑定
 * 原生的bind()方法与自定义bind()方法类似，都是要传入作为this 值的对象。
 * 只要是将某个函数指针以值的形式进行传递，同时该函数必须在特定环境中执行，被绑定函数的效用就突显出来了。
 * 主要用于事件处理程序以及 setTimeout() 和 setInterval()。
 * 然而，被绑定函数与普通函数相比有更多的开销，它们需要更多内存，同时也因为多重函数调用稍微慢一点，所以最好只在必要时使用。
 */

function bind(fn, content) {
    return function () {
        return fn.apply(content, arguments);
    }
}

// 示例
var handler = {
    message: "Event handled",
    handleClick: function(event){
        alert(this.message + ":" + event.type);
    }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler));

// 原生
EventUtil.addHandler(btn, "click", handler.handleClick.bind(handler));


/**
 * 函数柯里化
 */

function curry(fn){
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}