import {type FC, memo} from "react";
import type {IssueInfoModalProps} from "../../types.ts";
import Button from "../../../ui/button/Button.tsx";
import Popup from "../../../ui/popup/Popup.tsx";

const IssueInfoModal: FC<IssueInfoModalProps> = ({data, onCancel}) => {
    const {labels, title, description} = data;

    return (
        <Popup style={"border border-solid border-gray-800 rounded-2xl flex flex-col gap-y-10 max-w-200"} onCancel={onCancel}>
            <div className="flex flex-col gap-y-5">
                <h2 className="text-2xl text-gray-800 font-bold break-words">{title}</h2>
                <div className="flex items-center gap-x-2">
                    {labels.map(({name, color, id}) => (
                        <span key={id} style={{backgroundColor: color}} className="px-2 py-1 text-xs text-white rounded-md">{name}</span>
                    ))}
                </div>
            </div>
                <p className="py-2 text-gray-800 text-xs whitespace-pre-wrap !break-all max-h-100 overflow-y-auto no-scrollbar-arrows">
                    {description}
                </p>
            <div>
                <Button
                    styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-green-800 hover:border-green-800 hover:text-white disabled:bg-gray-400 disabled:border-gray-800 disabled:text-gray-800 disabled:cursor-not-allowed"}
                    title={"Ok"}
                    onSubmit={onCancel}
                />
            </div>
        </Popup>
    )
};

export default memo(IssueInfoModal);