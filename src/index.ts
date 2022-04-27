import "dotenv/config";
import fetch from "node-fetch";
import { Contribution } from "./entity/Contribution";
import { convertRawContributionDataToDays } from "./helpers/helpers";
import { AppDataSource } from "./data-source";

console.log(process.env.DB_HOST, process.env.NODE_ENV, 'yoooo');

export const handler = () => {
  AppDataSource.initialize()
    .then(async () => {
      const today = new Date();
      const year = today.getFullYear();

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

      // get latest contribution
      const todaysContribution = dailyContributions.slice(-1)[0];
      const { date, value } = todaysContribution;

      // add to contributions table
      const contribution = new Contribution();
      contribution.date = date;
      contribution.value = value;

      console.log(contribution);
      await AppDataSource.manager.save(contribution);

      console.log(`Saved contribution for ${date}`);
    })
    .catch((error) => console.log(error));
};
