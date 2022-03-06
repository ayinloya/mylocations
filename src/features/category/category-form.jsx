import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { added, categoryUpdated } from "./category-slice";

const CategoryForm = (props) => {
	const dispatch = useDispatch()
	const category = useSelector((state) => state.category.value.find((value) => !!value.checked && props.isEditing) ?? {});

	const [categoryName, setCategoryName] = useState(category.name ?? "")

	const saveCategory = e => {
		e.preventDefault();
		if (props.isEditing) {
			dispatch(categoryUpdated({ name: categoryName.trim(), id: category.id }));
		} else {
			dispatch(added({ name: categoryName.trim() }));
		}
		window.location.replace('/categories')
	}

	return (
		<form onSubmit={saveCategory}>
			{props.isEditing && <p>Editing {category.name}</p>}
			<input type="text" name='categoryName' value={categoryName} id='categoryName' className="mr-5 border-2 border-primary bg-red transition h-12 px-5 pr-16 rounded-md focus:outline-none w-80 text-black text-lg" required placeholder='Category name eg. Airport' onChange={(e) => setCategoryName(e.target.value)} />
			<input type="submit" value="Save" className="w-24 hover:cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md bg-opacity-80 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" />
		</form>
	)
}

export default CategoryForm