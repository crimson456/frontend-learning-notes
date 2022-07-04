# Bootstrap Learning (v3.x)

## 一.容器
1. 固定容器：.container
|  类前缀  | 屏幕宽度 | 容器宽度(width) |
|  :----:  | :----: | :----: | 
|  xs  | <768px | auto | 
|  sm  | 768px~991px | 750px |
|  md  |992px~1199px|970px| 
|  lg  |≥1200px|	1170px|

(在v4.0中新增一档，且对应值变化)

2. 流体容器：.container-fluid
  auto




## 二.栅格系统

1. 源码分析：
  1. 变量定义在：`/less/variables.less`文件中定义了容器，栅格系统等等的基本数据，如不同类型设备下的宽度，栅格的列数，槽宽等等
  2. 入口为`/less/grid.less`文件，混合定义在`/less/mixin/grid.less`和`/less/mixin/grid-framework.less`中 
    首先定义固定容器和流体容器的宽度和内外边距和清除浮动，    
    然后定义行的外边距和清除浮动，   
    然后通过递归的方式定义不同设备下的不同列的内边距，浮动等样式，  
    最后递归定义列偏移和列排序的样式  
    (注意bootstrap中列column的内边距为正，作为槽宽，而行row的外边距为负，已达到嵌套不会改变效果，所以容器也要添加相同的内边距抵消)  
  3. `/less/mixin/grid.less` 中定义了自定义栅格的混合
2. 栅格系统使用:
  4. 基本使用：
    在容器中放入行和列，
    行的类名为：`row`
    列的类名为: `col-xs|sm|md|lg-0~12`
    每列的按html中的顺序占据对应类名数量的宽度依次排列，行内总宽大于12会另起一行  
    并且在每一列中可以嵌套行使用
  5. 列偏移和列排序:
    1. 列偏移的类名:`col-xs|sm|md|lg-offset-0~12`  
    列偏移可以将该列及其后面的元素都往后偏移对应数字的距离，并且超出会另起一行  
    1. 列排序的类名:`col-xs|sm|md|lg-pull|push-0~12`  
    其中，pull为向左移，push为向右移，数字为移动的距离      
    1. 区别：列偏移是利用margin-left实现的，列排序是利用相对定位实现的。列偏移只能向右偏移。列偏移超出后会另起一行，列排序会超出容器
  6. 去除槽宽：
    给行添加类名`row-no-gutters`
  7. 自定义使用：
    通过修改less文件中的变量可以修改槽宽，列数等等  
    

3. 自定义栅格：
  通过调用`/less/mixin/grid.less`文件中的混合`make-row`、`make-xs|sm|md|lg-column`、`make-xs|sm|mlg-column-offset|push|pull`来自定义一些类，生成语义化的固定栅格类,例子：
  ```less
  .wrapper {
    .make-row();
  }
  .content-main {
    .make-lg-column(8);
  }
  .content-secondary {
    .make-lg-column(3);
    .make-lg-column-offset(1);
  }
  ```
  ```html
  <div class="wrapper">
    <div class="content-main">...</div>
    <div class="content-secondary">...</div>
  </div>
  ```


## 三.文本

1. 为默认样式做了一定的样式优化修改，源码在`/less/type.less`文件中  
2. `h1`-`h6`,`small`,`mark`类，对应`<h1>`-`<h6>`,`<small>`,`<mark>`标签相同的样式  
3. 给`<p>`标签添加`lead`类突出显示段落
4. 添加了文本对齐类和文本大小写类，源码如下
```less
// Alignment
.text-left           { text-align: left; }
.text-right          { text-align: right; }
.text-center         { text-align: center; }
.text-justify        { text-align: justify; }
.text-nowrap         { white-space: nowrap; }

// Transformation
.text-lowercase      { text-transform: lowercase; }
.text-uppercase      { text-transform: uppercase; }
.text-capitalize     { text-transform: capitalize; }
```
5. 为`<blockquote>`标签添加`blockquote-reverse`类可以让引用内容右对齐
6. 一些简单的列表样式可以查文件



## 四.表格table
1. 外标签`<table>`上的类名
  * `table`  添加基本样式，必加(少量的padding和水平方向的分隔线)
  * `table-striped`  添加条纹样式
  * `table-bordered`  添加边框
  * `table-hover`  添加悬停项目阴影效果
  * `table-condensed`   让表格更加紧凑，单元格padding减半  

2. 单元行`<tr>`、单元格`<td>`、标题格`<th>`上的类名
  * `active`	鼠标悬停在行或单元格上时所设置的颜色(灰)
  * `success`	标识成功或积极的动作(绿)
  * `info`	标识普通的提示信息或动作(黄)
  * `warning`	标识警告或需要用户注意(红)
  * `danger`	标识危险或潜在的带来负面影响的动作(蓝)

3. 响应式表格(在768px以下出现滚动条)
  在外标签`<table>`外层包裹带有`table-responsive`类的`<div>`标签，可以创建响应式表格

4. eg.
  ```html
  <div class="table-responsive">
    <table class="table">
      <!-- On rows -->
      <tr class="active">...</tr>
      <tr class="success">...</tr>
      <tr class="warning">...</tr>
      <tr class="danger">...</tr>
      <tr class="info">...</tr>

      <!-- On cells (`td` or `th`) -->
      <tr>
        <td class="active">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
      </tr>
      ...
    </table>
  </div>
  ```


## 五.表单form,详细查看官网例子使用
1. 将表单控件(`input`、`textarea`、`select`)和`<lable>`标签包含在一个有`form-group`类的`<div>`中
2. 表单控件添加`form-control`类
3. 外标签`<form>`上的类名
  * `form-inline`类可以将表单变为行内(内联)左对齐格式
  * `form-horizontal`类可以将表单变为单行一个表单项的格式，并且表单项作为一个栅格系统的行row，并配合栅格类使用
4. 单选框和复选框
  一个表单项可以有多个单选或者复选框，可以在单一选择框外添加一个div，在此div中添加类，也可以在包含控件的label上添加类：
  * radio
  * radio-inline
  * checkbox
  * checkbox-inline
  * disabled
5. 校验状态：
  父元素添加has-warning，has-error，has-success类控件  
  父元素添加has-feedback类，并在子元素中添加有form-control-feedback类的图标
6. 表单项尺寸：
  input-lg，input-sm类可以为控件设置高度，通过栅格系统为控件设置宽度。  
  通过添加form-group-lg，form-group-sm类，为form-horizontal包裹的label元素和表单控件快速设置尺寸。


## 六.按钮
1. 可以作为按钮的标签：`<button>`,`<input>`，`<a>`（不作链接时必须添加role="button"）
2. 按钮上添加的预定义类：
  * btn：必加
  * btn-default,btn-success,btn-info,btn-warning,btn-danger,btn-link:颜色
  * btn-lg，btn-sm，btn-xs:大小
  * btn-block：拉伸至父元素100%的宽度，而且按钮也变为了块级（block）元素
  * active:激活状态
  * disabled:禁用状态



## 七.图片
1. 响应式图片：为`<img>`标签添加添加`img-responsive`类
2. 图片形状：为`<img>`标签添加类
  * img-rounded：带有圆角
  * img-circle：圆形
  * img-thumbnail：带有圆角边框

## 八.普通辅助类
1. 文本颜色类:可以给`<p>`标签添加类text-muted,text-primary,text-success,text-info,text-warning,text-danger
2. 背景颜色类：可以给`<p>`标签添加类bg-primary，bg-success，bg-info，bg-warning，bg-danger
3. 常用符号：
  * 关闭按钮的x号：
    ```html
    <button type="button" class="close" aria-label="Close"><span    aria-hidden="true">&times;</span></button>
    ```
  * 下三角符号:下拉菜单用
    ```html
    <span class="caret"></span>
    ```
4. 布局相关类：
  * pull-left，pull-right：可以添加左右浮动
  * center-block：通过margin属性让内容居中
  * clearfix：清除浮动
  * show和hidden：用于块级元素的显示和隐藏（使用了`!important`处理优先级）
  * invisible：用于影响元素的可见性
  * sr-only：对屏幕阅读器以外的设备隐藏内容
  * text-hide：隐藏元素的文本内容，但保持结构


5. 响应式显示和隐藏类:
   * visible-xs|sm|md|lg-block|inline|inline-block：对应display的三个值
   * hidden-xs|sm|md|lg
   * visible-print-block|inline|inline-block：针对打印机显示
   * hidden-print:针对打印机隐藏


## 九.组件和插件









