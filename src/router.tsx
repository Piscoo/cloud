import { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import routers from '@/router/index'

const Router = () => {
	const myRoutes = routers.map((item) => {
		return <Route key={item.path} {...item} component={item.component} />
	})
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>{myRoutes}</Switch>
		</Suspense>
	)
}

export default Router