import { RiAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function ProductsAdminPage() {
    return (
        <div className="w-full h-full border-[3px]">
            <Link to={"/admin/newProduct"} className="fixed bottom-10 right-10 bg-black text-white p-4 rounded-full shadow-[2xl] ">
                <RiAddLine className="text-3xl" />
            </Link>
        </div>
    );
}
