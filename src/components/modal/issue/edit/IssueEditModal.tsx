import {type ChangeEvent, type FC, useState, useRef, useEffect, useMemo, memo} from "react";
import type {IssuesEditModalProps} from "../../types.ts";
import type {Label} from "../../../../models/label/label.type.ts";

import IssueModalLabel from "../IssueModalLabel.tsx";
import Popup from "../../../ui/popup/Popup.tsx";
import Button from "../../../ui/button/Button.tsx";

import {issueDto} from "../../../../dto/issueDto.ts";
import {getAllLabels} from "../../../../services/service.ts";

const IssueEditModal: FC<IssuesEditModalProps> = ({onCancel, onSubmit, data}) => {
    const ref = useRef<HTMLInputElement | null>(null);

    const allLabels: Label[] = useMemo(() => {
        return getAllLabels();
    }, []);

    const [title, setTitle] = useState<string>(data.title);
    const [description, setDescription] = useState<string>(data.description);
    const [labels, setLabels] = useState<Label[]>(data.labels);

    useEffect(() => {
        ref.current.focus();
    }, []);

    const handleInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setTitle(value);
    };

    const handleInputDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.currentTarget;
        setDescription(value);
    };

    const handleSubmit = () => {
        const newData = issueDto(title, description);
        onSubmit(data.id, newData, labels);
        onCancel();
    };

    const isChecked = (id: string) => {
        for (let i = 0; i < labels.length; i++) {
            if (labels[i].id === id) {
                return true;
            }
        }

        return false;
    }

    return (
        <Popup style={"border border-solid border-gray-800 rounded-2xl flex flex-col items-center gap-y-10"} onCancel={onCancel}>
            <h2 className="text-2xl text-gray-800 font-bold">Edit issue</h2>
            <div className="flex flex-col gap-y-5">
                <div className="flex items-center gap-x-5 flex-wrap">
                    <input
                        ref={ref}
                        onChange={handleInputTitle}
                        className="px-3 py-2 outline-none border-2 border-solid border-gray-800 text-gray-800 text-md font-bold"
                        value={title} />
                    <div className="flex items-center gap-x-2">
                        {allLabels.map(({name, color, id}) => (
                            <IssueModalLabel
                                key={id}
                                id={id}
                                color={color}
                                name={name}
                                onCheck={setLabels}
                                defaultCheck={isChecked(id)}
                            />
                        ))}
                    </div>
                </div>
                <textarea
                    onChange={handleInputDescription}
                    value={description}
                    className="w-full px-3 py-2 text-gray-800 text-xs resize-none border-2 border-solid border-gray-800 h-50"
                />
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
        </Popup>
    )
};

export default memo(IssueEditModal);