import { ParsedUrlQuery } from 'querystring';

export function updateQueryParams(
  params: ParsedUrlQuery,
  newKey: 'page' | 'search' | 'details' | 'search' | 'limit',
  newValue: string,
): ParsedUrlQuery {
  const newParams: ParsedUrlQuery = { ...params };

  switch (newKey) {
    case 'search':
      delete newParams.page;
      newValue ? (newParams[newKey] = newValue) : delete newParams.search;
      break;
    case 'limit':
      delete newParams.page;
      newParams[newKey] = newValue;
      break;
    default:
      newValue ? (newParams[newKey] = newValue) : delete newParams[newKey];
  }

  return newParams;
}
