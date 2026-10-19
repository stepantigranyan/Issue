import type {FC} from "react";

export interface ButtonProps {
    title: string;
    onSubmit: () => void;
    styles?: string;
}

const Button: FC<ButtonProps> = ({title, styles, onSubmit}) => {
    return (
        <button className={`cursor-pointer outline-none px-5 py-3 ${styles}`} onClick={onSubmit}>
            {title}
        </button>
    );
};

export default Button;