import {type FC, memo} from "react";
import type {MenuProps} from "../navbar/Navbar.tsx";
import DropdownItem from "./dropdownItem/DropDownItem.tsx";


const Dropdown: FC<MenuProps> = ({data, subMenu}) => {
    return (
        <ul className={`absolute hidden ${subMenu ? "right-full top-1/5" : "right-2/5 top-full"} bg-white border-2 border-solid border-gray-800 w-40 font-medium group-hover/main:block z-100`}>
            {data.map(({id, title, dropdown, onClick}) => <DropdownItem key={id} id={id} title={title} dropdown={dropdown} onClick={onClick}/>)}
        </ul>
    );
};

export default memo(Dropdown);