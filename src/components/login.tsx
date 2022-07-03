import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { baseTheme } from '../styles/theme';

const Login = styled.div`
    width: 37%;
    height: 60vh;
    margin: auto;
    margin-top: 12%;

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
    font-size: ${baseTheme.font.size.x2};
`;

const Input = styled.input`
    box-sizing: border-box;
    padding-left: 3%;
    width: 100%;
    height: 5.5vh;
    border: none;
    border-radius: 8px;
    background-color: ${baseTheme.colors.background};
    font-size: ${baseTheme.font.size.x2};
    &:focus {
        outline: 2px solid ${baseTheme.colors.outline};
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
    font-size: ${baseTheme.font.size.x1};
    color: ${baseTheme.colors.warning};
    display: block;
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
    border: 1px solid ${baseTheme.colors.black};
    border-radius: 4px;
    cursor: pointer;
    outline: none;

    &:checked {
        background: ${baseTheme.colors.white};
        top: 1px;
    }
`;

const CheckboxLable = styled.label`
    display: inline-block;
    position: relative;
    bottom: 6px;
    padding-left: 2.5%;
    cursor: pointer;
    font-size: ${baseTheme.font.size.x2};
    
    ${Checkbox}:checked + &:after {
    content: "";
    opacity: 1;
    position: absolute;
    top: 0%;
    left: -22px;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    background-color: ${baseTheme.colors.blue};
    }
`;

const Button = styled.button`
    margin-top: 3vh;
    width: 100%;
    height: 5.5vh;
    background-color: ${baseTheme.colors.blue};
    color: ${baseTheme.colors.white};
    border: none;
    border-radius: 8px;
    font-size: ${baseTheme.font.size.x2};
    font-weight: ${baseTheme.font.bold};
    cursor: pointer;

    &:active {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    }

    &:disabled {
        background-color: ${baseTheme.colors.blueDisabled};
        cursor: unset;
        &:active {
            box-shadow: none;
        }
    }
`;

const NoUser = styled.div`
    box-sizing: border-box;
    margin-bottom: 2vh;
    padding-top: 1.6vh;
    padding-left: 3%;
    width: 100%;
    height: 5.5vh;
    background-color: ${baseTheme.colors.warningTransparent};
    border: 1px solid ${baseTheme.colors.warning};
    border-radius: 8px;
`;

const ExclamationMark = styled.div`
    box-sizing: border-box;
    margin-right: 3%;
    padding-left: 6px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: ${baseTheme.colors.lightPink};
    border-radius: 50%;
    color: ${baseTheme.colors.pink};
`;

interface LoginProps {
    changeLoginEmpty: (state: boolean) => void;
    changePasswordEmpty: (state: boolean) => void;
    setLogged: () => void;
    loginEmpty: boolean;
    passwordEmpty: boolean;
    login: string;
}


export default function LogIn (props: LoginProps): JSX.Element {
	const [login, setLogin] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [loading, setLoading] = React.useState<boolean>(false);
	const [noUser, setNoUser] = React.useState<boolean>(false);
	const [save, setSave] = React.useState<boolean>(false);
	const navigate = useNavigate();

	const handleChange = (e: React.SyntheticEvent): void => {
		const target = e.target as HTMLInputElement;
		if (target) {
			if(target.name === 'login'){
				setNoUser(false);
				setLogin(target.value);
				if (login) {
					props.changeLoginEmpty(false);
				}
			} else if(target.name === 'password'){
				setPassword(target.value);
				if (password) {
					props.changePasswordEmpty(false);
				}
			}
		}
	};

	const checkInputs = () => {
		if (!login || !password) {
			if (!login && !password) {
				props.changeLoginEmpty(true);
				props.changePasswordEmpty(true);
			} else if (!login) {
				props.changeLoginEmpty(true);
			} else if (!password) {
				props.changePasswordEmpty(true);
			}
			return;
		} else saveChanges();
	};

	const setCheckbox = (e: React.SyntheticEvent) => {
		const target = e.target as HTMLInputElement;
		setSave(target.checked);
	};

	const saveChanges = () => {
		setLoading(true);
		setTimeout(() => {
			if (!login.match(/steve.jobs@example.com/)) {
				setNoUser(true);
				setLoading(false);
			} else {
				setLoading(false);
				if (save) {
					console.log('im here');
					localStorage.setItem('authorisedUser', JSON.stringify(`login:${login}, password:${password}`));
				}
				props.setLogged();
				navigate('/home');
			}
		}, 2000);
	} ;


	return(
		<Login>
			{noUser && 
				<NoUser>
					<ExclamationMark>!</ExclamationMark>
					Пользователя {login} не существует
				</NoUser>
			}
			<InputBlock>
				<InputLabel htmlFor="unvalidEmailWarning">
                    Логин
				</InputLabel>
				<LoginInput loginEmpty={props.loginEmpty} type='text' name= 'login' value={login} onChange={handleChange} />
				<LoginInputWarning loginEmpty={props.loginEmpty}>Обязательное поле</LoginInputWarning>
			</InputBlock>
			<InputBlock>
				<InputLabel >
                    Пароль
				</InputLabel>
				<PasswordInput passwordEmpty={props.passwordEmpty} type='text' name='password' value={password} onChange={handleChange} />
				<PasswordInputWarning passwordEmpty={props.passwordEmpty}>Обязательное поле</PasswordInputWarning>
			</InputBlock>
			<Checkbox type ='checkbox' id="squaredCheckbox" onChange={setCheckbox}/>
			<CheckboxLable htmlFor='squaredCheckbox'>Запомнить пароль</CheckboxLable>
			<Button disabled = {loading} onClick={checkInputs}>Войти</Button>
		</Login>
	);
}
