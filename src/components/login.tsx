import React from 'react';
import styled from 'styled-components';

const Login = styled.div`
    width: 50%;
    height: 70vh;
    margin: auto;
    margin-top: 30%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const InputBlock = styled.div`
    height: 11vh;
`;

const InputLabel = styled.label`
    margin-bottom: 1%;
    display: block;
    font-size: 0.99em;
    font-weight: 500;
`;

const Input = styled.input`
    padding-left: 3%;
    width: 100%;
    height: 5.5vh;
    border: none;
    border-radius: 8px;
    background-color: #e2e2e25a;
    font-size: 0.99em;
    &:focus {
        outline: 2px solid #e2e2e2a0;
    }
`;

const Checkbox = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 22px;
    height: 22px;
    border: 1px solid #111;
    border-radius: 4px;
    cursor: pointer;
    outline: none;

    &:checked {
        background: #ffffff;
        top: 1px;
    }
`;

const CheckboxLable = styled.label`
    display: inline-block;
    position: relative;
    bottom: 6px;
    padding-left: 13px;
    cursor: pointer;
    
    ${Checkbox}:checked + &:after {
    content: "";
    opacity: 1;
    position: absolute;
    top: 0%;
    left: -22px;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    background-color: #006eff;
    }
`;

interface authorisedProps{
	handleChangeAuthorisation: () => void
}

export default function LogIn ({handleChangeAuthorisation}: authorisedProps){
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	const handleChange = (e: React.SyntheticEvent): void => {
		const target = e.target as HTMLInputElement;
		if (target) {
			if(target.name === 'email'){
				setEmail(target.value);
			} else if(target.name === 'password'){
				setPassword(target.value);
			}
		}
		
	};


	const saveChanges = () => {
		if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || password.length < 6) {
			if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
				document.getElementById('unvalidEmailWarning')?.classList.remove('inputBlock_warning__unactive');
				document.getElementById('unvalidEmailWarning')?.classList.add('inputBlock_warning');
			}
			if(password.length < 6) {
				document.getElementById('unvalidPasswordWarning')?.classList.remove('inputBlock_warning__unactive');
				document.getElementById('unvalidPasswordWarning')?.classList.add('inputBlock_warning');
			}
			return;
		}

		localStorage.setItem('authorisedUser', JSON.stringify(`email:${email}, password:${password}`));
		handleChangeAuthorisation();
	} ;


	return(
		<Login>
			<InputBlock>
				<InputLabel htmlFor="unvalidEmailWarning">
                    Логин
				</InputLabel>
				<Input type='text' name= 'email' id='emailInputSI' value={email} onChange={handleChange} />
			</InputBlock>
			<InputBlock>
				<InputLabel >
                    Пароль
				</InputLabel>
				<Input type='text' name='password' id='passwordInputSI' value={password} onChange={handleChange} />
			</InputBlock>
			<Checkbox type ='checkbox' id="squaredCheckbox"/>
			<CheckboxLable htmlFor='squaredCheckbox'>Запомнить пароль</CheckboxLable>
			<button className='signInBlock_button' onClick={saveChanges}>Submit</button>
		</Login>
	);
	
}
