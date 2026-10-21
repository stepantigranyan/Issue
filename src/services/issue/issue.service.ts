import type {IssueRepositoryTypes} from "../../repositories/issue/issue.repository.ts";
import type {Issue, IssueAttributes} from "../../models/issue/issue.type.ts";
import type {Label} from "../../models/label/label.type.ts";

import {SORT} from "../../consts";

export class IssueService {
    private readonly issueRepository: IssueRepositoryTypes;

    constructor(issueRepository: IssueRepositoryTypes) {
        this.issueRepository = issueRepository;
    }

    create(data: IssueAttributes, labels: Label[]): Issue {
        return this.issueRepository.create(data, labels);
    }

    getAll(from: number, to?: number): Issue[] {
        return this.issueRepository.getAll(from, to);
    }

    getOne(id: string): Issue {
        return this.issueRepository.getOne(id);
    }

    update(id: string, data: IssueAttributes, labels: Label[]): Issue {
        return this.issueRepository.update(id, data, labels);
    }

    del(id: string): Issue {
        return this.issueRepository.delete(id);
    }

    sort(type: SORT) {
        return this.issueRepository.sort(type);
    }

    search(title: string): Issue[] {
        return this.issueRepository.search(title);
    }
 }