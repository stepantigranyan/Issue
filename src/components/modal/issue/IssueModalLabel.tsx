import {type ChangeEvent, type Dispatch, type FC, memo, type SetStateAction, useState} from "react";
import {darkenHex} from "../../../utils/getDarkerHex";
import type {CSSProperties} from "react";

import {getOneLabel} from "../../../services/service.ts";
import type {Label} from "../../../models/label/label.type.ts";

export interface IssueModalLabelProps {
    defaultCheck: boolean;
    id: string;
    color: string;
    name: string;
    onCheck: Dispatch<SetStateAction<Label[]>>;
}

const IssueModalLabel: FC<IssueModalLabelProps> = ({id, color, name, onCheck, defaultCheck}) => {
    const [checked, setChecked] = useState<boolean>(defaultCheck);

    const handleToggleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.currentTarget;
        if (checked) {
            onCheck((prev) => ([...prev, getOneLabel(id)]));
        } else {
            onCheck((prev) => {
                return prev.filter((x) => x.id !== id)
            });
        }
        setChecked((prev) => !prev);
    }

    return (
        <label
               style={{"--color": color, '--checked-color': darkenHex(color, 0.3)} as CSSProperties}
               className={`cursor-pointer flex items-center justify-center px-3 py-2 text-xs bg-(--color) rounded-full justify-self-center has-checked:bg-(--checked-color) has-checked:outline-1 has-checked:outline-gray-800 has-checked:outline-offset-2`}
        >
            <span className="text-white">{name}</span>
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={handleToggleCheck}/>
        </label>
    );
};

export default memo(IssueModalLabel);