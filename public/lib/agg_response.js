define(function (require) {
    return function pictureValuesProvider(Private, Notifier) {
        var _ = require('lodash');
        var arrayToLinkedList = require('ui/agg_response/hierarchical/_array_to_linked_list');

        var notify = new Notifier({
            location: 'Picture Values Response Converter'
        });

        var nodes = [];

        return function (vis, resp) {

            var metric = vis.aggs.bySchemaGroup.metrics[0];

            nodes = [];

            var pos = 0;

            var labels = null;

            try {
                labels = JSON.parse(vis.params.jsonLabels); //[ { 'text' : 'CUENTA'}, { 'text' : 'Maximo'}, { 'text' : 'Promedio'} ];
            } catch (e) {
                labels = "";
            }

            _.each(vis.aggs, function (d, i) {

                var type = d.__type.title;

                var value = 0;

                if (!d.__type.hasNoDsl) {
                    value = resp.aggregations[d.id].value;
                } else {
                    value = resp.hits.total;
                }

                if (labels.length > pos) {

                    var letter = labels[pos].letter; // Default letter to use

                    var valueColor = "red"; // default

                    if (labels[pos].ranges) {
                        _.each(labels[pos].ranges, function (range, p) {
                            if (value >= range.min && value < range.max) {
                                // Found!
                                letter = range.letter;
                                valueColor = range.valueColor;
                                return;
                            }
                        });
                    }

                    nodes.push({ 'type': type, 'value': value, 'label': labels[pos].text, 'letter': letter, 'formatNumber': labels[pos].numeralFormat ? labels[pos].numeralFormat : null , valueColor : valueColor });
                } else {
                    nodes.push({ 'type': type, 'value': value, 'label': type, 'letter': '\uf06a' });
                }

                pos++;
            });

            var chart = {
                'data': nodes
            };

            return chart;
        };
    };
});