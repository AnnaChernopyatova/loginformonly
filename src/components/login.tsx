import React from 'react';
import styled from 'styled-components';

const Login = styled.div`
    box-sizing: border-box;
    width: 37%;
    height: 60vh;
    margin: auto;
    margin-top: 10%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;

    @media screen and (min-width: 500px) and (max-width: 1200px) {
        width: 60%;
        margin-top: 15%;
    }
`;

const InputBlock = styled.div`
    height: 12.5vh;
`;

const InputLabel = styled.label`
    margin-bottom: 1vh;
    display: block;
    font-size: 0.99em;
    font-weight: 500;
`;

const Input = styled.input`
    box-sizing: border-box;
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

const LoginInput = styled(Input)<{loginEmpty: boolean}>`
    &:focus {
        outline: ${props => props.loginEmpty && '1px solid#df8282'};
        caret-color: ${props => props.loginEmpty && '#df8282'};
    }
`;

const PasswordInput = styled(Input)<{passwordEmpty: boolean}>`
    &:focus {
        outline: ${props => props.passwordEmpty && '1px solid #df8282'};
        caret-color: ${props => props.passwordEmpty && '#df8282'};
    }
`;

const InputWarning = styled.p`
    margin-top: 1%;
    font-size: 0.8em;
    color: #df8282;
`;

const LoginInputWarning = styled(InputWarning)<{loginEmpty: boolean}>`
    display: ${props => !props.loginEmpty && 'none'};
`;

const PasswordInputWarning = styled(InputWarning)<{passwordEmpty: boolean}>`
    display: ${props => !props.passwordEmpty && 'none'};
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
    padding-left: 2.5%;
    cursor: pointer;
    font-size: 0.97em;
    
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

const Button = styled.button`
    margin-top: 3vh;
    width: 100%;
    height: 5.5vh;
    background-color: #006eff;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.97em;
    font-weight: 600;
    cursor: pointer;

    &:active {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    }
`;

interface LoginProps {
	handleChangeAuthorisation: () => void;
    changeLoginEmpty: () => void;
    changePasswordEmpty: () => void;
    loginEmpty: boolean;
    passwordEmpty: boolean;
}


export default function LogIn (props: LoginProps): JSX.Element {
	const [login, setLogin] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	const handleChange = (e: React.SyntheticEvent): void => {
		const target = e.target as HTMLInputElement;
		if (target) {
			if(target.name === 'login'){
				if (!login) {
					props.changeLoginEmpty();
				}
				setLogin(target.value);
			} else if(target.name === 'password'){
				if (!password) {
					props.changePasswordEmpty();
				}
				setPassword(target.value);
			}
		}
	};

	const checkInputs = () => {
		if (!login || !password) {
			if (!login && !password) {
				props.changeLoginEmpty();
				props.changePasswordEmpty();
			} else if (!login) {
				props.changeLoginEmpty();
			} else if (!password) {
				props.changePasswordEmpty();
			}
			return;
		} else saveChanges;
	};

	const saveChanges = () => {
		if (!login.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || password.length < 6) {
			if(!login.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
				document.getElementById('unvalidEmailWarning')?.classList.remove('inputBlock_warning__unactive');
				document.getElementById('unvalidEmailWarning')?.classList.add('inputBlock_warning');
			}
			if(password.length < 6) {
				document.getElementById('unvalidPasswordWarning')?.classList.remove('inputBlock_warning__unactive');
				document.getElementById('unvalidPasswordWarning')?.classList.add('inputBlock_warning');
			}
			return;
		}

		localStorage.setItem('authorisedUser', JSON.stringify(`login:${login}, password:${password}`));
		props.handleChangeAuthorisation();
	} ;


	return(
		<Login>
			<InputBlock>
				<InputLabel htmlFor="unvalidEmailWarning">
                    Логин
				</InputLabel>
				<LoginInput loginEmpty={props.loginEmpty} type='text' name= 'login' id='loginInputSI' value={login} onChange={handleChange} />
				<LoginInputWarning loginEmpty={props.loginEmpty}>Обязательное поле</LoginInputWarning>
			</InputBlock>
			<InputBlock>
				<InputLabel >
                    Пароль
				</InputLabel>
				<PasswordInput passwordEmpty={props.passwordEmpty} type='text' name='password' id='passwordInputSI' value={password} onChange={handleChange} />
				<PasswordInputWarning passwordEmpty={props.passwordEmpty}>Обязательное поле</PasswordInputWarning>
			</InputBlock>
			<Checkbox type ='checkbox' id="squaredCheckbox"/>
			<CheckboxLable htmlFor='squaredCheckbox'>Запомнить пароль</CheckboxLable>
			<Button onClick={checkInputs}>Войти</Button>
		</Login>
	);
	
}
