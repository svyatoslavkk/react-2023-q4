export function updateQueryParams(
  params: URLSearchParams,
  newKey: string,
  newValue: string,
) {
  const obj = Object.fromEntries(params.entries());
  switch (newKey) {
    case 'search': {
      delete obj.page;
      break;
    }
    case 'limit':
      delete obj.page;
      obj[newKey] = newValue;
      break;
    default:
      if (!newValue) delete obj[newKey];
      else {
        obj[newKey] = newValue;
      }
  }
  return obj;
}
