import InternalLayout from '@/layouts/Internal';
import Target from '@/models/Target';

const CrudBase = new Target().CrudBase;
const Page = () => {
	return <CrudBase />;
};
Page.getLayout = (page) => {
	return <InternalLayout>{page}</InternalLayout>;
};
export default Page;
