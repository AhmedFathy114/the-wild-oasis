import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParam] = useSearchParams();
  if (isPending) return <Spinner />;
  if(!cabins.length) return <Empty resourceName='cabins'/>

  const filterValue = searchParam.get("discount") || "all";
  let filterCabins =
    filterValue === "all"
      ? cabins
      : filterValue === "no-discount"
        ? cabins?.filter((cabin) => !cabin.discount)
        : cabins?.filter((cabin) => cabin.discount);

  const sortBy = searchParam.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins =
    filterCabins.sort((a, b) => modifier * (a[field] - b[field]));

  return (
    <>
      <Menus>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header role="row">
            <div></div>
            <div>Cabins</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          <Table.Body
            data={sortedCabins}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        </Table>
      </Menus>
    </>
  );
}

export default CabinTable;
