const { findDOMNode } = require("react-dom");
const propertyGroups = require("stylelint-config-recess-order/groups");

module.exports = {
  extends: [
    "stylelint-config-recess-order",
    "stylelint-config-standard-scss",
    "stylelint-config-sass-guidelines",
    "stylelint-config-standard",
  ],
  plugins: ["stylelint-no-nested-media", "stylelint-group-selectors", "stylelint-scss"],
  rules: {
    "scss/dollar-variable-pattern": null,
    "pitcher/no-nested-media": true,
    "declaration-empty-line-before": null,
    "selector-max-id": null,
    "order/properties-order": propertyGroups.map(group => ({
      ...group,
      emptyLineBefore: "always",
      noEmptyLineBetween: true,
    })),
    "color-hex-length": "long",
    "scss/no-duplicate-dollar-variables": true,
    "at-rule-no-unknown": null,
    "media-query-no-invalid": null,
    "selector-class-pattern": null,
  },
  overrides: [
    {
      files: ["*.module.scss"],
      rules: {
        "selector-class-pattern": [
          "^[a-z][a-zA-Z0-9]*$",
          {
            message: "Selector should be in camelCase.",
          },
        ],
      },
    },
  ],
};
findDOMNode;
