import { Link } from "react-router-dom"
export default function() {
    return(
        <>
            <div className="w-full flex flex-col items-center gap-2">
                <h2 className="text-red-600 font-bold text-3xl">Error 404 Page Not Found</h2>
                <Link to={"/"} className="text-2xl font-bold underline">Go Back</Link>
            </div>
        </>
    )
}