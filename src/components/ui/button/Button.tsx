import {type FC, type JSX, memo} from "react";

export interface ButtonProps {
    title: string | JSX.Element;
    onSubmit: () => void;
    styles?: string;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({title, styles, onSubmit, disabled}) => {
    return (
        <button
            disabled={disabled === undefined ? false : disabled}
            className={`cursor-pointer outline-none px-5 py-3 ${styles}`}
            onClick={onSubmit}
        >
            {title}
        </button>
    );
};

export default memo(Button);