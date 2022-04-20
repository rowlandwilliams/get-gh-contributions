"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRawContributionDataToDays = exports.dayToDate = void 0;
var dayToDate = function (year, day) {
    var date = new Date(year, 0, day + 1);
    return date.toLocaleDateString("en-GB").split("/").reverse().join("-");
};
exports.dayToDate = dayToDate;
var convertRawContributionDataToDays = function (contributionsData, year) {
    var contributions = contributionsData.contributions;
    var processedContributions = contributions
        .map(function (x) { return x.days; })
        .flat()
        .map(function (x, i) { return ({ date: (0, exports.dayToDate)(year, i), value: x.count }); });
    var today = new Date();
    var currentYear = today.getFullYear();
    // if in current year filter to only include past contributions
    if (currentYear === year) {
        var pastContributions = processedContributions.filter(function (_a) {
            var date = _a.date;
            return new Date(date).getTime() < today.getTime();
        });
        return pastContributions;
    }
    return processedContributions;
};
exports.convertRawContributionDataToDays = convertRawContributionDataToDays;
//# sourceMappingURL=helpers.js.map