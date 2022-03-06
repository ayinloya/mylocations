import TopNav from "../top-nav/top-nav";
import CategoryForm from "./category-form";


const AddCategory = () => {
	return (
		<div>
			<TopNav title="New Category">
			</TopNav>
			<CategoryForm isEditing={false} />
		</div>
	)
}

export default AddCategory