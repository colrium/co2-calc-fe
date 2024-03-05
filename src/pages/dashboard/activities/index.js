import InternalLayout from '@/layouts/Internal';
import Activity from '@/models/Activity';

const CrudBase = new Activity().CrudBase;
const Page = () => {
	return <CrudBase />;
};
Page.getLayout = (page) => {
	return <InternalLayout>{page}</InternalLayout>;
};
export default Page;
