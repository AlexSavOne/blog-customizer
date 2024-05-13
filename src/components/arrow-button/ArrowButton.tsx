import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	onClick: () => void;
}

export const ArrowButton: React.FC<
	ArrowButtonProps & { isAsideOpen: boolean }
> = ({ onClick, isAsideOpen }) => {
	const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter') {
			onClick();
		}
	};

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${
				isAsideOpen ? styles.container_open : ''
			}`}
			onClick={onClick}
			onKeyUp={handleKeyUp}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isAsideOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
