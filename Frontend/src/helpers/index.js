export const classes = (...args) => {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (argType === "object") {
      for (const key of Object.keys(arg)) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(" ");
};

export const getCookie = (c_name) => {
  let c_value = " " + document.cookie;
  let c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start === -1) {
    c_value = null;
  } else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end === -1) c_end = c_value.length;
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
};

export const formatToMoney = (
  number,
  withCurrency = false,
  currency = "USD",
  short = false
) => {
  if (withCurrency) {
    if (short) {
      if (number.toString().length >= 7) {
        const n = number.toString().slice(0, -6);
        return `${currency} ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} M`;
      } else {
        return `${currency} ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
    } else {
      return `${currency} ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    }
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getDevelopmentsData = (list) => {
  const obj = {};

  const roofed_surface = list.map((item) => Math.round(item.roofed_surface));
  const total_surface = list.map((item) => item?.total_surface);
  const unroofed_surface = list.map((item) => item?.unroofed_surface);

  const semiroofed_surface = list.map((item) => item?.total_surface);
  const room_amount = list.map((item) => item?.room_amount);
  const price = list.map((item) => item?.operations[0]?.prices[0]?.price);

  if (roofed_surface.length > 0)
    obj["roofed_surface"] = `${Math.min(...roofed_surface)} a ${Math.max(
      ...roofed_surface
    )}`;
  if (total_surface.length > 0)
    obj["total_surface"] = `${Math.min(...total_surface)} a ${Math.max(
      ...total_surface
    )}`;
  if (unroofed_surface.length > 0)
    obj["unroofed_surface"] = `${Math.min(...unroofed_surface)} a ${Math.max(
      ...unroofed_surface
    )}`;
  if (semiroofed_surface.length > 0)
    obj["semiroofed_surface"] = `${Math.min(
      ...semiroofed_surface
    )} a ${Math.max(...semiroofed_surface)}`;
  if (room_amount.length > 0)
    obj["room_amount"] = `${Math.min(...room_amount)} a ${Math.max(
      ...room_amount
    )}`;
  if (price.length > 0)
    obj["price"] = `${formatToMoney(Math.min(...price))} a ${formatToMoney(
      Math.max(...price)
    )}`;
  if (price.length > 0)
    obj["min_price"] = `${formatToMoney(Math.min(...price))}`;
  obj["currency"] = list[0]?.operations[0]?.prices[0]?.currency;

  return obj;
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const getPropertyValuesForFilter = (v) => {
  switch (v) {
    case "todos":
      return [
        { value: 1, label: "Venta" },
        { value: 2, label: "Alquiler" },
      ];
    case "venta":
      return [{ value: 1, label: "Venta" }];
    case "alquiler":
      return [{ value: 2, label: "Alquiler" }];
  }
};

export const getDropdownValue = (min, max, type, search = false) => {
  let st = "";

  if (typeof min === "string") {
    if (min === "") min = 0;
    else min = parseInt(min);
  }
  if (typeof max === "string") {
    if (max === "") max = 0;
    else max = parseInt(max);
  }

  if (!min) min = 0;
  if (!max) max = 0;

  if (min > 0 && max == 0) st = `Min. ${type ?? ""} ${type === "USD" ? formatToMoney(min) : min}`;
  if (max > 0 && min == 0) st = `Max. ${type ?? ""} ${type === "USD" ? formatToMoney(max) : max}`;
  if (max > 0 && min > 0) {
    if (type === "USD") {
      st = `${type ?? ""} ${formatToMoney(min)} - ${formatToMoney(max)}`;
    } else {
      st = `${type ?? ""} Min. ${min} - Max. ${max}`;
    }
  }
  if (max === min) st = `${type ?? ""} ${min}`;

  if (search) {
    if (min === 0 && max === 0) {
      st = '-';
    }
  } else {
    if (min === 0 && max === 0) return "";
  }

  return st;
};

export const getWindowDimensions = () => {
  if (typeof window !== "undefined") return window.innerWidth;
};

export const truncateWithEllipsis = (text, maxLength) => {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const objectValidation = (object, l) => {
  let flag = false;
  l.forEach(item => {
    if (!object[item]) flag = true;
  });
  return flag;
};
