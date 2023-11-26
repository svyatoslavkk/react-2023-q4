import { useRouter } from 'next/router';
import { updateQueryParams } from '../functions/updateQueryParams';

function ItemsPerPage(props: Record<'pageSize', number>) {
  const { pageSize } = props;
  const router = useRouter();

  const optionValues = [10, 20, 30];

  return (
    <div className="items-per-page">
      <select
        name="itemsPerPage"
        id="itemsPerPage"
        value={pageSize.toString()}
        onChange={(e) => {
          router.push(
            '?' + updateQueryParams(router.query, 'limit', e.target.value),
          );
        }}
      >
        {optionValues.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ItemsPerPage;
