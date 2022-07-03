import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { baseTheme } from '../styles/theme';
import LoginContext from './context/loginContext';

const Body = styled.div`
    margin-top: 24vh;
    display: flex;
    flex-direction: column;
    height: 10vh;
    width: 100vw;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-height: 700px) {
        height: 15vh;
    }
`;

const Greeting = styled.div`
    text-align: center;
    font-size: ${baseTheme.font.size.x3};
`;

const BoldText = styled.span`
    font-weight: ${baseTheme.font.bold};
`;

const Button = styled.button`
    width: 15vw;
    min-width: 90px;
    height: 4vh;
    min-height: 35px;
    border: none;
    border-radius: 5px;
    background-color: ${baseTheme.colors.background};
    color: ${baseTheme.colors.black};
    font-weight: ${baseTheme.font.bold};
`;

interface HomeProps {
    isLogged: boolean;
}

export default function Home (props: HomeProps): JSX.Element {
	const navigate = useNavigate();
	const [loginContext, setLoginContext] = useContext(LoginContext);
	const Navigate = (() => {
		navigate('/');
	});

	React.useEffect(() => {
		if (!props.isLogged) {
			Navigate();
		}
	}, []);
	
	return (
		<Body>
			<Greeting>
            Здравствуйте, <BoldText>{loginContext}</BoldText>
			</Greeting>
			<Button onClick={Navigate}>Выйти</Button>
		</Body>
	);
}