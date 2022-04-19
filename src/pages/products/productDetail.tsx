const productDetail = (props) => {
	console.log(props)
	return (
		<div className="layout-productDetail">
			ProductDetail
			{props.match.params.id}
		</div>
	)
}

export default productDetail