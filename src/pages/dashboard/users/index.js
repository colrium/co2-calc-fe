import InternalLayout from '@/layouts/Internal';
import User from '@/models/User';

const CrudBase = new User().CrudBase;
const Page = () => {
	return <CrudBase />;
};
Page.getLayout = (page) => {
	return <InternalLayout>{page}</InternalLayout>;
};
export default Page;