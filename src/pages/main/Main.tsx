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
import {memo, useCallback, useMemo, useState} from "react";
import type {Issue} from "../../models/issue/issue.type.ts";
import {VISIBLE_ISSUES_COUNT} from "../../consts";
import IssueInfoModal from "../../components/modal/issue/info/IssueInfoModal.tsx";
import {SORT} from "../../consts";

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
        searchedIssues,
        currentIssueNumber,
        allIssuesCount,
        addIssue,
        editIssue,
        deleteIssue,
        nextIssues,
        previousIssues,
        sortByNames,
        searchIssues,
    } = useIssueService(issueService);

    const handleEditIssue = useCallback((id: string) => {
        setCurrentIssue(issueService.getOne(id));
        toggleEditIssue();
    }, [toggleEditIssue]);

    const handleInfoIssue = useCallback((id: string) => {
        setCurrentIssue(issueService.getOne(id));
        toggleInfoIssue();
    }, [toggleInfoIssue]);

    const currentPage = useMemo(() => currentIssueNumber / VISIBLE_ISSUES_COUNT + 1, [currentIssueNumber]);
    const allPages = useMemo(() => Math.ceil(allIssuesCount / VISIBLE_ISSUES_COUNT), [allIssuesCount]);

    return (
        <>
            {showAddIssue && <IssueAddModal onCancel={toggleAddIssue} onSubmit={addIssue}/>}
            {showEditIssue && <IssueEditModal data={currentIssue} onSubmit={editIssue} onCancel={toggleEditIssue} />}
            {showAddLabel && <LabelAddModal onCancel={toggleAddLabel} />}
            {showInfoIssue && <IssueInfoModal data={currentIssue} onCancel={toggleInfoIssue} />}
            <div className={`w-4/5 my-0 mx-auto flex flex-col items-center gap-y-10`}>
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
                            <Search onSubmit={searchIssues} data={searchedIssues} onInfo={handleInfoIssue}/>
                            <Navbar data={[
                                {
                                    id: generateId(5),
                                    title: "Sort Issues",
                                    dropdown: [
                                        {   id: generateId(5),
                                            title: "By (A-Z)",
                                            onClick: () => {
                                                sortByNames(SORT.ASC)
                                            },
                                            dropdown: null,
                                        },
                                        {
                                            id: generateId(5),
                                            title: "By (Z-A)",
                                            onClick: () => {
                                                sortByNames(SORT.DESC)
                                            },
                                            dropdown: null,
                                        },
                                    ],
                                },
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

export default memo(Main);