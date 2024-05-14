import React, { useState, useEffect, useRef } from 'react';
import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import articleStyles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Select } from '../select';
import { Separator } from '../separator';
import clsx from 'clsx';
import { useOverlayClose } from './hooks/useOverlayClose';

interface ArticleParamsFormProps {
	applyChanges: (newState: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	applyChanges,
}) => {
	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const applyChangesHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		applyChanges(formState);
	};

	const resetForm = () => {
		setFormState(defaultArticleState);
		applyChanges(defaultArticleState);
	};

	const toggleAside = () => {
		setIsAsideOpen((prevState) => !prevState);
	};

	const handleClickOutside = () => {
		setIsAsideOpen(false);
	};

	useOverlayClose({
		isOpen: isAsideOpen,
		rootRef: asideRef,
		onClose: handleClickOutside,
	});

	const handleChange = (type: keyof ArticleStateType, value: OptionType) => {
		setFormState({
			...formState,
			[type]: value,
		});
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsAsideOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<>
			<ArrowButton onClick={toggleAside} isAsideOpen={isAsideOpen} />
			<aside
				ref={asideRef}
				className={clsx(articleStyles.container, {
					[articleStyles.container_open]: isAsideOpen,
				})}>
				<form className={articleStyles.form} onSubmit={applyChangesHandler}>
					<div className={articleStyles.title}>Задайте параметры</div>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => handleChange('contentWidth', option)}
						title='Ширина контента'
					/>
					<div className={articleStyles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
