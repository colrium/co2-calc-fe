import Activity from '@/models/Activity';

const CrudBase = new Activity().CrudBase;
const ActivitiesPage = () => {
	return <CrudBase />;
};
export default ActivitiesPage;
