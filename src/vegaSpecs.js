export const graphs = {
    demandSupply: {
        "$schema": "https://vega.github.io/schema/vega/v3.0.json",
        "width": 500,
        "height": 200,
        "padding": 5,

        "data": [
            {
                "name": "table",
                "values": [
                    {"x": 0, "y": 100, "c":0},
                    {"x": 0, "y": 0, "c":1},
                    {"x": 1, "y": 0, "c":0},
                    {"x": 1, "y": 100, "c":1}
                ]
            }
        ],

        "scales": [
            {
                "name": "x",
                "type": "point",
                "range": "width",
                "domain": {"data": "table", "field": "x"}
            },
            {
                "name": "y",
                "type": "linear",
                "range": "height",
                "nice": true,
                "zero": true,
                "domain": {"data": "table", "field": "y"}
            },
            {
                "name": "color",
                "type": "ordinal",
                "range": "category",
                "domain": {"data": "table", "field": "c"}
            }
        ],

        "axes": [
            {"orient": "bottom", "scale": "x"},
            {"orient": "left", "scale": "y"}
        ],

        "marks": [
            {
                "type": "group",
                "from": {
                    "facet": {
                        "name": "series",
                        "data": "table",
                        "groupby": "c"
                    }
                },
                "marks": [
                    {
                        "type": "line",
                        "from": {"data": "series"},
                        "encode": {
                            "enter": {
                                "x": {"scale": "x", "field": "x"},
                                "y": {"scale": "y", "field": "y"},
                                "stroke": {"scale": "color", "field": "c"},
                                "strokeWidth": {"value": 2}
                            },
                            "update": {
                                "fillOpacity": {"value": 1}
                            },
                            "hover": {
                                "fillOpacity": {"value": 0.5}
                            }
                        }
                    }
                ]
            }
        ]
    },
    laborMarket: {
        "$schema": "https://vega.github.io/schema/vega/v3.0.json",
        "width": 500,
        "height": 200,
        "padding": 5,

        "data": [
            {
                "name": "table",
                "values": [
                    {"x": 0, "y": 100, "c": 0},
                    {"x": 0.2, "y": 30, "c": 0},
                    {"x": 1, "y": 0, "c": 0},
                    {"x": 0, "y": 0, "c": 1},
                    {"x": 1, "y": 100, "c": 1}
                ]
            }
        ],

        "scales": [
            {
                "name": "x",
                "type": "point",
                "range": "width",
                "domain": {"data": "table", "field": "x"}
            },
            {
                "name": "y",
                "type": "linear",
                "range": "height",
                "nice": true,
                "zero": true,
                "domain": {"data": "table", "field": "y"}
            },
            {
                "name": "color",
                "type": "ordinal",
                "range": "category",
                "domain": {"data": "table", "field": "c"}
            }
        ],

        "axes": [
            {"orient": "bottom", "scale": "x"},
            {"orient": "left", "scale": "y"}
        ],

        "marks": [
            {
                "type": "group",
                "from": {
                    "facet": {
                        "name": "series",
                        "data": "table",
                        "groupby": "c"
                    }
                },
                "marks": [
                    {
                        "type": "line",
                        "from": {"data": "series"},
                        "encode": {
                            "enter": {
                                "x": {"scale": "x", "field": "x"},
                                "y": {"scale": "y", "field": "y"},
                                "stroke": {"scale": "color", "field": "c"},
                                "strokeWidth": {"value": 2}
                            },
                            "update": {
                                "fillOpacity": {"value": 1}
                            },
                            "hover": {
                                "fillOpacity": {"value": 0.5}
                            }
                        }
                    }
                ]
            }
        ]
    },
    capitalMarket: {
        "$schema": "https://vega.github.io/schema/vega/v3.0.json",
        "width": 500,
        "height": 200,
        "padding": 5,

        "data": [
            {
                "name": "table",
                "values": [
                    {"x": 0, "y": 100, "c":0},
                    {"x": 0.5, "y": 0, "c":1},
                    {"x": 1, "y": 0, "c":0},
                    {"x": 0.5, "y": 100, "c":1}
                ]
            }
        ],

        "scales": [
            {
                "name": "x",
                "type": "point",
                "range": "width",
                "domain": {"data": "table", "field": "x"}
            },
            {
                "name": "y",
                "type": "linear",
                "range": "height",
                "nice": true,
                "zero": true,
                "domain": {"data": "table", "field": "y"}
            },
            {
                "name": "color",
                "type": "ordinal",
                "range": "category",
                "domain": {"data": "table", "field": "c"}
            }
        ],

        "axes": [
            {"orient": "bottom", "scale": "x"},
            {"orient": "left", "scale": "y"}
        ],

        "marks": [
            {
                "type": "group",
                "from": {
                    "facet": {
                        "name": "series",
                        "data": "table",
                        "groupby": "c"
                    }
                },
                "marks": [
                    {
                        "type": "line",
                        "from": {"data": "series"},
                        "encode": {
                            "enter": {
                                "x": {"scale": "x", "field": "x"},
                                "y": {"scale": "y", "field": "y"},
                                "stroke": {"scale": "color", "field": "c"},
                                "strokeWidth": {"value": 2}
                            },
                            "update": {
                                "fillOpacity": {"value": 1}
                            },
                            "hover": {
                                "fillOpacity": {"value": 0.5}
                            }
                        }
                    }
                ]
            }
        ]
    }
};
