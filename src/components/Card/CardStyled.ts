import styled from "styled-components";
import { TMove } from "../../customTypes/types";

interface ButtonProps {
	direction: TMove;
}

export const CardContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 0.5rem;
	box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.3);
	border-radius: 3px;
	padding: 6px;
	&:not(:last-child) {
		margin-bottom: 1.2rem;
	}
`;

export const CardTitle = styled.big`
	display: block;
	flex: 1;
	text-align: center;
	font-size: 1.2rem;
`;

export const CardButton = styled.button<ButtonProps>`
	background-color: ${(props) => (props.direction === "next" ? "green" : "red")};
	border: none;
	border-radius: 3px;
	transition: 0.3s;

	&:not(:disabled) {
		cursor: pointer;
		&:hover {
			filter: brightness(1.3);
		}
	}

	&:disabled {
		opacity: 0.6;
	}

	svg {
		width: 50px;
		height: 25px;
		fill: white;
	}
`;
