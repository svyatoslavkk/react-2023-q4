export function createCardsResponseMock(
  arrLength: number,
  limit: number,
  details: boolean,
) {
  const animalsJSON = createCardsListResponseMock(arrLength, limit, details);
  const response = {
    data: {
      animals: animalsJSON,
      page: {
        firstPage: true,
        lastPage: false,
        numberOfElements: arrLength,
        pageNumber: 0,
        pageSize: limit,
        totalElements: arrLength,
        totalPages: Math.ceil(arrLength / limit),
      },
    },
    error: {},
  };
  return response;
}
export function createCardsListResponseMock(
  arrLength: number,
  limit: number,
  details: boolean,
) {
  return new Array(arrLength)
    .fill(undefined)
    .map((_, ind) => {
      return {
        avian: true,
        canine: false,
        earthAnimal: false,
        earthInsect: false,
        feline: false,
        name: details ? 'details' : `testCard-${ind}`,
        uid: ind.toString(),
      };
    })
    .slice(0, limit);
}
