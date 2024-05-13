import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton, OnClick } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	title: 'Components/ArrowButton',
};

export default meta;

type Story = StoryObj<typeof ArrowButton>;

const handleClick: OnClick = () => {
	console.log('Button clicked!');
};

export const ArrowButtonStory: Story = {
	render: () => {
		const isAsideOpen = false;
		return (
			<>
				{}
				<ArrowButton onClick={handleClick} isAsideOpen={isAsideOpen} />
			</>
		);
	},
};
