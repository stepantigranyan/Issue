import type {FC} from "react";
import type {MenuProps} from "../navbar/Navbar.tsx";
import DropdownItem from "./dropdownItem/DropDownItem.tsx";


const Dropdown: FC<MenuProps> = ({data, subMenu}) => {
    return (
        <ul className={`absolute hidden ${subMenu ? "right-full top-1/5" : "right-3/5 top-full"} border-2 border-solid border-gray-800 w-40 font-medium group-hover/main:block`}>
            {data.map(({id, title, dropdown}) => <DropdownItem key={id} id={id} title={title} dropdown={dropdown} />)}
        </ul>
    )
};

export default Dropdown;