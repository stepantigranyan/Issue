import type {Issue, IssueAttributes} from "../../models/issue/issue.type.ts";
import type {Label, LabelAttributes} from "../../models/label/label.type.ts";

export interface Modal {
    onCancel: () => void;
}

export interface IssuesAddModalProps extends Modal {
    onSubmit: (data: IssueAttributes, labels: Label[]) => void;
}

export interface IssuesEditModalProps extends Modal {
    data: Issue;
    onSubmit: (id: string, data: IssueAttributes, labels: Label[]) => void;
}

export interface LabelsModalProps extends Modal {
    onSubmit: (label: LabelAttributes) => void;
}

export interface IssueInfoModalProps extends Modal {
    data: Issue;
}