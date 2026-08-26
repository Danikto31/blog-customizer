import { useRef, useState } from 'react';
import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Text } from '../../ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localState, setLocalState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef(null);

	useOutsideClickClose({ isOpen, rootRef, onChange: setIsOpen });

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setArticleState(localState);
	}

	function onChange(field: keyof ArticleStateType, option: OptionType) {
		setLocalState((obj) => ({
			...obj,
			[field]: option,
		}));
	}

	const handleReset = () => {
		setLocalState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={rootRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text uppercase weight={800} size={31} family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={localState.fontFamilyOption}
						onChange={(option) =>
							onChange('fontFamilyOption', option)
						}></Select>
					<RadioGroup
						name='fontRadio'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={localState.fontSizeOption}
						onChange={(option) =>
							onChange('fontSizeOption', option)
						}></RadioGroup>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={localState.fontColor}
						onChange={(option) => onChange('fontColor', option)}></Select>
					<div className={styles.separator}>
						<Separator></Separator>
					</div>

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={localState.backgroundColor}
						onChange={(option) => onChange('backgroundColor', option)}></Select>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={localState.contentWidth}
						onChange={(option) => onChange('contentWidth', option)}></Select>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
