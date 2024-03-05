import InternalLayout from '@/layouts/Internal';
import Calculation from '@/models/Calculation';

const CrudBase = new Calculation().CrudBase;
const Page = () => {
    return(
        <CrudBase />
    )
}
Page.getLayout = (page) => {
	return <InternalLayout>{page}</InternalLayout>;
};
export default Page;