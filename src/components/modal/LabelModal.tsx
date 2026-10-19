import {type ChangeEvent, type FC, useState} from "react";
import type {Modal} from "./types.ts";
import {labelService} from "../../services/service.ts";
import type {LabelAttributes} from "../../models/label/label.type.ts";
import Popup from "../ui/popup/Popup.tsx";
import Button from "../ui/button/Button.tsx";

const LabelModal: FC<Modal> = ({onCancel}) => {
    const [name, setName] = useState<string>("");
    const [color, setColor] = useState<string>("#000000");

    const handleInputName = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setName(value);
    };

    const handleInputColor = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        console.log(value)
        setColor(value);
    };

    const handleAddLabel = () => {
        const data: LabelAttributes = {name, color}
        labelService.create(data);
        onCancel();
    };

    return (
        <Popup onCancel={onCancel}>
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
                    <Button styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-green-800 hover:border-green-800 hover:text-white"} title={"Add"} onSubmit={handleAddLabel}/>
                    <Button styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-red-800 hover:border-red-800 hover:text-white"} title={"Cancel"} onSubmit={onCancel}/>
                </div>
            </div>
        </Popup>
    );
};

export default LabelModal;