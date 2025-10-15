const vis1 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Heatmap of global sales by genre and platform.",
  "data": {"url": "videogames_wide.csv"},
  "mark": "rect",
  "width": 600,
  "height": 400,
  "encoding": {
    "x": {"field": "Genre", "type": "nominal", "title": "Game Genre"},
    "y": {"field": "Platform", "type": "nominal", "title": "Platform"},
    "color": {
      "aggregate": "sum",
      "field": "Global_Sales",
      "type": "quantitative",
      "title": "Total Global Sales (Millions)"
    },
    "tooltip": [
      {"field": "Genre", "type": "nominal"},
      {"field": "Platform", "type": "nominal"},
      {"aggregate": "sum", "field": "Global_Sales", "type": "quantitative", "title": "Total Sales (M)"}
    ]
  }
};

vegaEmbed('#vis1', vis1);

const vis2 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Interactive line chart showing sales trends over time by platform and genre.",
  "data": { "url": "videogames_wide.csv" },
  "width": 700,
  "height": 400,

  "params": [
    {
      "name": "selected_platform",
      "value": "PS2",  // default platform
      "bind": {
        "input": "select",
        "options": [
          "PS2", "Wii", "X360", "PS3", "DS", "PS4", "PC", "3DS", "NES", "SNES", "N64"
        ],
        "name": "Select Platform: "
      }
    }
  ],

  "transform": [
    { "filter": "datum.Platform == selected_platform" }
  ],

  "mark": { "type": "line", "point": true },

  "encoding": {
    "x": {
      "field": "Year",
      "type": "temporal",
      "title": "Year of Release"
    },
    "y": {
      "aggregate": "sum",
      "field": "Global_Sales",
      "type": "quantitative",
      "title": "Total Global Sales (Millions)"
    },
    "color": {
      "field": "Genre",
      "type": "nominal",
      "title": "Genre"
    },
    "tooltip": [
      { "field": "Year", "type": "temporal" },
      { "field": "Genre", "type": "nominal" },
      { "field": "Platform", "type": "nominal" },
      {
        "aggregate": "sum",
        "field": "Global_Sales",
        "type": "quantitative",
        "title": "Total Sales (M)"
      }
    ]
  }
};

vegaEmbed('#vis2', vis2);

const vis3 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Grouped bar chart comparing regional sales by platform.",
  "data": { "url": "videogames_wide.csv" },
  "width": 700,
  "height": 400,
  "transform": [
    {
      "fold": ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
      "as": ["Region", "Sales"]
    }
  ],
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "Platform",
      "type": "nominal",
      "title": "Platform",
      "sort": "-y"
    },
    "y": {
      "aggregate": "sum",
      "field": "Sales",
      "type": "quantitative",
      "title": "Total Sales (Millions)"
    },
    "color": {
      "field": "Region",
      "type": "nominal",
      "title": "Region",
      "scale": { "scheme": "tableau10" }
    },
    "xOffset": { "field": "Region" },
    "tooltip": [
      { "field": "Platform", "type": "nominal" },
      { "field": "Region", "type": "nominal" },
      {
        "aggregate": "sum",
        "field": "Sales",
        "type": "quantitative",
        "title": "Total Sales (M)"
      }
    ]
  }
};

vegaEmbed('#vis3', vis3);

const vis4 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Interactive bar chart comparing genre sales by region.",
  "data": { "url": "videogames_wide.csv" },

  // --- Dropdown selector for region ---
  "params": [
    {
      "name": "selected_region",
      "value": "NA_Sales",  // default
      "bind": {
        "input": "select",
        "options": ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
        "labels": ["North America", "Europe", "Japan", "Other Regions"],
        "name": "Select Region: "
      }
    }
  ],

  // --- Transform: fold and filter based on selection ---
  "transform": [
    { "fold": ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"], "as": ["Region", "Sales"] },
    { "filter": "datum.Region == selected_region" },
    {
      "aggregate": [
        { "op": "sum", "field": "Sales", "as": "Total_Sales" }
      ],
      "groupby": ["Genre"]
    }
  ],

  // --- Visual encoding ---
  "mark": { "type": "bar", "cornerRadiusEnd": 3 },
  "encoding": {
    "x": {
      "field": "Genre",
      "type": "nominal",
      "sort": "-y",
      "title": "Game Genre"
    },
    "y": {
      "field": "Total_Sales",
      "type": "quantitative",
      "title": "Total Sales (Millions)"
    },
    "color": {
      "field": "Genre",
      "type": "nominal",
      "legend": null,
      "scale": { "scheme": "category20" }
    },
    "tooltip": [
      { "field": "Genre", "type": "nominal" },
      { "field": "Region", "type": "nominal" },
      { "field": "Total_Sales", "type": "quantitative", "title": "Sales (M)" }
    ]
  },

  // --- Layout config ---
  "width": 700,
  "height": 400,
  "config": {
    "axis": { "labelAngle": -20 },
    "legend": { "orient": "top" }
  }
};

vegaEmbed('#vis4', vis4);

