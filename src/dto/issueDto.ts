import type {IssueAttributes} from "../models/issue/issue.type.ts";

export const issueDto = (title: string, description: string): IssueAttributes => {
    return ({title, description})
};