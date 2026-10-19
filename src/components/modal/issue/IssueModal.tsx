import {type ChangeEvent, type FC, useMemo, useState} from "react";
import type {IssueModalProps} from "../types.ts";
import type {Label, LabelAttributes} from "../../../models/label/label.type.ts";
import {labelService} from "../../../services/service.ts";

import IssueModalLabel from "./IssueModalLabel.tsx";
import Popup from "../../ui/popup/Popup.tsx";
import Button from "../../ui/button/Button.tsx";
import type {IssueAttributes} from "../../../models/issue/issue.type.ts";

const IssuesModal: FC<IssueModalProps> = ({onCancel, onSubmit}) => {
    const allLabels = useMemo(() => {
        return labelService.getAll();
    }, []);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [labels, setLabels] = useState<Label[]>([]);

    const handleInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setTitle(value);
    };

    const handleInputDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.currentTarget;
        setDescription(value);
    };

    const handleSubmit = () => {
        const data = {title, description} as IssueAttributes;
        const labelsss = labels as LabelAttributes[];
        onSubmit(data, labelsss);
    }

    return (
        <Popup onCancel={onCancel}>
            <h2 className="text-2xl text-gray-800 font-bold">Add new issue</h2>
            <div className="flex flex-col gap-y-10">
                <div className="grid grid-cols-2 items-center">
                    <span className="text-lg text-gray-800 font-bold">Title</span>
                    <input
                        id="issue-title"
                        type="text"
                        className="outline-none border-2 border-solid border-gray-800 px-3 py-1 rounded-xl text-gray-800"
                        onChange={handleInputTitle}
                    />
                </div>
                <div className="grid grid-cols-2 items-center">
                    <span className="text-lg text-gray-800 font-bold">Description</span>
                    <textarea
                        id="issue-description"
                        className="outline-none border-2 border-solid border-gray-800 px-3 py-1 rounded-xl text-gray-800 resize-none"
                        onChange={handleInputDescription}
                    />
                </div>
                <div className="grid grid-cols-2 items-center">
                    <label htmlFor="issue-title" className="text-lg text-gray-800 font-bold">Labels</label>
                    <div className="grid grid-cols-3 items-center gap-y-2">
                        {allLabels.map(({id, name, color}) => (
                            <IssueModalLabel key={id} id={id} color={color} name={name} onCheck={setLabels} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-10 w-full">
                    <Button
                        styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-gray-800 hover:text-white"}
                        title={"Add"}
                        onSubmit={handleSubmit}
                    />
                    <Button
                        styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-gray-800 hover:text-white"}
                        title={"Cancel"}
                        onSubmit={onCancel}
                    />
                </div>
            </div>
        </Popup>
    );
};

export default IssuesModal;