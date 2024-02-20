import ActivityType from '@/models/ActivityType';

const CrudBase = new ActivityType().CrudBase;
const ActivityTypesPage = () => {
	return <CrudBase />;
};
export default ActivityTypesPage;
