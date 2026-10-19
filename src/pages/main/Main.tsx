import useModal from "../../hooks/useModal.ts";
import useIssueService from "../../hooks/useIssueService.ts";

import Header from "../../components/ui/header/Header.tsx";
import Search from "../../components/ui/search/Search.tsx";
import Navbar from "../../components/ui/navbar/Navbar.tsx";
import Button from "../../components/ui/button/Button.tsx";

import IssueModal from "../../components/modal/issue/IssueModal.tsx";
import LabelModal from "../../components/modal/LabelModal.tsx";

import {issueService} from "../../services/service.ts";

import {generateId} from "../../utils/generateId";

const Main = () => {
    const {showIssues, showLabels, openIssueModal, closeIssueModal, openLabelModal, closeLabelModal} = useModal();
    const {issues, addIssue, editIssue, deleteIssue} = useIssueService(issueService);

    return (
        <>
            {showIssues && <IssueModal onCancel={closeIssueModal} onSubmit={addIssue}/>}
            {showLabels && <LabelModal onCancel={closeLabelModal} />}
            <div className={`w-4/5 my-0 mx-auto flex flex-col items-center gap-y-30`}>
                <Header styles={"mt-20"}>
                    <h1 className="text-3xl font-bold">Issues</h1>
                    <div className="flex items-center gap-x-5">
                        <Button
                            onSubmit={openIssueModal}
                            title={"New Issue"}
                            styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-gray-800 hover:text-white"}
                        />
                        <Button
                            onSubmit={openLabelModal}
                            title={"New Label"}
                            styles={"border-2 border-solid border-gray-800 rounded-xl hover:bg-gray-800 hover:text-white"}
                        />
                    </div>
                </Header>
                <main className="w-full flex items-center justify-center">
                    <div className="w-full h-2/3 flex flex-col items-center justify-between border-5 border-solid border-gray-800 rounded-2xl">
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
                    </div>
                </main>
            </div>

        </>
    );
};

export default Main;