import {type ChangeEvent, type FC, memo, useMemo, useState} from "react";
import type {IssuesAddModalProps} from "../../types.ts";
import type {Label} from "../../../../models/label/label.type.ts";
import {getAllLabels} from "../../../../services/service.ts";

import IssueModalLabel from "../IssueModalLabel.tsx";
import Popup from "../../../ui/popup/Popup.tsx";
import Button from "../../../ui/button/Button.tsx";

import {issueDto} from "../../../../dto/issueDto.ts";

const IssuesAddModal: FC<IssuesAddModalProps> = ({onCancel, onSubmit}) => {
    const allLabels: Label[] = useMemo(() => {
        return getAllLabels();
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
        const data = issueDto(title, description);
        onSubmit(data, labels);
        onCancel();
    }

    return (
        <Popup style="border border-solid border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-y-10" onCancel={onCancel}>
            <h2 className="text-2xl text-gray-800 font-bold">Add new issue</h2>
            <div className="flex flex-col gap-y-10">
                <div className="grid grid-cols-2 items-center gap-x-5">
                    <span className="text-lg text-gray-800 font-bold">Title</span>
                    <input
                        id="issue-title"
                        type="text"
                        className="outline-none border-2 border-solid border-gray-800 px-3 py-1 rounded-xl text-gray-800"
                        onChange={handleInputTitle}
                    />
                </div>
                <div className="grid grid-cols-2 items-center gap-x-5">
                    <span className="text-lg text-gray-800 font-bold">Description</span>
                    <textarea
                        id="issue-description"
                        className="outline-none border-2 border-solid border-gray-800 px-3 py-1 rounded-xl text-gray-800 resize-none"
                        onChange={handleInputDescription}
                    />
                </div>
                <div className="grid grid-cols-2 items-center gap-x-5">
                    <label htmlFor="issue-title" className="text-lg text-gray-800 font-bold">Labels</label>
                    <div className="grid grid-cols-2 items-center gap-5 w-full">
                        {allLabels.map(({id, name, color}) => (
                            <IssueModalLabel key={id} id={id} color={color} name={name} onCheck={setLabels} defaultCheck={false}/>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-10 w-full">
                    <Button
                        disabled={Boolean(!title.trim() || !description.trim() || !labels.length)}
                        styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-green-800 hover:border-green-800 hover:text-white disabled:bg-gray-400 disabled:border-gray-800 disabled:text-gray-800 disabled:cursor-not-allowed"}
                        title={"Add"}
                        onSubmit={handleSubmit}
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

export default memo(IssuesAddModal);