import {type FC, memo} from "react";

import Table from "../ui/table/Table.tsx";
import TableRow from "../ui/table/tableRow/TableRow.tsx";
import Button from "../ui/button/Button.tsx";
import type {Issue} from "../../models/issue/issue.type.ts";

export interface IssueTableProps {
    data: Issue[];
    onInfo: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const IssuesTable: FC<IssueTableProps> = ({data, onEdit, onDelete, onInfo}) => {
    return (
        <Table style={"min-h-100 flex flex-col items-center"}>
            <>
                {data.map(({id, title, description, labels}) => (
                    <TableRow key={id} style={"w-full grid grid-cols-[3fr_1fr] items-center not-last:border-b-2 border-b-solid border-b-gray-800"}>
                        <div className="flex flex-col gap-y-5">
                            <div className="flex items-center gap-x-5 flex-wrap">
                                <h3
                                    className="relative cursor-pointer text-gray-800 text-md font-bold after:absolute after:hidden after:content-[''] after:top-full after:left-0 after:w-full after:h-0.5 after:bg-gray-800 hover:after:block"
                                    onClick={() => {
                                        onInfo(id);
                                    }}
                                >{title}</h3>
                                <div className="flex items-center gap-x-2">
                                    {labels.map(({name, color, id}) => (
                                        <span key={id} style={{backgroundColor: color}} className="px-2 py-1 text-xs text-white rounded-md">{name}</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-800 text-xs w-2/5 whitespace-pre-wrap break-all line-clamp-3">
                                {description}
                            </p>
                        </div>
                        <div className="justify-self-end flex items-center gap-x-3">
                            <Button
                                title={<i className="fa-solid fa-pen"></i>}
                                onSubmit={() => {
                                    onEdit(id);
                                }}
                                styles={"size-10 border-2 border-gray-800 border-solid rounded-xl flex items-center justify-center text-gray-800 hover:bg-green-800 hover:border-green-800 hover:text-white"}
                            />
                            <Button
                                title={<i className="fa-solid fa-trash"></i>}
                                onSubmit={() => {
                                    onDelete(id);
                                }}
                                styles={"size-10 border-2 border-gray-800 border-solid rounded-xl flex items-center justify-center text-gray-800 hover:bg-red-800 hover:border-red-800 hover:text-white"}
                            />
                        </div>
                    </TableRow>
                ))}
            </>
        </Table>
    )
};

export default memo(IssuesTable);