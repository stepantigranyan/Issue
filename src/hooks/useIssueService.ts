import {useCallback, useState, useEffect} from "react";
import type {IssueService} from "../services/issue/issue.service.ts";
import type {Issue, IssueAttributes} from "../models/issue/issue.type.ts";
import type {LabelAttributes} from "../models/label/label.type.ts";

const useIssueService = (issueService: IssueService) => {
    const [issues, setIssues] = useState<Issue[]>([]);

    const loadIssues= useCallback(() => {
        const data = issueService.getAll(0);
        setIssues(data);
    }, [issueService]);

    useEffect(() => {
        loadIssues();
    }, [loadIssues]);

    const addIssue = (issue: IssueAttributes, labels: LabelAttributes[]) => {
        const data = issueService.create(issue, labels);
        setIssues([...issues, data]);
    };

    const editIssue = (id:  string, issue: IssueAttributes, labels: LabelAttributes[]) => {
        const data = issueService.update(id, issue, labels);
        setIssues((prev) => prev.map((x) => x.id === id ? data : x));
    };

    const deleteIssue = (id:  string) => {
        issueService.delete(id);
        setIssues((prev) => prev.filter((x) => x.id !== id));
    };

    return {
        issues,
        addIssue,
        editIssue,
        deleteIssue
    };
};

export default useIssueService;