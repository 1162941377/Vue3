# 深入理解 vite

## vite vs webpack

1）webpack先分析模块的依赖关系，再合并编译打包，最后启动服务器；vite直接启动服务器，不进行任何处理

2）由于现代的浏览器都支持 ES module，vite充分利用这一点，将开发环境下的模块文件当作入口文件交给浏览器解析

3）vite的原理是当浏览器解析模块文件时，会实时编译并返回请求结果，项目越多、模块越复杂，vite的优势越明显

4）在HMR方面，vite的处理是当某个模块变动后，浏览器只要重新请求该模块即可；而不是像webpack样重新分析该模块的依赖关系，在合并编译打包返回请求结果

5）当环境是生产环境时，vite使用的传统的rollup，类似于webpack的一个打包工具，因此vite的优势体现在开发环境下

6）vite依托的是浏览器环境，因此只支持 ES module；webpack会返回解析后的结果，是一个普通的立即执行函数，因此不仅支持 ES
 module，同样也支持 CommonJs

## 效率的提升

*客户端渲染效率比vue2提升了1.3~2倍*
*SSR渲染比vue2提升了2~3倍*
*通过 const 声明，将其作用域扩大，以便于后续的访问*

### 静态提升

> 静态节点：普通的元素节点，没有动态绑定数据

> 静态属性：标签身上固定不变的特性或属性

### 预字符串化

> 当编译器遇到大量（20个及以上）的静态内容，会直接将其编译为一个普通的字符串节点

### 缓存事件处理函数

> 如果该处理函数是固定不变的，那么编译器会进行缓存

### Block Tree

> vue2对比新旧虚拟DOM数的时候，并不知道哪些节点是动态，哪些是静态的，因此只能一层层比较，这就造成了性能的开销；vue3依托于其强大的编译器，可以对动态节点标记，当改动时，只需要对比标记过的节点即可

> 正是由于vue3使用了一种全新的解决思路，相较于vue2，vue3的性能更出众，可以更好的支持 Tree Shaking，同样体积的代码经过打包后的体积更小

### PatchFlag

> vue2对比每一个节点时，并不知道这个节点的哪些信息会发生变化，因此只能将所有的信息依次对比，也造成了一定的性能浪费；vue3会将每一个节点身上的动态信息标记，当变动时，只需要对比该标记的内容是否变化即可

## Vue构造函数

> vue2的Vue构造函数带来了诸多问题：
    1、调用构造函数的静态方法会对所有的vue应用生效，不利于隔离不同的应用场景
    2、vue2的构造函数集成了太多的功能，不利于 tree shaking；vue3把这些当作普通函数导出，更利于 tree shaking，优化打包体积
    3、vue2没有把组件实例和vue应用两个概念区分，在vue2中，通过new Vue创建的对象，既是一个vue应用，又是一个特殊的vue组件；在vue3中，把两个概念区分，通过CreateApp创建的对象，只是一个vue应用，它内部提供的方法时针对整个vue应用，如果要调用静态方法，也不会对其它应用产生影响，也不是一个特殊的vue组件

> vue2和vue3实现响应式的原理：
    1、vue2内部使用的 Object.defineProperty，定义数据，完成响应式；vue3使用的是Proxy
    2、Proxy比Object.definePropery执行效率更高，当访问某个属性时，vue3会动态的获取和设置该属性值，这就极大程度上提升了在组件初始化阶段的执行效率
    3、由于Object.defineProperty自身的缺点，如果对对象进行新增、删除、索引访问成员时，无法监听该变化，因此提升了$set、$delete两个方法；vue3由于使用的是Proxy，这些问题都得以解决

## Vue双向数据绑定

> vue2中，实现双向数据绑定的办法有两种：v-model、.sync

> Vue3中去除了 .sync 语法糖，直接用 v-model 代替

```html vue2中
<ChildrenComponent :value="pageTitle" @input="pageTitle=$event" />
<!-- 简写为 -->
<ChildrenComponent v-model="pageTitle" />
```

```html vue3中
<ChildrenComponent modelValue="pageTitle" @upate:modelValue="pageTitle=$event" />
<!-- 简写为 -->
<ChildrenComponent v-model="pageTitle" />
```

```html vue2中
<ChildrenComponent :title="pageTilte" @update:title="pageTitle=$event" />
<!-- 简写为 -->
<ChildrenComponent :title.sync="pageTitle" />
```

```html vue3中
<ChildrenComponent :title="pageTitle" @update:title="pageTitle=$event" />
<!-- 简写为 -->
<ChildrenComponent v-model:tilte="pageTitle" />
```

*vue3允许自定义v-model修饰符，可以通过 . 的方式传递参数*

```html
<Comp v-model.cap="data1" v-model:text.cap="data2" />
<!-- 经过解析后的结果为： -->
modelValue: data,
modelModifiers: { cap: true },
text: data2,
textModifiers: { cap: true }
```

## v-if和v-for

> vue3中，修复了vue2两者之间的冲突，现在的v-if的优先级高于v-for的优先级

## key
1）vue3中，如果使用<template></template>标签的话，需要把key值放到该标签内；而不是像vue2的做法：放到标签中的子元素身上
2）当使用v-if、v-else分支的时候，vue3会自动分配唯一的key值；不再需要像vue2样手动添加

*不能因重用，给相同的key值*

## Fragment
> vue3允许多个标签；vue2只能允许一个根标签

*setup()：可以接收参数，props包含着组件间传递的信息，ctx包含着组件中的上下文*

## router路由
> vue2中通过 new Router 的方式创建路由组件；vue3删除了这个构造函数，而改用普通的函数 createRouter 创建

> vue2中，可以使用 mode，配置 浏览器的地址栏根据什么读取和设置，有两个值，分别是：hash、history；vue3中，移除了 mode 配置，改用 history 配置，可以通过引入 createWebHistory 函数，指定浏览器地址栏的跳转信息

> 在vue3可以配置异步路由组件，已达到懒加载的效果，通过引入 getAsyncPage 函数，导出是一个数组，各项是一个对象，包含 path、component 信息