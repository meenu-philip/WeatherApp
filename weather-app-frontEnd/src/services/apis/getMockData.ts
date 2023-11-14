export const getMockData = (fileName: string) => {
  return import(`../../services/apis/mocks/${fileName}.json`);
};
