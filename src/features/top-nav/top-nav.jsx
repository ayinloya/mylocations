import { Menu, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"

const TopNav = (props) => {
	const [toggleActions, setToggleActions] = useState(false)

	const renderActions = () => {
		if(!props.children || props.children.length == 0){
			return <></>
		}
		return (<div className="flex items-center justify-end flex-1 lg:w-0">
		<div className="w-56 text-right fixed top-3">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex justify-center w-full btn">
						Actions
						<svg className="transform rotate-180 pb-1 ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
								</svg>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						{props.children}
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	</div>)
	}
	return (
		<div className="relative bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<a href="#">
							<span className="sr-only">{props.title}</span>
							<span className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
								{props.title}
							</span>
						</a>
					</div>
					{renderActions(props)}
				</div>
			</div>
		</div>

	)
}


export default TopNav 