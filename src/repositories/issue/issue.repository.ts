import type {Issue, IssueAttributes} from "../../models/issue/issue.type.ts";
import type {Label, LabelAttributes} from "../../models/label/label.type.ts";
import {generateId} from "../../utils/generateId";

import {SORT} from "../../consts";

export interface IssueRepositoryTypes {
    create: (data: IssueAttributes, labels: LabelAttributes[]) => Issue;
    getAll: (from: number, to?: number) => Issue[];
    getOne: (id: string) => Issue;
    update: (id: string, data: IssueAttributes, labels: LabelAttributes[]) => Issue;
    delete: (id: string) => Issue;
    sort: (type: SORT) => Issue[];
    search: (title: string) => Issue[];
}

const STORAGE_KEY = "issues";

export class IssueRepository implements IssueRepositoryTypes {
    create(data: IssueAttributes, labels: Label[]): Issue {
        const issues = this.getAll(0);

        const issue: Issue = {
            id: generateId(5),
            labels: labels,
            ...data
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify([issue, ...issues]));
        return issue;
    }

    getAll(from: number, to?: number): Issue[] {
        let issues = JSON.parse(
            localStorage.getItem(STORAGE_KEY) ? localStorage.getItem(STORAGE_KEY) : "[]"
        ) as Issue[];

        if (to !== undefined) {
            if (to > issues.length) {
                issues = issues.slice(from, issues.length);
            } else {
                issues = issues.slice(from, to);
            }
        }

        return issues;
    }

    getOne(id: string): Issue {
        const issues = this.getAll(0);
        return issues.find(x => x.id === id);
    }

    update(id: string, data: IssueAttributes, labels: Label[]): Issue {
        const issues = this.getAll(0);
        const issueIndex = issues.findIndex(x => x.id === id);

        issues[issueIndex] = {...issues[issueIndex], ...data, labels: labels};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));

        return issues[issueIndex];
    }

    delete(id: string): Issue {
        const issues = this.getAll(0);
        const deletedIssue = issues.find(x => x.id === id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(issues.filter(x => x.id !== id)));
        return deletedIssue;
    }

    sort(type: SORT): Issue[] {
        const data = this.getAll(0);
        if (type === "ASC") {
            data.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
        } else if (type === "DESC") {
            data.sort((a, b) => b.title.toLowerCase() < a.title.toLowerCase() ? -1 : 1)
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        return data;
    }

    search(title: string): Issue[] {
        const data = this.getAll(0);
        return data.filter(x => x.title.toLowerCase().startsWith(title.toLowerCase()));
    }
}