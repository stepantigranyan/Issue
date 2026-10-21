import {useCallback, useState, useEffect} from "react";
import type {IssueService} from "../services/issue/issue.service.ts";
import type {Issue, IssueAttributes} from "../models/issue/issue.type.ts";
import type {Label} from "../models/label/label.type.ts";
import {VISIBLE_ISSUES_COUNT} from "../consts";
import {SORT} from "../consts";

const useIssueService = (service: IssueService) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [searchedIssues, setSearchedIssues] = useState<Issue[]>([]);
    const [currentIssueNumber, setCurrentIssueNumber] = useState<number>(0);
    const [allIssuesCount, setAllIssuesCount] = useState<number>(service.getAll(0).length);

    const loadIssues= useCallback((from: number, to?: number) => {
        const data = service.getAll(from, to);
        setIssues(data);
    }, [service]);

    useEffect(() => {
        loadIssues(currentIssueNumber, currentIssueNumber + VISIBLE_ISSUES_COUNT);
    }, [currentIssueNumber, loadIssues]);

    const nextIssues = useCallback((page?: number) => {
        setCurrentIssueNumber((prev) => page === undefined ? prev + VISIBLE_ISSUES_COUNT : page);
    }, []);

    const previousIssues = useCallback((page?: number) => {
        setCurrentIssueNumber((prev) => page === undefined ? prev - VISIBLE_ISSUES_COUNT : page);
    }, []);

    const addIssue = useCallback((issue: IssueAttributes, labels: Label[]) => {
        service.create(issue, labels);
        setAllIssuesCount((prev) => prev + 1);
        loadIssues(0, VISIBLE_ISSUES_COUNT);
        setCurrentIssueNumber(0);
    }, [service, loadIssues]);

    const editIssue = useCallback((id:  string, issue: IssueAttributes, labels: Label[]) => {
        service.update(id, issue, labels);
        loadIssues(currentIssueNumber, currentIssueNumber + VISIBLE_ISSUES_COUNT);
    }, [currentIssueNumber, loadIssues, service]);

    const deleteIssue = useCallback((id: string) => {
        service.del(id);

        setAllIssuesCount((prev) => prev - 1);

        if (currentIssueNumber === allIssuesCount - 1) {
            if (allIssuesCount === 1) {
                return;
            }

            loadIssues(currentIssueNumber - VISIBLE_ISSUES_COUNT, VISIBLE_ISSUES_COUNT);
            setCurrentIssueNumber((prev) => prev - VISIBLE_ISSUES_COUNT);
            return;
        }

        loadIssues(currentIssueNumber, currentIssueNumber + VISIBLE_ISSUES_COUNT)
    }, [allIssuesCount, currentIssueNumber, loadIssues, service]);

    const sortByNames = useCallback((sortType: SORT) => {
        service.sort(sortType);
        setCurrentIssueNumber(0);
        loadIssues(0, VISIBLE_ISSUES_COUNT);
    }, [loadIssues, service]);

    const searchIssues = useCallback((title: string) => {
        const data = service.search(title);
        console.log(data);
        setSearchedIssues(data);
    }, [service]);

    return {
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
    };
};

export default useIssueService;