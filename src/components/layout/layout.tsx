import Header from "@/components/header/header"
// import "./layout.scss"

const Layout = ({ children }) => {
	return (
		<div style={{ width: `100%`, height: `100%` }}>
			<Header />
			<>
				<main>{children}</main>
			</>
		</div>
	)
}

export default Layout