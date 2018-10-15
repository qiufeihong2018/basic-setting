import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import xauditEdit from '@/components/xauditEdit'
import sensitiveWord from '@/components/sensitiveWord'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/xauditEdit',
      name: 'xauditEdit',
      component: xauditEdit
    },
    {
      path: '/sensitiveWord',
      name: 'sensitiveWord',
      component: sensitiveWord
    }
  ]
})
