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
import { Text } from '../text';

interface ArticleParamsFormProps {
	applyChanges: (newState: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	applyChanges,
}) => {
	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement>(null);
	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		fontColors[0]
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(backgroundColors[0]);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		contentWidthArr[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		fontSizeOptions[0]
	);

	const applyChangesHandler = () => {
		applyChanges({
			fontFamilyOption: selectedFontFamily!,
			fontColor: selectedFontColor!,
			backgroundColor: selectedBackgroundColor!,
			contentWidth: selectedContentWidth!,
			fontSizeOption: selectedFontSize!,
		});
	};

	const toggleAside = () => {
		setIsAsideOpen((prevState) => !prevState);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			asideRef.current &&
			!asideRef.current.contains(event.target as HTMLElement)
		) {
			setIsAsideOpen(false);
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsAsideOpen(false);
		}
	};

	const resetForm = () => {
		setSelectedFontFamily(fontFamilyOptions[0]);
		setSelectedFontColor(fontColors[0]);
		setSelectedBackgroundColor(backgroundColors[0]);
		setSelectedContentWidth(contentWidthArr[0]);
		setSelectedFontSize(fontSizeOptions[0]);

		applyChanges(defaultArticleState);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<>
			<ArrowButton onClick={toggleAside} isAsideOpen={isAsideOpen} />
			<aside
				ref={asideRef}
				className={`${articleStyles.container} ${
					isAsideOpen ? articleStyles.container_open : ''
				}`}>
				<form className={articleStyles.form}>
					<Text size={31} dynamicLite weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedFontFamily}
						onChange={(option) => setSelectedFontFamily(option)}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={(option) => setSelectedFontSize(option)}
					/>
					<Select
						options={fontColors}
						selected={selectedFontColor}
						onChange={(option) => setSelectedFontColor(option)}
						title='Цвет шрифта'
					/>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={(option) => setSelectedBackgroundColor(option)}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={(option) => setSelectedContentWidth(option)}
						title='Ширина контента'
					/>
					<div className={articleStyles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button
							title='Применить'
							type='button'
							onClick={applyChangesHandler}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
