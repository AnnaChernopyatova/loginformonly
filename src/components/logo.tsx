import React from 'react';
import styled from 'styled-components';

const Logotype = styled.h1`
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 600;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    width: fit-content;
    margin: auto;
    margin-top: 3%;
`;

export default function Logo(): JSX.Element {
	return (
		<Logotype>
            only.
		</Logotype>
	);
}
