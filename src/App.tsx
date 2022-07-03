import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import LoginContext from './components/context/loginContext';
import Home from './components/Home';
import LogIn from './components/Login';
import Logo from './components/Logo';
import { baseTheme } from './styles/theme';


const Body = styled.div`
	margin: 0%;
  	width: 100%;
  	height: 100%;
  	box-sizing: border-box;
  	font-family: ${baseTheme.font.family};
`;

function App(): JSX.Element {
	const [loginEmpty, setLoginEmpty] = React.useState<boolean>(false);
	const [passwordEmpty, setPasswordEmpty] = React.useState<boolean>(false);
	const [isLogged, setIsLogged] = React.useState<boolean>(true);
	const [loginContext, setLoginContext] = React.useState<string>('');

	React.useEffect(():void => {
		const data:string|null = localStorage.getItem('authorisedUser');
		if (!data) {
			setIsLogged(false);
		} else {
			const regexp = /login:(.*?),/;
			const login = regexp.exec(data);
			if (login && typeof login[1] === 'string') {
				setLoginContext(login[1]);
			}
		}
	},[]);

	const changeLoginEmpty = (state: boolean) => {
		setLoginEmpty(state);
	};
	
	const changePasswordEmpty = (state: boolean) => {
		setPasswordEmpty(state);
	};

	const setLogged = () => {
		setIsLogged(true);
	};

	return (
		<LoginContext.Provider value={[loginContext, setLoginContext]}>
			<Body> 
				<Logo />
				<Routes>
					<Route path='/' element={<LogIn loginEmpty = {loginEmpty} setLogged = {setLogged} passwordEmpty = {passwordEmpty} changeLoginEmpty ={changeLoginEmpty} changePasswordEmpty = {changePasswordEmpty}/>} />
					<Route path='/home' element={<Home isLogged = {isLogged} />} />
				</Routes>
			</Body>
		</LoginContext.Provider>
	);
}

export default App;
