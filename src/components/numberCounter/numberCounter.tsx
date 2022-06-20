import { useEffect, useState } from 'react'
import { Input } from 'antd'
import "./numberCounter.scss"

const NumberCounter = (props) => {
	const {min, max, step, size, value, onChange, disabled} = props;
	const [inputStep, setInputStep] = useState<number>(step || 1);
	const [inputValue, setInputValue] = useState<number>(value);
	const changeInputValue = (type) => {
		if(disabled) return;
		let number: number;
		if(type == 'minus') {
			if(inputValue <= min) return;
			number =  inputValue - inputStep;
		} else {
			if(inputValue >= max) return;
			number =  inputValue + inputStep;
		}
		setInputValue(number);
		onChange(number);
	}

	const inputNumber = (e) => {
		let num = Number(e.target.value);
		if(!num) return;
		if(num <= min) {
			num = min;
			setInputValue(min);
		} else if(num >= max) {
			num = max;
			setInputValue(max);
		} else {
			setInputValue(num);
		}
		onChange(num);
	}
	
	return <div className="number-counter">
		<div className={`minus ${inputValue <= min || disabled ? 'disable' : ''}`} onClick={() => changeInputValue('minus')}>-</div>
		<Input disabled={disabled} value={inputValue} className={`value-input ${size == 'large' ? 'large' : ''}`} min={min} max={max} onChange={inputNumber} />
		<div className={`plus ${inputValue >= max || disabled ? 'disable' : ''}`} onClick={() => changeInputValue('plus')}>+</div>
	</div>

}

export default NumberCounter