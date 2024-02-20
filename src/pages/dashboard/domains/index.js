import Domain from "@/models/Domain";

const CrudBase = new Domain().CrudBase;
const DomainsPage = () => {
    return(
        <CrudBase />
    )
}
export default DomainsPage;