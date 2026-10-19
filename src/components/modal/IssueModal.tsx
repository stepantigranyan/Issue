import type {FC} from "react";
import type {IssueModalProps} from "./types.ts";
import Popup from "../ui/popup/Popup.tsx";
import Button from "../ui/button/Button.tsx";

const IssuesModal: FC<IssueModalProps> = ({onCancel, onSubmit}) => {


    return (
        <Popup onCancel={onCancel}>
            <h2 className="text-2xl text-gray-800 font-bold">Add new issue</h2>
            <div className="flex flex-col gap-y-10">
                <div className="grid grid-cols-2 items-center">
                    <label htmlFor="issue-title" className="text-lg text-gray-800 font-bold">Title</label>
                    <input id="issue-title" type="text" className="outline-none border-2 border-solid border-gray-800 px-3 py-1 rounded-xl text-gray-800"/>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <label htmlFor="issue-description" className="text-lg text-gray-800 font-bold">Description</label>
                    <textarea id="issue-description" className="outline-none border-2 border-solid border-gray-800 px-3 py-1 rounded-xl text-gray-800 resize-none"/>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <label htmlFor="issue-title" className="text-lg text-gray-800 font-bold">Labels</label>
                    <div className="grid grid-cols-3 items-center gap-y-2">
                        <label className="cursor-pointer flex items-center justify-center px-4 py-2 text-xs rounded-full bg-gray-800 justify-self-center">
                            <span className="text-white">Bug</span>
                            <input type="checkbox" className="hidden"/>
                        </label>
                        <label className="cursor-pointer flex items-center justify-center px-4 py-2 text-xs rounded-full bg-gray-800 justify-self-center">
                            <span className="text-white">Bug</span>
                            <input type="checkbox" className="hidden"/>
                        </label>
                        <label className="cursor-pointer flex items-center justify-center px-4 py-2 text-xs rounded-full bg-gray-800 justify-self-center">
                            <span className="text-white">Bug</span>
                            <input type="checkbox" className="hidden"/>
                        </label>
                        <label className="cursor-pointer flex items-center justify-center px-4 py-2 text-xs rounded-full bg-gray-800 justify-self-center">
                            <span className="text-white">Bug</span>
                            <input type="checkbox" className="hidden"/>
                        </label>
                        <label className="cursor-pointer flex items-center justify-center px-4 py-2 text-xs rounded-full bg-gray-800 justify-self-center">
                            <span className="text-white">Bug</span>
                            <input type="checkbox" className="hidden"/>
                        </label>
                        <label className="cursor-pointer flex items-center justify-center px-4 py-2 text-xs rounded-full bg-gray-800 justify-self-center">
                            <span className="text-white">Bug</span>
                            <input type="checkbox" className="hidden"/>
                        </label>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-10 w-full">
                    <Button styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-gray-800 hover:text-white"} title={"Add"} onSubmit={onSubmit} />
                    <Button styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-gray-800 hover:text-white"} title={"Cancel"} onSubmit={onCancel}/>
                </div>
            </div>
        </Popup>
    );
};

export default IssuesModal;