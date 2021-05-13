import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: function () {
        return import('../views/home/home.vue')
      }
    },
    {
      path: '/home',
      name: 'home',
      component: function () {
        return import('../views/home/home.vue')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: function () {
        return import('../views/login/login.vue')
      }
    },
    {
      path: '/register',
      name: 'register',
      component: function () {
        return import('../views/register/register.vue')
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: function () {
        return import('../views/forget/forget.vue')
      }
    },
    {
      path: '/market',
      name: 'market',
      component: function () {
        return import('../views/market/market.vue')
      }
    },
    {
      path: '/marketDetail',
      name: 'marketDetail',
      component: function () {
        return import('../views/market/marketDetail.vue')
      }
    },
    {
      path: '/tips',
      name: 'tips',
      component: function () {
        return import('../views/market/tips.vue')
      }
    },
    {
      path: '/order',
      name: 'order',
      component: function () {
        return import('../views/market/order.vue')
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: function () {
        return import('../views/market/pay.vue')
      }
    },
    {
      path: '/power',
      name: 'power',
      component: function () {
        return import('../views/power/power.vue')
      }
    },
    {
      path: '/powerDetail',
      name: 'powerDetail',
      component: function () {
        return import('../views/power/powerDetail.vue')
      }
    },
    {
      path: '/lianheWakuang',
      name: 'lianheWakuang',
      component: function () {
        return import('../views/lianheWakuang/lianheWakuang.vue')
      }
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: function () {
        return import('../views/transfer/transfer.vue')
      }
    },
    {
      path: '/service',
      name: 'service',
      component: function () {
        return import('../views/service/service.vue')
      }
    },
    {
      path: '/help',
      name: 'help',
      component: function () {
        return import('../views/help/help.vue')
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: function () {
        return import('../views/coupon/coupon.vue')
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: function () {
        return import('../views/wallet/wallet.vue')
      }
    },
    {
      path: '/wkWallet',
      name: 'wkWallet',
      component: function () {
        return import('../views/wallet/wkWallet.vue')
      }
    },
    {
      path: '/record',
      name: 'record',
      component: function () {
        return import('../views/wallet/record.vue')
      }
    },
    {
      path: '/security',
      name: 'security',
      component: function () {
        return import('../views/user/security.vue')
      }
    },
    {
      path: '/invite',
      name: 'invite',
      component: function () {
        return import('../views/user/invite.vue')
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: function () {
        return import('../views/user/orders.vue')
      }
    },
    {
      path: '/certification',
      name: 'certification',
      component: function () {
        return import('../views/user/certification.vue')
      }
    },
    {
      path: '/setLoginPwd',
      name: 'setLoginPwd',
      component: function () {
        return import('../views/user/setLoginPwd.vue')
      }
    },
    {
      path: '/setTradePwd',
      name: 'setTradePwd',
      component: function () {
        return import('../views/user/setTradePwd.vue')
      }
    },
    {
      path: '/powerBuy',
      name: 'powerBuy',
      component: function () {
        return import('../views/power/powerBuy.vue')
      }
    },
    {
      path: '/payMsg',
      name: 'payMsg',
      component: function () {
        return import('../views/power/payMsg.vue')
      }
    },
    {
      path: '/pls1',
      name: 'pls1',
      component: function () {
        return import('../components/plshelp/pls1.vue')
      }
    },
    {
      path: '/usdtPay',
      name: 'usdtPay',
      component: function () {
        return import('../views/market/usdtPay.vue')
      }
    },
    {
      path: '/supportHelp',
      name: 'supportHelp',
      component: function () {
        return import('../views/support/supportHelp.vue')
      }
    },
    {
      path: '/supportUser',
      name: 'supportUser',
      component: function () {
        return import('../views/support/supportUser.vue')
      }
    },
    {
      path: '/supportPrivacy',
      name: 'supportPrivacy',
      component: function () {
        return import('../views/support/supportPrivacy.vue')
      }
    },
    {
      path: '/supportLaw',
      name: 'supportLaw',
      component: function () {
        return import('../views/support/supportLaw.vue')
      }
    },
    {
      path: '/supportAbout',
      name: 'supportAbout',
      component: function () {
        return import('../views/support/supportAbout.vue')
      }
    },
  ]
})
