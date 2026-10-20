import {type ChangeEvent, type FC, useState} from "react";
import type {Modal} from "../types.ts";
import type {LabelAttributes} from "../../../models/label/label.type.ts";
import Popup from "../../ui/popup/Popup.tsx";
import Button from "../../ui/button/Button.tsx";

import {createLabel} from "../../../services/service.ts";

const LabelAddModal: FC<Modal> = ({onCancel}) => {
    const [name, setName] = useState<string>("");
    const [color, setColor] = useState<string>("#000000");

    const handleInputName = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setName(value);
    };

    const handleInputColor = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setColor(value);
    };

    const handleAddLabel = () => {
        const data: LabelAttributes = {name, color}
        createLabel(data);
        onCancel();
    };

    return (
        <Popup style="border border-solid border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-y-10" onCancel={onCancel}>
            <h2 className="text-2xl text-gray-800 font-bold">Add new label</h2>
            <div className="flex flex-col gap-y-10">
                <div className="grid grid-cols-2 items-center">
                    <span className="text-lg text-gray-800 font-bold">Name</span>
                    <input
                        id="label-name"
                        type="text"
                        className="outline-none border-2 border-solid border-gray-800 px-3 py-1 rounded-xl text-gray-800"
                        onChange={handleInputName}
                        value={name}
                    />
                </div>
                <div className="grid grid-cols-2 items-center">
                    <span className="text-lg text-gray-800 font-bold">Color</span>
                    <div className="flex items-center justify-center gap-x-5">
                        <input
                            id="label-color"
                            type="color"
                            className="outline-none border-2 border-solid border-gray-800 rounded-lg text-gray-800"
                            onChange={handleInputColor}
                            value={color}
                        />
                        <span className="text-lg text-gray-800 font-bold">{color}</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-10 w-full">
                    <Button
                        disabled={Boolean(!name.trim() || !color.trim())}
                        styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-green-800 hover:border-green-800 hover:text-white disabled:bg-gray-400 disabled:border-gray-800 disabled:text-gray-800 disabled:cursor-not-allowed"}
                        title={"Add"}
                        onSubmit={handleAddLabel}
                    />
                    <Button
                        styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-red-800 hover:border-red-800 hover:text-white"}
                        title={"Cancel"}
                        onSubmit={onCancel}
                    />
                </div>
            </div>
        </Popup>
    );
};

export default LabelAddModal;