import {type FC, memo} from "react";
import {VISIBLE_ISSUES_COUNT} from "../../../consts";

export interface PaginationProps {
    style?: string;
    allPages: number;
    currentPage: number;
    next: (page?: number) => void;
    prev: (page?: number) => void;
}

const Pagination: FC<PaginationProps> = ({style, currentPage, allPages, next, prev}) => {
    return (
        <div className={`flex items-center justify-center gap-x-3 ${style}`}>
            <button
                disabled={currentPage === 1}
                className="cursor-pointer outline-none size-8 rounded-full flex items-center justify-center bg-gray-800 text-white hover:border hover:border-gray-800 disabled:border-none disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={() => {
                    prev();
                }}
            >
                <i className="fa-solid fa-left-long" />
            </button>

            {currentPage - 3 > 0 &&
                <button
                    className="cursor-pointer outline-none size-8 rounded-full flex items-center justify-center text-gray-800 hover:border hover:border-gray-800"
                    onClick={() => {
                        prev(0);
                    }}
                >
                    1
                </button>
            }

            {currentPage - 2 > 0 &&
                <span className="w-10 h-8 flex items-center justify-center">...</span>
            }

            {currentPage - 1 > 0 &&
                <button
                    className="cursor-pointer outline-none size-8 rounded-full flex items-center justify-center text-gray-800 hover:border hover:border-gray-800"
                    onClick={() => {
                        prev((currentPage - 2) * VISIBLE_ISSUES_COUNT);
                    }}
                >
                    {currentPage - 1}
                </button>
            }

            <button
                className="cursor-pointer outline-none size-8 rounded-full flex items-center justify-center text-white border border-gray-800 bg-gray-800">
                {currentPage}
            </button>

            {currentPage + 1 <= allPages &&
                <button
                    className="cursor-pointer outline-none size-8 rounded-full flex items-center justify-center text-gray-800 hover:border hover:border-gray-800"
                    onClick={() => {
                        next(currentPage * VISIBLE_ISSUES_COUNT);
                    }}
                >
                    {currentPage + 1}
                </button>
            }


            {currentPage + 2 <= allPages &&
                <span className="w-10 h-8 flex items-center justify-center">...</span>
            }

            {currentPage + 3 <= allPages &&
                <button
                    className="cursor-pointer outline-none size-8 rounded-full flex items-center justify-center text-gray-800 hover:border hover:border-gray-800"
                    onClick={() => {
                        next((allPages - 1) * VISIBLE_ISSUES_COUNT);
                    }}
                >
                    {allPages}
                </button>
            }

            <button
                disabled={currentPage === allPages || allPages === 0}
                className="cursor-pointer outline-none size-8 rounded-full flex items-center justify-center bg-gray-800 text-white hover:border hover:border-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-none"
                onClick={() => {
                    next();
                }}
            >
                <i className="fa-solid fa-right-long"></i>
            </button>

        </div>
    )
};

export default memo(Pagination);
