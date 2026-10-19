import {type ChangeEvent, type Dispatch, type FC, type SetStateAction, useState} from "react";
import {darkenHex} from "../../../utils/getDarkerHex";
import type {CSSProperties} from "react";

import {labelService} from "../../../services/service.ts";
import type {Label} from "../../../models/label/label.type.ts";

export interface IssueModalLabelProps {
    id: string;
    color: string;
    name: string;
    onCheck: Dispatch<SetStateAction<Label[]>>;
}

const IssueModalLabel: FC<IssueModalLabelProps> = ({id, color, name, onCheck}) => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleToggleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.currentTarget;
        if (checked) {
            onCheck((prev) => ([...prev, labelService.getOne(id)]));
        } else {
            onCheck((prev) => prev.filter((x) => x.id !== id));
        }
        setChecked((prev) => !prev);
    }

    return (
        <label
               style={{"--color": color, '--checked-color': darkenHex(color, 0.25)} as CSSProperties}
               className={`cursor-pointer flex items-center justify-center px-4 py-2 text-xs bg-(--color) rounded-full justify-self-center has-checked:bg-(--checked-color)`}
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

export default IssueModalLabel;