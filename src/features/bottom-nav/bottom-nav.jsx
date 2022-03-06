import {  NavLink } from "react-router-dom"


function BottomNav() {
	return (
		<div className="bg-gray-50 fixed bottom-0 overflow-visible w-full shadow-inner p-4 flex flex-row ">
			<div className="flex flex-1 justify-center text-xs font-bold text-center ">
				<NavLink to='/categories' className={({ isActive }) => isActive ? "text-sm border-green-700 pt-3 rounded-t text-green-700 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-green-700 cursor-pointer"}>
					<svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
					</svg>
					<span className="block text-xs pt-1"></span>
				</NavLink>
			</div>
			<div className="flex flex-1 justify-center text-xs font-bold text-center ">
				<NavLink to='/locations' className={({ isActive }) => isActive ? "text-sm border-green-700 pt-3 rounded-t text-green-700 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-green-700 cursor-pointer"}>
					<svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
					</svg>
					<span className="block text-xs pt-1"></span>
				</NavLink>
			</div>
		</div>

	)
}

export default BottomNav