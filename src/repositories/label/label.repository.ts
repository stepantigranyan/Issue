import type {LabelAttributes, Label} from "../../models/label/label.type.ts";
import {generateId} from "../../utils/generateId";

export interface LabelRepositoryTypes {
    create: (labelAttributes: LabelAttributes) => Label;
    getAll: () => Label[];
    getOne: (id: string) => Label;
    update: (id: string, labelAttributes: LabelAttributes) => Label;
    delete: (id: string) => void;
}

const STORAGE_KEY = "labels";

export class LabelRepository implements LabelRepositoryTypes  {
    create(data: LabelAttributes): Label {
        const labels = this.getAll();

        const label: Label = {
            id: generateId(5),
            ...data,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify([...labels, label]));
        return label;
    }

    getAll(): Label[] {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEY) ? localStorage.getItem(STORAGE_KEY) : "[]"
        ) as Label[];
    }

    getOne(id: string): Label {
        const labels = this.getAll();

        return labels.find((x) => x.id === id);
    }

    update(id: string, data: LabelAttributes): Label {
        const labels = this.getAll();
        const labelIndex = labels.findIndex((x) => x.id === id);

        labels[labelIndex] = {...labels[labelIndex], ...data};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(labels));

        return labels[labelIndex];
    }

    delete(id: string): void {
        const labels = this.getAll();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(labels.filter(x => x.id !== id)));
    }
}