import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import LogIn from './components/login';
import Logo from './components/logo';

const Body = styled.div`
  width: 100%;
  height: 100%;
`;

function App(): JSX.Element {
	const [authorised, setAuthorised] = React.useState<boolean>();

	const [loginEmpty, setLoginEmpty] = React.useState<boolean>(false);
	const [passwordEmpty, setPasswordEmpty] = React.useState<boolean>(false);

	const handleChange = () => {
		setTimeout(() => {
			setAuthorised(!authorised);
		}, 3000);
	};

	const changeLoginEmpty = () => {
		setLoginEmpty(!loginEmpty);
	};
	
	const changePasswordEmpty = () => {
		setPasswordEmpty(!passwordEmpty);
	};

	return (
		<Body> 
			<Logo />
			<Routes>
				<Route path='login' element={<LogIn handleChangeAuthorisation={handleChange} loginEmpty = {loginEmpty} passwordEmpty = {passwordEmpty} changeLoginEmpty ={changeLoginEmpty} changePasswordEmpty = {changePasswordEmpty}/>} />
			</Routes>
		</Body>
	);
}

export default App;


/* 
	
				<Route path='/' element={<Home />} />
*/