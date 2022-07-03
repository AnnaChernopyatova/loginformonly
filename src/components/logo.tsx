import React from 'react';
import styled from 'styled-components';
import { baseTheme } from '../styles/theme';

const Logotype = styled.h1`
    text-transform: uppercase;
    font-size: ${baseTheme.font.size.x4};
    font-weight: ${baseTheme.font.bold};
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
