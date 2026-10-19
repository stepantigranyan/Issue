import type {FC} from "react";
import type {Modal} from "./types.ts";
import Popup from "../ui/popup/Popup.tsx";

const LabelModal: FC<Modal> = ({onCancel}) => {
    return (
        <Popup onCancel={onCancel}>
            <h1>Hello</h1>
        </Popup>
    );
};

export default LabelModal;