import { useSelector } from "react-redux";
import TopNav from "../top-nav/top-nav";
import CategoryForm from "./category-form";


const EditCategory = () => {
	return (
		<div>
			<TopNav title="Edit category" hideActions={true} />
			<CategoryForm isEditing={true} />
		</div>
	)
}

export default EditCategory