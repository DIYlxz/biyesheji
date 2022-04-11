function getTime() {
  let myDate = new Date();
  let year = myDate.getFullYear();
  let Dmonth = myDate.getMonth() + 1;
  let Ddate = myDate.getDate();
  let Dhours = myDate.getHours();
  let Dmin = myDate.getMinutes();
  let month, date, hours, min;
  if (Dmonth < 10) {
    month = "0" + Dmonth;
  } else {
    month = Dmonth;
  }
  if (Ddate < 10) {
    date = "0" + Ddate;
  } else {
    date = Ddate;
  }
  if (Dhours < 10) {
    hours = "0" + Dhours;
  } else {
    hours = Dhours;
  }
  if (Dmin < 10) {
    min = "0" + Dmin;
  } else {
    min = Dmin;
  }
  let time = hours + ":" + min;
  let myTime = year + "-" + month + "-" + date + " " + time;
  return myTime;
}


module.exports = {
  getTime,
  timeRandom,
};
