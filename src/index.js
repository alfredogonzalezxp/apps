import { useAuth } from './composables/useAuth';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/LoginView.vue'),
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('./views/BoardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    redirect: '/board',
  },
];

export default routes;

// Navigation Guard
export function setupRouterGuards(router) {
  router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useAuth();
    if (to.meta.requiresAuth && !isAuthenticated.value) {
      next({ name: 'Login' });
    } else if (to.name === 'Login' && isAuthenticated.value) {
      next({ name: 'Board' });
    } else {
      next();
    }
  });
}