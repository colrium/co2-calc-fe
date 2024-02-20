import Target from '@/models/Target';

const CrudBase = new Target().CrudBase;
const TargetsPage = () => {
	return <CrudBase />;
};
export default TargetsPage;
