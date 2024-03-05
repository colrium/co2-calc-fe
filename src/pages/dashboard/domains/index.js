import InternalLayout from "@/layouts/Internal";
import Domain from "@/models/Domain";

const CrudBase = new Domain().CrudBase;
const Page = () => {
    return(
        <CrudBase />
    )
}
Page.getLayout = (page) => {
	return <InternalLayout>{page}</InternalLayout>;
};
export default Page;