export const sortObjectKeys = (obj) => {
  let orderedFields = {};

  Object.keys(obj).forEach((k) => {
    if (k !== "@context" && k !== "type" && typeof obj[k] === "object") {
      orderedFields = {
        ...orderedFields,
        [k]: obj[k],
      };
    }
  });

  Object.keys(obj).forEach((k) => {
    if (k !== "type" && typeof obj[k] !== "object") {
      orderedFields = {
        ...orderedFields,
        [k]: obj[k],
      };
    }
  });

  if (obj.type) {
    orderedFields = {
      ...orderedFields,
      type: Array.isArray(obj.type) ? obj.type.join(" ") : obj.type,
    };
  }

  let reversed = {};

  const keys = Object.keys(orderedFields);

  for (let i = keys.length - 1; i >= 0; i--) {
    let key = keys[i];
    let value = orderedFields[keys[i]];
    reversed = {
      ...reversed,
      [key]: value,
    };
  }

  return reversed;
};
