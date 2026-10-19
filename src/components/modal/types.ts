import type {IssueAttributes} from "../../models/issue/issue.type.ts";
import type {LabelAttributes} from "../../models/label/label.type.ts";

export interface Modal {
    onCancel: () => void;
}

export interface IssueModalProps extends Modal {
    onSubmit: (issue: IssueAttributes, labels: LabelAttributes[]) => void;
}