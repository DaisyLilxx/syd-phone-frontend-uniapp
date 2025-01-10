"use strict";
require("../common/vendor.js");
require("../stores/index.js");
function toThousandsWithSmallNum(num, type) {
  if (type) {
    if (num != 0 && !num)
      return num;
  }
  const absNumVal = Math.abs(num);
  let preStr = "", smallNum = "", result = "";
  if (num < 0)
    preStr = "-";
  let absNum = (absNumVal || 0).toString();
  if (absNum.indexOf(".") > -1) {
    smallNum = `.${absNum.split(".")[1]}`;
    absNum = absNum.split(".")[0];
  }
  while (absNum.length > 3) {
    result = "," + absNum.slice(-3) + result;
    absNum = absNum.slice(0, absNum.length - 3);
  }
  if (absNum) {
    result = absNum + result;
  }
  return preStr + result + smallNum;
}
exports.toThousandsWithSmallNum = toThousandsWithSmallNum;
