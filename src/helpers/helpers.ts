export const dayToDate = (year: number, day: number) => {
  const date = new Date(year, 0, day + 1);

  return date.toLocaleDateString("en-GB").split("/").reverse().join("-");
};

export const convertRawContributionDataToDays = (
  contributionsData: {
    contributions: { week: number; days: { count: number }[] }[];
  },
  year: number
) => {
  const { contributions } = contributionsData;

  const processedContributions = contributions
    .map((x) => x.days)
    .flat()
    .map((x, i) => ({ date: dayToDate(year, i), value: x.count }));

  const today = new Date();
  const currentYear = today.getFullYear();

  // if in current year filter to only include past contributions
  if (currentYear === year) {
    const pastContributions = processedContributions.filter(
      ({ date }) => new Date(date).getTime() < today.getTime()
    );

    return pastContributions;
  }

  return processedContributions;
};
