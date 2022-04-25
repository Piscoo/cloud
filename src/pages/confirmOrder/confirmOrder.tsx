import { Link } from 'react-router-dom'
import './confirmOrder.scss'


const ConfirmOrder = (props) => {
	// const orderData = localStorage.getItem('customizeData');
	const customizeData = props.location.state?.customizeData;
	console.log(customizeData);
	const goBack = () => {
		props.history.push({pathname: '/customize', state: {customizeData}})
	}
	return (
		<>
			<div onClick={goBack}>test</div>
		</>
	)
}

export default ConfirmOrder