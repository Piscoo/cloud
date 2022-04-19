import { lazy } from 'react'

const Index = lazy(() => import('@/pages/index'));
const User = lazy(() => import('@/pages/user/user'));
const MyProduct = lazy(() => import('@/pages/products/products'));
const ProductDetail = lazy(() => import('@/pages/products/productDetail'));
const NotFound = lazy(() => import('@/pages/404'));
const Login = lazy(() => import('@/pages/login'));
// const Login = lazy(() => import('@/pages/login/loginForm'));
const Register = lazy(() => import('@/pages/login/register'));

const routers = [
	{
		path: '/',
		exact: true,
		component: Index,
		name: 'Index'
	},
	{
		path: '/index',
		component: Index,
		name: 'Index'
	},
	{
		path: '/user',
		component: User,
		name: 'User'
	},
	{
		path: '/404',
		component: NotFound,
	},
	{
		path: '/products',
		component: MyProduct,
	},
	{
		path: '/product/:id',
		component: ProductDetail,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/register',
		component: Register,
	}
]

export default routers