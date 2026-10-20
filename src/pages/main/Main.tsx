import useModal from "../../hooks/useModal.ts";
import useIssueService from "../../hooks/useIssueService.ts";

import Header from "../../components/ui/header/Header.tsx";
import Search from "../../components/ui/search/Search.tsx";
import Navbar from "../../components/ui/navbar/Navbar.tsx";
import Button from "../../components/ui/button/Button.tsx";
import Pagination from "../../components/ui/pagination/Pagination.tsx";

import IssueAddModal from "../../components/modal/issue/add/IssueAddModal.tsx";
import IssueEditModal from "../../components/modal/issue/edit/IssueEditModal.tsx";
import LabelAddModal from "../../components/modal/label/LabelAddModal.tsx";

import {issueService} from "../../services/service.ts";

import {generateId} from "../../utils/generateId";
import IssuesTable from "../../components/issuesTable/IssuesTable.tsx";
import {useState} from "react";
import type {Issue, IssueAttributes} from "../../models/issue/issue.type.ts";
import type {Label} from "../../models/label/label.type.ts";
import {VISIBLE_ISSUES_COUNT} from "../../consts";
import IssueInfoModal from "../../components/modal/issue/info/IssueInfoModal.tsx";

const Main = () => {
    const [currentIssue, setCurrentIssue] = useState<Issue>({} as Issue);

    const {
        showAddIssue,
        showEditIssue,
        showAddLabel,
        showInfoIssue,
        toggleAddIssue,
        toggleAddLabel,
        toggleEditIssue,
        toggleInfoIssue,
    } = useModal();

    const {
        issues,
        currentIssueNumber,
        allIssues,
        addIssue,
        editIssue,
        deleteIssue,
        nextIssues,
        previousIssues,
    } = useIssueService(issueService);

    const handleEditIssue = (id: string, data: IssueAttributes, labels: Label[]) => {
        setCurrentIssue({id, labels, ...data});
        toggleEditIssue();
    };

    const handleInfoIssue = (id: string, data: IssueAttributes, labels: Label[]) => {
        setCurrentIssue({id, labels, ...data});
        toggleInfoIssue();
    };

    const currentPage = currentIssueNumber / VISIBLE_ISSUES_COUNT + 1;
    const allPages = Math.ceil(allIssues / VISIBLE_ISSUES_COUNT)

    return (
        <>
            {showAddIssue && <IssueAddModal onCancel={toggleAddIssue} onSubmit={addIssue}/>}
            {showEditIssue && <IssueEditModal data={currentIssue} onSubmit={editIssue} onCancel={toggleEditIssue} />}
            {showAddLabel && <LabelAddModal onCancel={toggleAddLabel} />}
            {showInfoIssue && <IssueInfoModal data={currentIssue} onCancel={toggleInfoIssue} />}
            <div className={`w-4/5 my-0 mx-auto flex flex-col items-center gap-y-30`}>
                <Header styles={"mt-20"}>
                    <h1 className="text-3xl font-bold">Issues</h1>
                    <div className="flex items-center gap-x-5">
                        <Button
                            onSubmit={toggleAddIssue}
                            title={"New Issue"}
                            styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-gray-800 hover:text-white"}
                        />
                        <Button
                            onSubmit={toggleAddLabel}
                            title={"New Label"}
                            styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-gray-800 hover:text-white"}
                        />
                    </div>
                </Header>
                <main className="w-full flex items-center justify-center">
                    <div className="w-full h-2/3 flex flex-col items-center justify-between border-5 border-solid border-gray-800 rounded-2xl pb-5">
                        <Header styles={"border-b-2 border-b-solid border-b-gray-800"}>
                            <Search />
                            <Navbar data={[
                                {
                                    id: generateId(5),
                                    title: "Issues",
                                    dropdown: [
                                        {   id: generateId(5),
                                            title: "Show issues (A-Z)",
                                            dropdown: null,
                                        },
                                        {
                                            id: generateId(5),
                                            title: "Show issues (Z-A)",
                                            dropdown: null,
                                        },
                                    ],
                                },
                                {
                                    id: generateId(5),
                                    title: "Labels",
                                    dropdown: [
                                        {   id: generateId(5),
                                            title: "Show labels (A-Z)",
                                            dropdown: null,
                                        },
                                        {
                                            id: generateId(5),
                                            title: "Show labels (Z-A)",
                                            dropdown: null,
                                        },
                                    ],
                                }
                            ]} />
                        </Header>
                        <IssuesTable
                            data={issues}
                            onInfo={handleInfoIssue}
                            onEdit={handleEditIssue}
                            onDelete={deleteIssue}
                        />
                        <Pagination currentPage={currentPage} allPages={allPages} next={nextIssues} prev={previousIssues}/>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Main;