---
title: CSS水平、垂直居中方法总结
date: 2017-05-05 10:58:55
tags: CSS
---

在前端开发切片布局中我们常常会遇到各种元素__水平__、__垂直__、__水平垂直__ 居中显示的的场景，其中 __水平居中__ 是非常简单的，如果它是一个 __行内元素__ ，就对它的父元素应用`text-align: center`；如果它是一个 __块级元素__ ，就对它自身应用`margin: auto`。然而如果要对一个元素进行 __垂直居中__ ，可能光是想想就令人头皮发麻了。此文总结了个人工作中常用的几种的居中方法，并不说那种最好那种最差，不同的方法用于不同的场景，适合的才是最好的。

### 水平居中

对于行类元素如span、label、em,small等元素来说水平居中一般采用方式为：`text-align: center;`，的方式来解决。而块级如：div、main、header、table、section等元素则采用`margin: auto`;

> 注意：不标准做法，块级元素与行内元素可相互转换，因此上述两种方法在块级与行内元素都适用，只是在用时需作适当的转换

### 垂直居中

#### 表格布局法

表格布局法，不言而喻就是利用表格特有的特性达到元素垂直居中的效果。我们不仅可以用表格直接来布局也可以利用CSS样式重置元素默认显示方式来达到表格的效果。

适用场景：IE8+

直接利用Table:
``` html
<table style="width: 100%;">
  <tr>
     <td style="text-align: center; vertical-align: middle;">Unknown stuff to be centered. </td>
  </tr>
</table>
```

利用其它HTML标签与样式重置：
``` html
<div class="reset-table">
   <div class="reset-table-cell">Unknown stuff to be centered.</div>
</div>
```
``` css
.reset-table {
  display: table;
  width: 100%;
}
.reset-table-cell {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

#### 行内块法

行内块法主要是利用`vertical-align`这个性达到目标元素居中的目的，要达到目标元素居中相应我们要创建一个相对的目标元素如样式`.block:before`我们创建了一个高度等同于父层并且无宽的目标元素，以其作为基准达到垂直居中的目的。更详细理解请查阅`vertical-align`属性文档。

适用场景：IE8+
``` html
<div class="block" style="height: 300px;">
  <div class="centered">
    <p>Centered.</p>
  </div>
</div>
```

``` css
.block {
  text-align: center;
  white-space: nowrap;
}

.block:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: -0.25em;
}

.centered {
  display: inline-block;
  vertical-align: middle;
  width: 300px;
}
```

#### 基于绝对定位的解决方案

HTML:

```html
<main>
  <h1>Center?</h1>
</mian>
```

CSS:
利用 **定位偏移值** 负值属性：
前行条件：元素具有非固定的宽度和高度，相应其父层需要设定相对定位
适用场景：IE8+

```css
main {
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
}
```


利用 **margin** 负值属性：
前行条件：元素具有固定的宽度和高度  
适用场景：IE7+

```css
main {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3em; /* 6/2 = 3 */
  margin-left: -9em; /* 18/2 = 9 */
  width: 18em;
  height: 6em;
}
```

利用CSS3 **calc()** 函数：
前行条件：元素具有固定的宽度和高度  
适用场景：IE9+
```css
main {
  position: absolute;
  top: calc(50% - 3em);
  left: calc(50% - 9em);
  width: 18em;
  height: 6em;
}
```
利用 **tansform** 属性：
前行条件：元素不定高、不定宽（同样适用于定宽、定高）
适用场景：IE9+
```css
main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

#### 基于视口单位的解决方案

基于视口单位垂直居中，需要引入CSS3中两个与视窗相关的两个单位`vw`与`vh`,它们分别表示视窗宽度（即设备屏幕宽度）与视窗高度（即设备高度）1vw等于1%的设备宽度。

利用 **视口单位** 属性：
前行条件：元素不定高、不定宽（同样适用于定宽、定高）
适用场景：IE9+、居中元素相对于设备屏幕中央
```css
main {
  width: 25%;
  margin: 50vh auto 0;
  transform: translateY(-50%);
}
```

#### 基于Flexbox 的解决方案

利用Flexbox属性是目前现代浏览器在不考虑兼容性的情况下，解决垂直居中的首选方案，该属性不同于其它垂直居中方案，它是专门针对这类需求所设计。

利用 **Flexbox** 属性：
前行条件：元素不定高、不定宽（同样适用于定宽、定高）
适用场景：IE0+
```css
body{
  display: flex;
  min-height: 100vh;
  margin: 0;
}
main {
  margin: auto;
}
```
> 当我们使用Flexbox 时，margin: auto 不仅在水平方向上将元素居中，垂直方向上也是如此。

Flexbox针对其子元素如文本、行内元素等也可实现垂直居中,我们只需要加下`align-items`、`justify-content`两条属性如：
``` html
<main>Centered.</main>
```
``` css
main  {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18em;
  height: 10em;
}
```
> Flexbox 不仅在垂直与水平居中这两方面表现优秀外，在一些特殊的页面布局中也表现出其强大的魅力，如右定宽左自适应、省去了我们以前采用float与定位方式实现其相同效果的大量代码冗余等等。不过Flexbox随好但也不要滥用。

### 参考资料
- [Absolute Centering in CSS](http://codepen.io/shshaw/full/gEiDt)
- 《CSS揭秘》
