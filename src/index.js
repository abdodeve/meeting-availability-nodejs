const { min } = require("moment");
var moment = require("moment");

const dateParser = (initDate) => {
  const preparedDate = {
    day: initDate.split(" ")[0],
    timeFrom: initDate.split(" ")[1].split("-")[0],
    timeTo: initDate.split("-")[1],
  };
  return preparedDate;
};

// var minutesOfDay = function (m) {
//   const hours = m.split(":")[0];
//   const minutes = m.split(":")[1];
//   return hours * 60 + minutes;
// };

const nearestDate = () => {
  const initDate = "1 08:45-12:59";
  const initDateParsed = dateParser(initDate);

  const hourAdded = moment(initDateParsed.timeTo, "HH:mm")
    .add(60, "minutes")
    .format("HH:mm");

  let startTime = moment("08:00", "HH:mm");
  let dynamicTime = moment("08:00", "HH:mm");
  const endTime = moment("18:00", "HH:mm");

  const inputDateFrom = moment("8:59", "HH:mm");
  const inputDateTo = moment("12:55", "HH:mm");

  //   console.log(endTime.isBefore(startTime));

  while (dynamicTime.isBefore(endTime)) {
    console.log({ dynamicTime });
    if (
      dynamicTime.isAfter(inputDateFrom.subtract(1, "minutes")) &&
      dynamicTime.isBefore(inputDateTo.add(1, "minutes"))
    ) {
      console.log("Is in the RANGE");
    }
    // My stuff Here
    if (dynamicTime.format("HH:mm") === "17:50") {
      dynamicTime.add("9", "minutes");
    } else {
      dynamicTime.add("59", "minutes");
    }
  }

  //   console.log(hourAdded);
};

const init = () => {
  nearestDate();
};
init();
