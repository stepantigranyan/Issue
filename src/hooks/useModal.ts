import {useCallback, useState} from "react";

const useModal = () => {
    const [showAddIssue, setShowAddIssue] = useState<boolean>(false);
    const [showAddLabel, setShowLabelsModal] = useState<boolean>(false);
    const [showEditIssue, setShowEditIssue] = useState<boolean>(false);
    const [showInfoIssue, setShowInfoIssue] = useState<boolean>(false);

    const toggleAddIssue = useCallback(() => {
        setShowAddIssue((prev) => !prev);
    }, []);

    const toggleAddLabel = useCallback(() => {
        setShowLabelsModal((prev) => !prev);
    }, []);

    const toggleEditIssue = useCallback(() => {
        setShowEditIssue((prev) => !prev);
    }, []);

    const toggleInfoIssue = useCallback(() => {
        setShowInfoIssue((prev) => !prev);
    }, [])

    return {
        showAddIssue,
        showAddLabel,
        showEditIssue,
        showInfoIssue,
        toggleAddIssue,
        toggleAddLabel,
        toggleEditIssue,
        toggleInfoIssue
    };
};

export default useModal;