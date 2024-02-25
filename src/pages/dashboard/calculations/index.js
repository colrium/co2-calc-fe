import Calculation from '@/models/Calculation';

const CrudBase = new Calculation().CrudBase;
const CalculationsPage = () => {
    return(
        <CrudBase />
    )
}
export default CalculationsPage;