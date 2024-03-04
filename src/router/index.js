import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/setup",
    name: "setup",
    component: () =>
      import("../views/SetupServerView.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () =>
      import("../views/HomeView.vue"),
  },
  {
    path: "/shop",
    redirect: '/shop/1',
    name: "shop",
    component: () =>
      import("../views/ShopView.vue"),
    children: [
      {
        path: "/shop/:id",
        name: "shopcategory",
        props: true,
        component: () =>
          import("../views/shop/ShopCategoryView.vue"),
      },
    ]
  },
  {
    path: "/product/:id",
    component: () =>
      import("../views/ShopProductView.vue"),
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: () =>
      import("../views/ShopCartView.vue"),
  },
  {
    path: "/message",
    name: "message",
    component: () =>
      import("../views/MessageView.vue"),
  },
  {
    path: "/notification",
    name: "notification",
    component: () =>
      import("../views/NotificationView.vue"),
  },
  {
    path: "/userfunction",
    name: "userfunction",
    component: () =>
      import("../views/UserFunctionView.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import("../views/UserView.vue"),
    children: [
      {
        path: 'info',
        name: "userinfo",
        component: () =>
          import("../views/user/UserInfoView.vue"),
      },
      {
        path: 'order',
        name: "userorder",
        component: () =>
          import("../views/user/UserOrderView.vue"),
      },
      {
        path: 'change',
        name: "userchange",
        component: () =>
          import("../views/user/UserChangeView.vue"),
      },
      {
        path: 'notification',
        name: "usernotification",
        component: () =>
          import("../views/user/UserNotificationView.vue"),
      },
    ]
  },
  {
    path: "/seller",
    redirect: '/seller/data',
    name: "seller",
    component: () =>
      import("../views/SellerView.vue"),
    children: [
      {
        path: 'data',
        name: "sellerdata",
        component: () =>
          import("../views/seller/SellerDataView.vue"),
      },
      {
        path: 'product',
        redirect: '/seller/product/list',
        children: [
          {
            path: 'list',
            component: () =>
              import("../views/seller/product/SellerProductListView.vue"),
            children: [],
          },
          {
            path: 'add',
            component: () =>
              import("../views/seller/product/SellerProductAddView.vue"),
            children: [],
          },
        ],
      },
      {
        path: 'order',
        name: "sellerorder",
        component: () =>
          import("../views/seller/SellerOrderView.vue"),
      },
      {
        path: 'finance',
        name: "sellerfinance",
        component: () =>
          import("../views/seller/SellerFinanceView.vue"),
      },
      {
        path: 'manager',
        name: "sellermanager",
        component: () =>
          import("../views/seller/SellerManagerView.vue"),
      },
    ]
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import("../views/AdminView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/authenticate/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import("../views/authenticate/RegisterView.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import("../views/404View.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () =>
      import("../views/404View.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
