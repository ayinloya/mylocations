import { NavLink } from "react-router-dom"


function BottomNav() {
	return (
		<div className="bg-gray-50 fixed bottom-0 overflow-visible w-full shadow-inner p-4 flex flex-row ">
			<div className="flex flex-1 justify-center text-xs font-bold text-center ">
				<NavLink to='/categories' className={({ isActive }) => isActive ? "text-sm border-blue-700 pt-3 rounded-t text-blue-700 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-blue-700 cursor-pointer"}>
					<svg className="w-6 h-6 inline-block" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
						<path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
					</svg>
					<span className="block text-xs pt-1"></span>
				</NavLink>
			</div>
			<div className="flex flex-1 justify-center text-xs font-bold text-center ">
				<NavLink to='/locations' className={({ isActive }) => isActive ? "text-sm border-blue-700 pt-3 rounded-t text-blue-700 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-blue-700 cursor-pointer"}>
					<svg className="w-6 h-6 inline-block" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
					</svg>
					<span className="block text-xs pt-1"></span>
				</NavLink>
			</div>
		</div>

	)
}

export default BottomNav