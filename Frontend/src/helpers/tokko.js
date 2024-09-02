import { getKeyByValue } from "./index";
import { neighborhoods } from "./neighborhoods";

export const propertiesSelectOptions = [
  { value: 0, label: "Todos" },
  { value: 3, label: "Casas" },
  { value: 2, label: "Departamentos" },
  { value: 13, label: "PH" },
  { value: 1, label: "Terrenos" },
  { value: 5, label: "Oficinas" },
  { value: 10, label: "Cocheras" },
  { value: 7, label: "Locales" },
  { value: 9, label: "Campos" },
];

export const operationTypes = {
  todos: "1,2",
  venta: 1,
  alquiler: 2,
};

export const operationArray = [
  { value: 1, label: "Venta" },
  { value: 2, label: "Alquiler" },
];

export const propertyTypes = {
  todos: 0,
  terrenos: 1,
  departamentos: 2,
  casas: 3,
  emprendimientos: 4,
  oficinas: 5,
  ph: 13,
  locales: 7,
  campos: 9,
  cocheras: 10,
};

export const parseTokkoParameters = (query) => {
  query["filters"] = [];

  // Locations
  if (query.locid) {
    const locations = query.locid.map((item) =>
      neighborhoods.find(
        (loc) => item.toLowerCase().replace("-", "") === loc.location_name.toLowerCase()
      )
    );
    if (locations)
      query["current_localization_id"] = locations.map(
        (item) => item.location_id
      );
    delete query.locid;
  }

  // operation_types
  if (query.opid && query.opid !== "todos") {
    query["operation_types"] = [operationTypes[query.opid]];
    delete query.opid;
  }

  // property_types
  if (query.prid && query.prid !== "todos") {
    query["property_types"] = [propertyTypes[query.prid]];
    // handles emprendimientos
    if (query["property_types"] === 4) window.location.href = "/emprendimientos";
    delete query.prid;
  }

  if (query.baths_from) {
    query["filters"] = [
      ...query["filters"],
      ["bathroom_amount", ">", parseInt(query.baths_from) - 1],
    ];
    delete query.baths_from;
  }

  if (query.baths_to) {
    query["filters"] = [
      ...query["filters"],
      ["bathroom_amount", "<", parseInt(query.baths_to) + 1],
    ];
    delete query.baths_to;
  }

  if (query.m2_from) {
    query["filters"] = [
      ...query["filters"],
      ["total_surface", ">", parseInt(query.m2_from) - 1],
    ];
    delete query.m2_from;
  }

  if (query.m2_to) {
    query["filters"] = [
      ...query["filters"],
      ["total_surface", "<", parseInt(query.m2_to) + 1],
    ];
    delete query.m2_to;
  }

  if (query.rooms_from) {
    query["filters"] = [
      ...query["filters"],
      ["suite_amount", ">", parseInt(query.rooms_from) - 1],
    ];
    delete query.rooms_from;
  }

  if (query.rooms_to) {
    query["filters"] = [
      ...query["filters"],
      ["suite_amount", "<", parseInt(query.rooms_to) + 1],
    ];
    delete query.rooms_to;
  }

  if (query.parking_lot_to) {
    query["filters"] = [
      ...query["filters"],
      ["parking_lot_amount", "<", parseInt(query.parking_lot_to) + 1],
    ];
    delete query.parking_lot_to;
  }

  if (query.parking_lot_from) {
    query["filters"] = [
      ...query["filters"],
      ["parking_lot_amount", ">", parseInt(query.parking_lot_from) - 1],
    ];
    delete query.parking_lot_from;
  }

  // Pagination
  const page = parseInt(query.page);
  if (page && page > 0) {
    query.offset = (page - 1) * 26;
  }

  return query;
};

export const getSearchUrl = (params) => {
  let url =
    params.operation_type.length > 1
      ? `/todos`
      : `/${getKeyByValue(operationTypes, params.operation_type[0])}`;

  if (params.property_type && params.property_type > 0) {
    if (params.property_type === 4) window.location.href = "/emprendimientos";
    url = url + `/${getKeyByValue(propertyTypes, params.property_type)}`;
  } else {
    url = url + `/todos`;
  }

  if (params.locations) {
    params.locations.map((item) => {
      url =
        url +
        `/${neighborhoods
          .find((loc) => item === loc.location_id)
          ?.location_name.toLowerCase()
          .replace("-", "")}`;
    });
  }

  const query = {};

  if (params.price_from && params.price_from > 0)
    query["price_from"] = params.price_from;
  if (params.price_to && params.price_to > 0 && params.price_to < 3000000)
    query["price_to"] = params.price_to;
  if (params.min_rooms && params.min_rooms > 0)
    query["rooms_from"] = params.min_rooms;
  if (params.max_rooms && params.max_rooms > 0)
    query["rooms_to"] = params.max_rooms;
  if (params.min_baths && params.min_baths > 0)
    query["baths_from"] = params.min_baths;
  if (params.max_baths && params.max_baths > 0)
    query["baths_to"] = params.max_baths;
  if (params.parking_lot_to && params.parking_lot_to > 0)
    query["parking_lot_to"] = params.parking_lot_to;
  if (params.parking_lot_from && params.parking_lot_from > 0)
    query["parking_lot_from"] = params.parking_lot_from;

  if (params.order) query["order"] = params.order;

  if (Object.keys(query).length > 0)
    url =
      url +
      "?" +
      Object.keys(query)
        .map((item) => `${item}=${query[item]}`)
        .join("&");

  return url;
};
