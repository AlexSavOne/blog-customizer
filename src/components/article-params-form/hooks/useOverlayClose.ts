import { useEffect } from 'react';

type UseOverlayCloseProps = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLElement>;
	onClose: () => void;
};

export const useOverlayClose = ({
	isOpen,
	rootRef,
	onClose,
}: UseOverlayCloseProps) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				rootRef.current &&
				!rootRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, rootRef, onClose]);
};
