import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

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
			className={clsx(styles.container, {
				[styles.container_open]: isAsideOpen,
			})}
			onClick={onClick}
			onKeyUp={handleKeyUp}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: isAsideOpen,
				})}
			/>
		</div>
	);
};
