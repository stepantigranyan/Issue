import useOutsideClick from "../../../hooks/useOutsideClick.ts";
import {type ChangeEvent, type FC, type SubmitEvent, memo, useRef, useState} from "react";
import type {Issue} from "../../../models/issue/issue.type.ts";

export interface SearchProps {
    onInfo: (id: string) => void;
    onSubmit: (title: string) => void;
    data: Issue[]
}

const Search: FC<SearchProps> = ({onSubmit, data, onInfo}) => {
    const [title, setTitle] = useState<string>("");
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null)
    useOutsideClick(ref, () => {
        setOpenMenu(false);
    })

    const handleInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setOpenMenu(false);
        setTitle(value);
    }

    const handleSubmitForm = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (title.trim() === '') {
            setTitle("");
            return;
        }

        setOpenMenu(true);
        onSubmit(title);
    };

    const handleSubmitButton = () => {
        if (title.trim() === '') {
            setTitle("");
            return;
        }

        setOpenMenu(true);
        onSubmit(title);
    };

    return (
        <form onSubmit={handleSubmitForm} className="flex items-center gap-x-2">
            <div className="relative">
                <input
                    autoComplete={"off"}
                    onChange={handleInputTitle}
                    id="search"
                    className="px-5 py-2 h-10 outline-none border-2 border-solid text-gray-800 border-gray-800 rounded-xl"
                    type="text"
                    placeholder="Search..."
                    value={title}
                />
                {openMenu &&
                    <div ref={ref} className="absolute top-6/5 left-0 w-full border-2 border-solid border-gray-800 rounded-lg z-10 bg-white shadow-xl/20 max-h-100 overflow-y-auto">
                        {
                            data.length !== 0 ?
                                data.map((issue) => (
                                        <div
                                            key={issue.id}
                                            className="py-2 px-3 not-last:border-b-1 not-last-border-b-gray-800"
                                        >
                                            <h4
                                                onClick={() => {
                                                    setTitle("");
                                                    setOpenMenu(false);
                                                    onInfo(issue.id);
                                                }}
                                                className="relative inline text-center cursor-pointer text-gray-800 text-sm font-bold after:absolute after:hidden after:content-[''] after:top-full after:left-0 after:w-full after:h-[1px] after:bg-gray-800 hover:after:block">
                                                {issue.title.length > 20 ? `${issue.title.slice(0, 20)}...` : issue.title}
                                            </h4>
                                        </div>
                                    ))

                                :

                                <div className="py-2 px-3 text-center text-sm">"{title}" not found.</div>
                        }
                    </div>
                }
            </div>
            <button onClick={handleSubmitButton} className="cursor-pointer size-10 flex items-center justify-center border-2 border-solid text-gray-800 border-gray-800 rounded-xl hover:bg-gray-800 hover:text-white">
                <i className="fa-solid fa-magnifying-glass" />
            </button>
        </form>
    );
};

export default memo(Search);