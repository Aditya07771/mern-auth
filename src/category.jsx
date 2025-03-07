import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { TbSoup } from "react-icons/tb";
import { CiBowlNoodles } from "react-icons/ci";
import { MdOutlineFoodBank } from "react-icons/md";
import { GiFullPizza } from "react-icons/gi";
import { GiHamburger } from "react-icons/gi";

export const categories = [
    {
        id: 1,
        name: "All",  
        icons: <TiThSmallOutline className="w-[60px] h-[60px] text-green-400" />
    },
    {
        id: 2,
        name: "breakfast",  // Enclosed in quotes
        icons: <MdOutlineFreeBreakfast className="w-[60px] h-[60px] text-green-400"/>
    },
    {
        id: 3,
        name: "soups",  // Enclosed in quotes
        icons: <TbSoup className="w-[60px] h-[60px] text-green-400"/>
    },
    {
        id: 4,
        name: "pasta",  // Enclosed in quotes
        icons: <CiBowlNoodles className="w-[60px] h-[60px] text-green-400"/>
    },
    {
        id: 5,
        name: "main_course",  // Enclosed in quotes
        icons: <MdOutlineFoodBank className="w-[60px] h-[60px] text-green-400"/>
    },
    {
        id: 6,
        name: "pizza",  // Enclosed in quotes
        icons: <GiFullPizza className="w-[60px] h-[60px] text-green-400" />
    },
    {
        id: 7,
        name: "burger",  
        icons: <GiHamburger className="w-[60px] h-[60px] text-green-400" />
    }
]

export default categories;
