import type {Issue, IssueAttributes} from "../../models/issue/issue.type.ts";
import type {LabelAttributes} from "../../models/label/label.type.ts";
import {generateId} from "../../utils/generateId";

export interface IssueRepositoryTypes {
    create: (data: IssueAttributes, labels: LabelAttributes[]) => Issue;
    getAll: (from: number, to?: number) => Issue[];
    getOne: (id: string) => Issue;
    update: (id: string, data: IssueAttributes, labels: LabelAttributes[]) => Issue;
    delete: (id: string) => void;
}

const STORAGE_KEY = "issues";

export class IssueRepository implements IssueRepositoryTypes {
    create(data: IssueAttributes, labels: LabelAttributes[]): Issue {
        const issues = this.getAll(0);

        const issue: Issue = {
            id: generateId(5),
            labels: labels,
            ...data
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify([...issues, issue]));
        return issue;
    }

    getAll(from: number, to?: number): Issue[] {
        let issues = JSON.parse(
            localStorage.getItem(STORAGE_KEY) ? localStorage.getItem(STORAGE_KEY) : "[]"
        ) as Issue[];


        if (to !== undefined) {
            if (from + to + 1 > issues.length) {
                issues = issues.slice(from, issues.length);
            } else {
                issues = issues.slice(from, from + to + 1);
            }
        }

        return issues;
    }

    getOne(id: string): Issue {
        const issues = this.getAll(0);
        return issues.find(x => x.id === id);
    }

    update(id: string, data: IssueAttributes, labels: LabelAttributes[]): Issue {
        const issues = this.getAll(0);
        const issueIndex = issues.findIndex(x => x.id === id);

        issues[issueIndex] = {...issues[issueIndex], ...data, labels: labels};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));

        return issues[issueIndex];
    }

    delete(id: string): void{
        const issues = this.getAll(0);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(issues.filter(x => x.id !== id)));
    }
}