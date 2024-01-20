# Canvas learning 

## 获取画布2D上下文
```html
<canvas id="el" width="300" height="300"></canvas>
```
```js
const canvas = document.getElementById("el");
const ctx = canvas.getContext("2d");
```



## 上下文的属性、方法
1. 属性

`canvas`画布元素的引用

`lineWidth`  线宽
`lineCap`  线末端形状
`lineDashOffset` 虚线的偏移量
`lineJoin`   折线转折处形状
`miterLimit` 限制当两条线相交时交接处最大长度(超出部分会截平)

`font`字体
`textAlign`文本对齐方式
`textBaseline`文本基线对齐方式
`direction`文本单词的写入方向

`shadowBlur` 阴影的样式相关
`shadowColor`
`shadowOffsetX`
`shadowOffsetY`

`filter`提供模糊、灰度等过滤效果

`strokeStyle`轮廓的颜色、渐变或图形
`fillStyle`填充的颜色、渐变或图形
>可以赋值为createLinearGradient、....、createPattern等方法创建的对象

`globalCompositeOperation`图形重叠时的样式
`globalAlpha`透明度

`imageSmoothingEnabled`设置图片放大是否平滑处理
`imageSmoothingQuality`平滑处理的程度

实验性、不常用：
`letterSpacing`字母间距
`wordSpacing`单词间距
`fontKerning`
`fontStretch`字体的拉伸
`fontVariantCaps`
`textRendering`
 



2. 方法

路径：

`beginPath()` 重新开始绘制路径一条路径
`moveTo(x, y)` 移动画笔
`lineTo(x, y)` 绘制路径的子路径(路径并不会显示)
`closePath()` 连线闭合当前路径
>注意beginPath、closePath两个API不是成对的
`rect(x, y, width, height)`  绘制长方形路径
`arc(x, y, radius, startAngle, endAngle, anticlockwise)` 绘制圆形路径
 >角度使用弧度，anticlockwise为true则为逆时针开始绘制
`arcTo(x1, y1, x2, y2, radius)` 绘制圆弧路径
`ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)` 绘制椭圆路径
`quadraticCurveTo(cpx, cpy, x, y)`   绘制二次贝塞尔曲线路径
`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)` 绘制三次贝塞尔曲线路径

填充：(填充不会修改路径)
`stroke([path])` 填充路径的边缘
`fill([path])` 填充路径的内部
`strokeRect(x, y, width, height)`   直接填充矩形的边缘
`fillRect(x, y, width, height)`   直接填充矩形的内部
`clearRect(x, y, width, height)`   清楚矩形区域内的像素
`strokeText(text, x, y [, maxWidth])`   描边文本
`fillText(text, x, y [, maxWidth])`   填充文本

渐变：
`createLinearGradient(x0, y0, x1, y1)`  返回一个线性渐变对象
`createRadialGradient(x0, y0, r0, x1, y1, r1)`  返回一个放射渐变对象
`createConicGradient(startAngle, x, y)` 返回一个圆锥渐变对象
`gradient.addColorStop(offset, color)`    为渐变对象添加一个色值断点
>offset在0-1之间

虚线：
`setLineDash(segments)`   设置线段为虚线
>segments为样式数组，表示虚线中空白和实线的长度
`getLineDash()`   获取线段的虚线样式数组

图片：
`createPattern(image, repetition)` 根据一个图片创建一个图形对象
`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)` 根据提供的对象进行裁剪放入画布中
>参数1为图片对象(视频也可以)，参数2-5为图片在画布中的位置和宽高，参数6-9为图片原图的裁剪位置

变换：
`translate(x, y)`     平移变换
`scale(x, y)`     缩放变换，注意可以反转
`rotate(angle)`   旋转变换
`transform(a, b, c, d, e, f)`    用矩阵进行变换，此方法可叠加
`setTransform(a, b, c, d, e, f)`  用矩阵进行变换，此方法不可叠加，每次都会初始化
`getTransform()`  获取变换矩阵

像素操作：
`createImageData(width, height)` 创建一个ImageData对象
>ImageData对象为以每个像素点的rgba值组成的Uint8ClampedArray数组
`getImageData(x, y, width, height)` 根据画布对应位置的像素点创建ImageData对象
`putImageData(imagedata, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight)` 将ImageData对象描述的部分像素放置到画布中

其他：
`clip([path,] fillRule)`  根据路径裁剪画布
>没有传入路径则使用当前路径,fillRule为裁剪的规则
`isPointInPath()`   检测点是否在路径包围(包围的规则由参数定)的区域中
`isPointInStroke()`   检测点是否在路径边线上
`save()`    保存当前画笔的状态
`restore()`     还原上一次保存的状态

不常用、实验性：
`drawFocusIfNeeded()`
`getContextAttributes()`
`isContextLost()`
`measureText()` 返回一个关于被测量文本TextMetrics对象
`reset()`
`resetTransform()`
`roundRect(x, y, width, height, radii)` 绘制圆角矩形路径
`scrollPathIntoView()`


## Path2D构造函数
用于复用路径











