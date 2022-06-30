import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import LogIn from './components/login';
import Logo from './components/logo';

const Body = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
	const [authorised, setAuthorised] = React.useState<boolean>();

	const handleChange = () => {
		setTimeout(() => {
			setAuthorised(!authorised);
		}, 3000);
	};
	
	return (
		<Body> 
			<Logo />
			<Routes>
				<Route path='login' element={<LogIn handleChangeAuthorisation={handleChange}/>} />
			</Routes>
		</Body>
	);
}

export default App;


/* 
	
				<Route path='/' element={<Home />} />
*/