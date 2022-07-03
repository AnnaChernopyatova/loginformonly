import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { baseTheme } from '../styles/theme';

const Body = styled.div`
    margin-top: 24vh;
    display: flex;
    flex-direction: column;
    height: 10vh;
    width: 100vw;
    justify-content: space-between;
    align-items: center;
`;

const Greeting = styled.div`
    font-size: ${baseTheme.font.size.x3};
`;

const BoldText = styled.span`
    font-weight: ${baseTheme.font.bold};
`;

const Button = styled.button`
    width: 15vw;
    height: 4vh;
    border: none;
    border-radius: 5px;
    background-color: ${baseTheme.colors.background};
    color: ${baseTheme.colors.black};
    font-weight: ${baseTheme.font.bold};
`;

interface HomeProps {
    isLogged: boolean;
    login: string
}

export default function Home (props: HomeProps): JSX.Element {
	const navigate = useNavigate();
	const Navigate = (() => {
		navigate('/login');
	});

	React.useEffect(() => {
		if (!props.isLogged) {
			Navigate();
		}
	}, []);
	
	return (
		<Body>
			<Greeting>
            Здравствуйте, <BoldText>{props.login}</BoldText>
			</Greeting>
			<Button onClick={Navigate}>Выйти</Button>
		</Body>
	);
}