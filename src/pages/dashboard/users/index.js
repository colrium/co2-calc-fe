import User from '@/models/User';

const CrudBase = new User().CrudBase;
const UsersPage = () => {
	return <CrudBase />;
};
export default UsersPage;
