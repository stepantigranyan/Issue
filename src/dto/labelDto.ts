import type {Label, LabelAttributes} from "../models/label/label.type.ts";

export const labelDto = (labels: Label[]): LabelAttributes[] => {
    return labels.map(({name, color}) => ({name, color}))
};