# CSS Learning

## 一.选择器
1. 元素选择器：`标签名{}`
2. 类选择器：`.类名{}`
3. id选择器：`#id名{}`
4. 通配符选择器：`*{}`
5. 交集选择器：`选择器1选择器2选择器3{}`可嵌套多层,但是有元素选择器要放在前面
6. 并集选择器：`选择器1,选择器2,选择器3{}`以逗号分隔
7. 后代选择器：`选择器1 选择器2{}`以空格分隔
8. 子选择器：`选择器1>选择器2{}`以大于符号分隔
9. 相邻兄弟选择器：`选择器1+选择器2{}`以加号分隔
10. 普通兄弟选择器：`选择器1~选择器2{}`以波浪号分隔
11. 属性选择器：
    * `[attribute]{}`所有包含attribute属性的元素
    * `[attribute=value]{}`所有attribute属性等于value的元素
    * `[attribute^=value]{}`所有attribute属性以value开头的元素
    * `[attribute$=value]{}`所有attribute属性以value结尾的元素
    * `[attribute*=value]{}`所有attribute属性包含value的元素
    * `[attribute~=value]{}`所有attribute属性包含value且为独立单词(可用短横线分隔)的元素
    * `[attribute|=value]{}`所有attribute属性以value为开头的独立单词的元素
12. 伪类选择器：(不存在的类,特殊的类)
    * `:first-child`第一个子元素
    * `:last-child`最后一个子元素
    * `:nth-child(n)`第n个子元素,如果写2n或even则匹配偶数子元素,如果写2n+1或odd,则匹配奇数子元素,并且可以用公式如3n
    * `:nth-last-child(n)`倒数第n个子元素,其他同上
    * `:first-of-type`这四个用法同上,但是只选择和父元素相同的元素
    * `:last-of-type`
    * `:nth-of-type(n)`
    * `:nth-last-of-type(n)`
    * `:not(selector)`选择除了selector以外的元素
13. `<a>`标签相关的四个伪类：
    * `:link`未访问的链接----`<a>`标签独有
    * `:visited`已访问的链接(隐私原因只能修改字体颜色)----`<a>`标签独有
    * `:hover`鼠标划过链接
    * `:active`已选中的链接
14. 伪元素选择器：(不存在的元素,特殊的位置)
    * `::first-letter`第一个字母
    * `::first-line`第一行
    * `::selection`选中的文字
    * `::before`在文字之前(要结合content属性使用)
    * `::after`在文字之后(要结合content属性使用)

15. 选择器权重：
优先级关系：内联样式 > ID 选择器 > 类、属性、伪类选择器 > 标签、伪元素选择器  
可以进行权重计算,如果权重相同,则就近原则  
属性后面加上`!important`可将权重提升到最高




## 二.CSS属性
1. 背景相关
    * `background-color`背景颜色
    * `background-image:url(xxx)`背景图片
    * `background-repeat`背景图片重复，可选值:repeat(默认),repeat-x|y(只在水平垂直方向重复)，no-repeat(不重复)
    * `background-position:x y`背景图片起始位置，两个值，水平位置和垂直位置
    * `background-clip`包含背景显示位置，裁剪多余部分，可选值:border-box(默认)，padding-box，content-box
    * `background-origin`背景图片偏移量计算原点，可选值:padding-box(默认)，border-box，content-box
    * `background-size`背景图片拉伸的大小，两个值，宽度和高度(一个值，则高度为auto，比例不变)，其他可选值：contain(不拉伸)，cover(铺满，比例不变)

    * `background-attachment`设置背景图像是否固定或者随着页面的其余部分滚动，可选值：
        * `scroll`背景图片随着页面的滚动而滚动(默认)
        * `fixed`背景图片不会随着页面的滚动而滚动
        * `local`背景图片会随着元素内容的滚动而滚动
    * `background:bg-color、bg-position、bg-size、bg-repeat、bg-origin、bg-clip、bg-attachment、bg-image`
    * 渐变色背景
        1. 线性渐变：
            `background-image: linear-gradient(direction, color-stop1, color-stop2, ...)`  
            direction设置渐变的方向，可选值：to (left|right) (top|bottom)或一个角度(单位为deg)  
            color-stop有两个值，分别设置渐变结束的颜色和位置，可以设置多个（开始之间和结束之后都是纯色）  
            `background-image: repeating-linear-gradient(direction, color-stop1, color-stop2, ...)`  
            用法类似，但是会重复充满整个空间
        2. 径向渐变：（从中心向外部）
            `background-image: radial-gradient()`  
            `background-image: repeating-radial-gradient()`


2. 字体相关：font
    * `color`字体颜色
    * `font-size`字体大小
    * `font-family`文本字体系列,可选兜底值：serif(衬线字体),sans-serif(非衬线字体),monospace(等宽字体)
    * `font-style`指定文本的字体样式,控制正常显示,斜体,倾斜
    * `font-variant`以小型大写字体或者正常字体显示文本
    * `font-weight`字体粗细
    * `font:font-style font-variant font-weight font-size/line-height font-family`
    * 推荐字体图标库：fontawesome,iconfont
    * 指定服务端的字体：
        ```css
        @font-face{
            <!-- 必需，自定义的字体名称 -->
            font-family：xxx;
            <!-- 必须，定义字体的文件url -->
            src:url(xxx);
            <!-- 可选，定义字体如何拉伸 -->
            font-stretch:xxx;
            <!-- 可选，定义字体样式 -->
            font-style:xxx;
            <!-- 可选，定义字体粗细 -->
            font-weight:xxx;
            <!-- 可选，定义字体支持的unicode字符范围 -->
            unicode-range:xxx;
            ......
        }
        ```
    
3. 盒子尺寸相关：上右下左,顺时针
   1. Margin(外边距)   margin是透明的,且值可以为负
        * `margin-(top|right|bottom|left)`设置一个方向的内边距
        * `margin`设置四个方向的内边距,四个值,简写同边框
        * 外边距折叠现象：垂直方向相邻两个盒子之间会发生
        * 上下两个兄弟盒子之间的外边距,同正距取最大值,同负取最小值,一正一负取和
        * 子盒子与父盒子贴合,外边距会传递给父盒子,可以通过设置内边距或者边框解决
   2. Border(边框)  可以设置边框的 样式,宽度,颜色,圆角
        * 基础：顺序为：位置(top|right|bottom|left)、属性(width|style|color)
        * `border-(top|right|bottom|left)-(width|style|color)`设置一边边框一个属性
        * `border-(top|right|bottom|left)`设置一条边框的所有属性,三个值(可以只写一个)
        * `border-(width|style|color)`设置每条边框的一个属性,四个值  
            (简写：一个代表全部,两个代表上下,左右,三个值的代表上,左右,下)
        * `border：border-width border-style border-color`设置四条边框所有属性
        * 圆角：顺序为左上角,右上角,右下角,左下角
        * `border-(top|bottom)-(left|right)-radius`设置单一角的圆角值,两个值,水平半径和垂直半径,可简写为一个
        * `border-radius`设置每个角的圆角,四个值
            (简写：一个代表全部,两个代表左上右下,右上左下,三个代表左上,右上左下,右下)
        * 表格相关：
            * `border-collapse`为表格标签设置是否标签合并，可选值：separate（默认不合并），collapse(合并)
            * `border-spacing`为表格边框设置间距，一个值则代表所有间距，两个值则代表水平、垂直

   3. Padding(内边距) padding中颜色和背景颜色相同
        * `padding-(top|right|bottom|left)`设置一个方向的内边距
        * `padding`设置四个方向的内边距,四个值,简写同边框
   4. Content(内容)
        * `box-sizing`
            当值为`content-box`时,`width|height`为内容区宽高,  
            当值为`border-box`时,`width|height`为内容区+内边距+边框宽高
        * `width|height`宽高
        * `min|max-width|height`规定最低最高的宽度和高度(`min-height`可以用于解决高度塌陷的问题)
   5. 子盒子溢出
        * `overflow`属性,子元素超出父元素大小时的设置(可选值visible(默认)、hidden、scroll、auto、inherit)
        * `overflow-(x|y)`单独处理x轴和y轴方向的溢出,值同上
   6. 轮廓线：
        * `outline:outline-color outline-style outline-width`轮廓线,用法和border边框基本相同,但不会影响页面布局
        * `outline-offset`属性设置轮廓线在 border 边缘外的偏移
4. `display`属性,常用值:
    * `inline`行内元素,宽高(margin,border,padding)设置无用(可以设置,但不影响布局)
    * `block`块级元素
    * `inline-block`行内块,可以设置宽高(margin,border,padding),但是同行的行内块中间会有空格
    * `none`不会显示,且不占布局
    * `table-cell`单元格
    * `flex`弹性盒子
    * `inline-flex`行内弹性盒

5. `visibility`属性,可选值:visible(默认显示)和hidden(隐藏),占用布局
6. `box-shadow: h-shadow v-shadow blur spread color inset`六个值,依次是水平偏移,垂直偏移,模糊宽度,阴影总宽,阴影颜色,内嵌或外扩
    

7.  浮动相关：
    * `float`设置浮动和浮动方向,可选值：none(默认),left,right
    * `clear`指定段落的左侧或右侧不允许浮动的元素(清除浮动元素对当前元素的影响),可选值：none(默认),left,right,both

8.  定位相关：
    * `position`可选择：static(默认，不定位)、relative(相对定位)、absolute(绝对定位)、sticky、fixed(固定定位)
    * `top|bottom|left|right`各个方向的偏移量，可以为负值，横行纵向只用一个
    * `z-index`整数，设置层级，数值越高，越优先显示

  
9.  文本相关：
    * `line-height`设置行高
    * `direction`设置文本顺序，可选值：ltr(从左到右)，rtl(从右到左)
    * `letter-spacing`设置字符间距(中文字间距也是此属性)
    * `word-spacing`设置单词间距
    * `text-indent`设置首行文本缩进
    * `text-transform`控制文本的大小写
    * `text-shadow：h-shadow v-shadow blur color`设置文字阴影，用法类似`box-shadow`
    * 对齐方式：
        * `text-align`设置水平对齐方式，可选值：left(左对齐),right(右对齐),center(中间对齐),justify(两端对齐)
        * `vertical-align`设置垂直对齐方式，常用可选值：baseline(默认基线对齐)，top(顶端对齐),bottom(底部对齐),middle(中间对齐),数值或百分比
    * `text-decoration-line|color|style|thickness`设置文本修饰线条的位置颜色类型粗细
    * `text-decoration`为以上四种的复合属性
    * `white-space`设置文本空白的处理方式，常用值：normal(默认处理为1个),pre(保留空白),nowrap(不换行)......
    * `text-overflow`设置溢出文本的处理，如用省略号代替，配合`white-space: nowrap`和`overflow: hidden`使用，常用值：clip(裁剪),ellipsis(省略号),或者用一个字符串修饰
    * 



10. 过渡：（transition）(可以结合伪类hover使用)
    * `transition-property`过渡效果的属性，多个属性用逗号分个，也可none，all（默认）
    * `transition-duration`过渡效果时间
    * `transition-timing-function`过渡效果的速度，可以用函数cubic-bezier(n,n,n,n)定义平滑的过渡效果或者steps()定义分步的过渡效果，有几个常用值
    * `transition-delay`延时进行过渡效果
    * `transition: property duration timing-function delay`
11. 动画：(animation、@keyframes)
    * 创建关键帧(定义动画的效果)
        ```css
        @keyframes 关键帧名{
            from{...}
            to{...}
            <!-- 或者用百分比写法 -->
            0%{...}
            100%{...}
        }
        ```
    * 使用：
        * `animation-name`指定要绑定到选择器的关键帧的名称
        * `animation-duration`设置动画时间
        * `animation-timing-function`设置动画的执行函数，同过渡中相同
        * `animation-delay`设置动画在启动前的延迟间隔。
        * `animation-iteration-count`定义动画的播放次数,可选值：次数,infinite
        * `animation-direction`设置动画播放的正反向，可选值：normal(默认正向),reverse(反向),alternate(正反交替),alternate-reverse(反正交替)
        * `animation-fill-mode`设置动画播放前，完成后，是否将样式应用到目标元素，可选值：none(默认，无应用),forwards(播放结束后应用),backwards(延迟播放前应用),both(都应用)
        * `animation-play-state`指定动画播放状态
        * `animation: name duration timing-function delay iteration-count direction fill-mode play-state`

12. 转换：（transform）  
    * `transform-style: flat|preserve-3d`呈现为2D或3D
    * `perspective:z-axis`定义视角于平面的距离，即z轴(注意是当前元素的轴，在子素中写转换)，默认值none
    * `perspective-origin: x-axis y-axis`定义视角位置，默认值50%，50%（父元素的）
    * `transform-origin: x-axis y-axis z-axis`定义视图的基点
    * `backface-visibility`当呈现为3D时是否
    * 转换函数：`transform:转换函数`
        * `translate(x,y)`平移转换，值为像素或百分比，可负
        * `translate3d(x,y,z)`
        * `translateX(x)`
        * `translateY(y)`
        * `translateZ(z)`
        * `rotate(angle)`旋转转换,正值为角度，可负，单位deg
        * `rotate3d(x,y,z,angle)`绕(x，y，z)向量轴旋转，x，y，z为数字
        * `rotateX(angle)`
        * `rotateY(angle)`
        * `rotateZ(angle)`
        * `scale(x,y)`缩放转换,值为数字
        * `scale3d(x,y,z)`
        * `scaleX(x)`
        * `scaleY(y)`
        * `scaleZ(z)`
        * `skew(x-angle,y-angle)`倾斜转换，值为X轴和Y轴倾斜角度，单位deg
        * `skewX(x-angle)`
        * `skewY(y-angle)`
        * `matrix()`矩阵方程转换,6个值
        * `matrix3d()`16个值
        * `perspective(n)`   

13. flex布局相关(弹性盒模型):`display:flex|inline-flex`
    * 容器上的属性：
        * `flex-direction:row|row-reverse|column|column-reverse`主轴方向，默认row，水平
        * `flex-wrap:nowrap|wrap|wrap-reverse`定义轴线，超出后换行
        * `flex-flow:flex-direction flex-wrap`简写属性
        * `justify-content: flex-start|flex-end|center|space-between|space-around|space-evenly`主轴上的对齐方式
            * flex-start（默认）：左对齐
            * flex-end：右对齐
            * center：居中
            * space-between：两端对齐，项目之间的间隔都相等
            * space-around：每个项目两侧的间隔相等
            * space-evenly：从主轴起始到结束的间距相等
        * `align-items:flex-start|flex-end|center|baseline|stretch`副轴上的对齐方式
            * flex-start：交叉轴的起点对齐
            * flex-end：交叉轴的终点对齐
            * center：交叉轴的中点对齐
            * baseline: 与子元素的第一行文字的基线对齐
            * stretch（默认）：如果项目未设置高度或设为auto，将占满整个容器的高度
        * `align-content:flex-start|flex-end|center|space-between|space-around|stretch`属性定义多根轴线的对齐方式，如果只有一根轴线，该属性不起作用
            * flex-start：与交叉轴的起点对齐
            * flex-end：与交叉轴的终点对齐
            * center：与交叉轴的中点对齐
            * space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
            * space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
            * stretch（默认值）：轴线占满整个交叉轴。 
            * start:效果同flex-start（不确定）？？？
            * end:效果同flex-end
    * 子元素上的属性：
        * `order`子元素排列的顺序，数值越小越靠前，默认为0，等值时按html中顺序
        * `flex-grow`子元素的放大权重，默认为0，不放大(即有剩余空间则按各元素的权重分配)
        * `flex-shrink`子元素的缩小权重，默认为1(容器控件不足时按个元素权重进行缩小)
        * `flex-basis`子元素的主轴长度（剩余空间计算的一句），可选值：auto(默认，即等于子元素的本来大小)，content(根据内容而定)，长度值
        * `flex:flex-grow flex-shrink flex-basis`简写属性
        * `align-self: auto | flex-start | flex-end | center | baseline | stretch`与align-items属性完全一致

14. grid布局相关:
    * 容器上的属性：`display:grid|inline-grid`
        * 分隔线： 
            * `grid-template-columns|rows`根据值的个数和大小定义列数和列宽（行数和行高）（定义分隔线）
                * `repeat()`简写相同的值，例`grid-template-columns: repeat(3, 33.33%)`
                * `auto-fill`自动填充，例`grid-template-columns: repeat(auto-fill, 100px)`
                * `fr`表示权重，例`grid-template-columns: 150px 1fr 2fr`
                * `minmax()`，例`grid-template-columns: 1fr 1fr minmax(100px, 1fr)`
                * `auto`浏览器自己决定长度
                * `[]`指定网格线名称，例`grid-template-columns:[c1] 100px [c2] 100px [c3] auto [c4]`
            * `grid-auto-columns|rows`定义默认的列宽(行宽)
        * 间距：
            * `grid-row|column-gap`指定行或者列间距->更名：`row|column-gap`
            * `grid-gap: grid-row-gap grid-column-gap`简写属性，只写一个值则都是
        * 区域：
            * `grid-template-areas` 指定一个网格区域，同名会合并为一个区域，`.`表示不许需   要利用的区域
                ```css
                 grid-template-areas:   'a b c'
                                        'd e f'
                                        'g h i';
                ```
        * 排列顺序：
            * `grid-auto-flow:row|column|row dense|column dense`定义未规定（默认的）元素的排列顺序，默认row (先行后列)，dense关键字代表是否密排(后面的元素时候会查找前面的缝隙插入)
        * 子元素不能占满内容区时整体的排列：
            * `justify-content`整个内容区域在容器里面的水平位置（左中右）,值同下
            * `align-content`整个内容区域的垂直位置（上中下）
                * start：对齐容器的起始边框
                * end：对齐容器的结束边框
                * center：容器内部居中
                * stretch：项目大小没有指定时，拉伸占据整个网格容器
                * space-between：项目与项目的间隔相等，项目与容器边框之间没有间隔
                * space-evenly：项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。 
            * `place-content:align-content justify-content`简写属性
        * 单个子元素内部的内容排列方式：
            * `justify-items:start|end|center|stretch`设置单元格内容的水平位置
            * `align-items: start|end|center|stretch`设置单元格内容的垂直位置
                * start：对齐单元格的起始边缘
                * end：对齐单元格的结束边缘
                * center：单元格内部居中
                * stretch：拉伸，占满单元格的整个宽度（默认值） 
            * `place-items:align-items justify-items`简写属性
        * 复杂简写：(尽量不用)
            * `grid-template:grid-template-rows/grid-template-columns|grid-template-areas`简写属性
            * `grid`grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns,grid-auto-flow 的简写属性
    * 子元素上的属性
        * 单个元素的排列位置，出现重叠用`z-index`确定层级
        * （未规定则按`grid-auto-flow`中规定的排列）
            * `grid-column-start`左边框所在的垂直网格线,可以指定为数字，别名，或者`span 跨越的网格线数`
            * `grid-column-end`右边框所在的垂直网格线
            * `grid-row-start`上边框所在的水平网格线
            * `grid-row-end`下边框所在的水平网格线
            * `grid-column:grid-column-start/grid-column-end`简写属性
            * `grid-row:grid-row-start/grid-row-end`简写属性
            * `grid-area`指定子元素放置的区域（`grid-template-areas`中定义）或者`grid-area：grid-row-start grid-column-start grid-row-end grid-column-end`简写属性
        * 单个元素中的内容排列方式
            * `justify-self`用法同`justify-items`相同，但只对单个子元素生效
            * `align-self`用法同`align-items`相同，但只对单个子元素生效
            * `place-self:align-self justify-self`简写属性


15. `content`属性,结合`::before`和`::after`使用,可在段首尾添加不可选中的内容,图片
16. ``
17. 
18. ``
19. ``
20. 列表相关:(无序列表有序列表通用)给ul,ol标签添加,而不是列表项
    * `list-style-type`设置列表项前面的标记,常用值none(去除标记),标记可查文档
    * `list-style-position`设置列表项前面标记的位置,可选值:inside和outside
    * `list-style-image`设置列表项前的图片标记,值为`url('地址')`,图片无法加载时回退到`list-style-type`指定的标记
    * `list-style: list-style-type list-style-position list-style-image`
21. ``





## 三.盒子模型
![盒子模型图片](box-model.gif)
* Margin(外边距) - 清除边框外的区域,外边距是透明的  
* Border(边框) - 围绕在内边距和内容外的边框  
* Padding(内边距) - 清除内容周围的区域,内边距是透明的  
* Content(内容) - 盒子的内容,显示文本和图像  



## 四.布局相关

1. 浏览器默认布局
    * body会有一个margin值
    * p会有一个margin值
    * ul会有margin和padding值,且前面有符号,用`list-style:none`去除
    * 解决方法：(使用cssformat文件下的重置样式表reset.css或normalize.css)
        ```css
        /* 简单解决 */
        *{
            margin:0;
            padding:0;
        }
        ul{
            list-style:none
        }
        ```


2. 浮动
    * 浮动后的元素脱离文档流，不论行内元素还是块元素，都不独占一行，可以设置宽高，且默认宽高为被内容撑开
    * BFC(block formatting context)块级格式化环境作用：内部的浮动元素会撑开盒子
    * 开启BFC的方法：浮动、设置为行内块元素、设置overflow值(常用,不会影响宽度)......
    * 浮动后产生高度塌陷(子盒子浮动后父盒子无元素撑开)的问题，解决方法：
        1. 父盒子开启BFC,一般用`overflow:hidden`
        2. 父盒子伪元素空内容开启BFC就可撑开盒子,使用中只需添加clearfix类，同时可解决外边距重叠的问题
        ```css
        .clearfix::before,
        .clearfix::after{
            content:'';
            display:table;
            clear:both;
        }
        ```
3. 定位
    1. `position：relative`设置相对定位
        * 相对定位会占用文档流原位置，通过`top|bottom|left|right`设置偏移量
    2. `position：absolute`设置绝对定位
        * 绝对定位不占位置，相对于最近定位的父元素定位，直到<html>
        * 绝对定位会提升一个层级
        * 层级一致时会优先显示写在下方的元素
    3. `position：fixed`设置固定定位
        * 固定定位视口为参照设置偏移量
    4. `position：sticky`设置粘性定位
        * 粘性定位的偏移量为判断标准，小于偏移量是表现为无偏移量的相对定位，大于偏移量时表现为固定定位

4. css变量和函数(兼容性差，不用)
    * 变量必须以--开头
    * 使用时用`var(custom-property-name, value)`函数插入
    * `calc(expression)`函数用于动态计算属性值


5. 视口和vw适配
    * 手机端默认视口为980px，超过980px自动调整，能看全整个网页
    * 像素比为最佳像素比的视口为完美视口
    * 100vw=视口宽度
    * 1px=100/视口宽度 vw
    * 通过vw单位设置根元素的字体大小设置1rem的大小（注意最小为12），就能用rem在css中使用了



 
6. 媒体查询
    * 语法：
        ```css
        @media not|only|all mediatype and (expressions) and (expressions) {
        ......
        }
        ```
    * expressions中的参数：
        * width:宽度
        * orientation:屏幕方向，可选值：portrait(纵向，高度大于等于宽度)，landscape(横向，宽度大于高度)
        * ......
    * 可以添加',',来添加不同的媒体查询




7. 引入外部css
    * `@import url("")|"url" mediaqueries`

## 五.相关概念
1. 长度单位：
   * `px`     像素
   * `%`      百分比
   * `em`     相对当前元素的字体大小(1em=font-size)
   * `rem`    相对于根元素的字体大小,html元素的
   * `vw`     100vw=视口宽度（viewport width）
   * 
2. 颜色单位：RGB(red,green,blue)
    * `rgb(R,G,B)`       RGB值在0~255之间
    * `rgba(R,G,B,A)`    A为透明度0~1之间
    * `#ffffff`          十六进制表示
    * 还有HSL和HSLA颜色,不常用,可查文档


## 六.常见问题记录

1. 边框border会撑大盒子，加入边框时要维持原大小，需要将盒子的宽高变小
2. 设置边框时border-style必须指定，否则不显示
3. 计算盒子大小是从border开始算的，父盒子中排列子盒子，如果子盒子有margin，则margin部分可能会超出
























