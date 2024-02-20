import Industry from '@/models/Industry';

const CrudBase = new Industry().CrudBase;
const IndustriesPage = () => {
	return <CrudBase />;
};
export default IndustriesPage;
