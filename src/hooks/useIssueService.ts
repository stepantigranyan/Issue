import {useCallback, useState, useEffect, useMemo} from "react";
import type {IssueService} from "../services/issue/issue.service.ts";
import type {Issue, IssueAttributes} from "../models/issue/issue.type.ts";
import type {Label} from "../models/label/label.type.ts";
import {VISIBLE_ISSUES_COUNT} from "../consts";

const useIssueService = (service: IssueService) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [currentIssueNumber, setCurrentIssueNumber] = useState<number>(0);

    const allIssues = useMemo(() => {
        return service.getAll(0).length;
    }, [service]);

    const loadIssues= useCallback((from: number, to?: number) => {
        const data = service.getAll(from, to);
        setIssues(data);
    }, [service]);

    useEffect(() => {
        loadIssues(currentIssueNumber, currentIssueNumber + VISIBLE_ISSUES_COUNT);
    }, [currentIssueNumber]);

    const nextIssues = (page?: number) => {
        setCurrentIssueNumber((prev) => page === undefined ? prev + VISIBLE_ISSUES_COUNT : page);
    }

    const previousIssues = (page?: number) => {
        setCurrentIssueNumber((prev) => page === undefined ? prev - VISIBLE_ISSUES_COUNT : page);
    }

    const addIssue = (issue: IssueAttributes, labels: Label[]) => {
        const data = service.create(issue, labels);
        setIssues([data, ...issues].slice(0, VISIBLE_ISSUES_COUNT));
    };

    const editIssue = (id:  string, issue: IssueAttributes, labels: Label[]) => {
        const data = service.update(id, issue, labels);
        setIssues((prev) => prev.map((x) => x.id === id ? data : x));
    };

    const deleteIssue = (id:  string) => {
        service.del(id);
        setIssues((prev) => prev.filter((x) => x.id !== id));
    };

    return {
        issues,
        currentIssueNumber,
        allIssues,
        addIssue,
        editIssue,
        deleteIssue,
        nextIssues,
        previousIssues
    };
};

export default useIssueService;