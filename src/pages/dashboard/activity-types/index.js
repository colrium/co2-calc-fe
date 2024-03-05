import InternalLayout from '@/layouts/Internal';
import ActivityType from '@/models/ActivityType';

const CrudBase = new ActivityType().CrudBase;
const Page = () => {
	return <CrudBase />;
};
Page.getLayout = (page) => {
	return <InternalLayout>{page}</InternalLayout>;
};
export default Page;
