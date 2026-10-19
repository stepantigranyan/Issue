import {useState} from "react";

const useModal = () => {
    const [showIssues, setShowIssues] = useState<boolean>(false);
    const [showLabels, setShowLabels] = useState<boolean>(false);

    const openIssueModal = () => {
        setShowIssues(true);
    };

    const closeIssueModal = () => {
        setShowIssues(false);
    };

    const openLabelModal = () => {
        setShowLabels(true);
    };

    const closeLabelModal = () => {
        setShowLabels(false);
    };

    return {
        showIssues,
        showLabels,
        openIssueModal,
        closeIssueModal,
        openLabelModal,
        closeLabelModal,
    };
};

export default useModal;