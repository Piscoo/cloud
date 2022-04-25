import { lazy } from 'react'

const Index = lazy(() => import('@/pages/index'));
const User = lazy(() => import('@/pages/user/user'));
const MyProduct = lazy(() => import('@/pages/products/products'));
const ProductDetail = lazy(() => import('@/pages/products/productDetail'));
const NotFound = lazy(() => import('@/pages/404'));
const Login = lazy(() => import('@/pages/login'));
const Register = lazy(() => import('@/pages/login/register'));
const Customize = lazy(() => import('@/pages/customize/customize'));
const ConfirmOrder = lazy(() => import('@/pages/confirmOrder/confirmOrder'));

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
		name: 'User',
		exact: true
	},
	{
		path: '/404',
		component: NotFound,
	},
	{
		path: '/user/products',
		component: MyProduct,
		exact: true
	},
	{
		path: '/user/products/:id',
		component: ProductDetail,
		exact: true
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/register',
		component: Register,
	},
	{
		path: '/customize',
		component: Customize
	},
	{
		path: '/confirm-order',
		component: ConfirmOrder
	}
]

export default routers