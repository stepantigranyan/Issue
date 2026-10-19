import {useState, useEffect, useCallback} from "react";
import type {LabelService} from "../services/label/label.service.ts";
import type {Label, LabelAttributes} from "../models/label/label.type.ts";


const useLabelService = (service: LabelService) => {
    const [labels, setLabels] = useState<Label[]>([]);

    const loadLabels= useCallback(() => {
        const data = service.getAll();
        setLabels(data);
    }, [service]);

    useEffect(() => {
        loadLabels();
    }, [loadLabels]);

    const addLabel = (label: LabelAttributes) => {
        const data = service.create(label);
        setLabels([...labels, data]);
    };

    const editLabel = (id:  string, label: LabelAttributes) => {
        const data = service.update(id, label);
        setLabels((prev) => prev.map((x) => x.id === id ? data : x));
    };

    const deleteLabel = (id: string) => {
        service.delete(id);
        setLabels((prev) => prev.filter((x) => x.id !== id));
    };

    return {
        labels,
        addLabel,
        editLabel,
        deleteLabel
    };
};

export default useLabelService;