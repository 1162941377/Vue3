import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')

// 等同于

// const app = createApp(App);
// app.mount('#app');

/**
 * Vue2 和 Vue3 的区别：
 *   1）Vue3中没有构造函数 Vue，所有的方法都是通过实例化对象调用
 *   2）Vue3中除了 .js 后缀名可以省略外，所有的都必须加上后缀名
 *   3）Vue3兼容部分 Vue2 的写法，但是一般不用，setup 方法替换
 *   4）Vue2 的配置使用的是 options API；Vue3 使用的是 composition API；前者较松散，后者高度聚合
 *   5）Vue3 底层通过 Proxy 代理实现；Vue2 底层通过 defineProperty 实现响应式
 *   6）Vue2 中 <template></template> 标签中如果要写多个标签，需要在外面套上一个父标签；Vue3 中不需要，可以直接书写，支持多标签
 *   7）默认生成的 index.html Vue2 中的处理是放到 public 目录下；Vue3 则是直接放到 根目录下
 */

/**
 * setup 注意事项：
 *   1）setup 在 Vue 所有生命周期函数执行前调用，里面也没有 this；Vue2 中的 this 都指向该组件
 *   2）setup 返回的对象会直接挂载到该组件身上，可以在行间直接使用
 *   3）setup 中由于没有 this，如果要使用数据的话，可以通过数据名.value 访问值，在行间直接使用数据名即可，Vue 会帮我们处理
 *   4）如果要实现响应式，在一开始 import { ref } from 'vue'
 */