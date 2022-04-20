import { convertRawContributionDataToDays } from "./../helpers/helpers";
import { Contribution } from "./../entity/Contribution";
import { AppDataSource } from "./../data-source";
import fetch from "node-fetch";

const years = [2020, 2021, 2022];

AppDataSource.initialize()
  .then(async () => {
    years.forEach(async (year) => {
      const response = await fetch(
        `https://skyline.github.com/rowlandwilliams/${year}.json`
      );

      // get raw contribution data
      const contributionsData = await response.json();

      // convert raw data into days of the year
      const dailyContributions = convertRawContributionDataToDays(
        contributionsData,
        year
      );

      await AppDataSource.createQueryBuilder()
        .insert()
        .into(Contribution)
        .values(dailyContributions)
        .execute();

      console.log(`Saved all contributions for ${year}`);
    });
  })
  .catch((error) => console.log(error));
