import React from 'react';
import styled from 'styled-components';

const Login = styled.div`
    width: 70%;
    height: 70vh;
    margin: auto;
    margin-top: 30%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const InputBlock = styled.div`
    height: 15vh;
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
				<span >This field can not be empty</span>
				<span id='unvalidEmailWarning'>Please, write a valid email</span>
				
			</InputBlock>
			<InputBlock>
				<InputLabel >
                    Password
				</InputLabel>
				<Input type='text' name='password' id='passwordInputSI' value={password} onChange={handleChange} />
				<span className={password === '' ? 'inputBlock_warning' : 'inputBlock_warning__unactive'}>This field can not be empty</span>
				<span className='inputBlock_warning__unactive' id='unvalidPasswordWarning'>Password must be at least 6 symbols</span>
				
			</InputBlock>
			<button className='signInBlock_button' onClick={saveChanges}>Submit</button>
		</Login>
	);
	
}
