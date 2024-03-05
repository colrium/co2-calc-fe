import InternalLayout from '@/layouts/Internal';
import Industry from '@/models/Industry';

const CrudBase = new Industry().CrudBase;
const Page = () => {
	return <CrudBase />;
};
Page.getLayout = (page) => {
	return <InternalLayout>{page}</InternalLayout>;
};
export default Page;
