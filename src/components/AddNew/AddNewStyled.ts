import styled from "styled-components";

export const AddNewContainer = styled.form`
	width: 100%;
	display: flex;
	gap: 1rem;
	align-items: center;
	input {
		padding: 1rem;
		border: 1px solid black;
		width: 250px;
		font-size: 1.2rem;
		font-weight: 600;
	}
	button {
		background-color: blue;
		padding: 5px 20px;
		height: 100%;
		border: none;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		svg {
			fill: white;
			width: 25px;
			height: 25px;
		}
	}
`;
