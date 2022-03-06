import { useSelector } from "react-redux"

const CategoryDetail = () => {
	const category = useSelector((state) => state.category.detail)

	return (
		<div>
			<div>Name:</div> <div>{category.name}</div>
		</div>
	)
}

export default CategoryDetail