import visTypes from 'ui/registry/vis_types';
import TemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';

import devioVisParamsTemplate from 'plugins/devio/devio_params.html';
require('plugins/devio/devio_controller');

visTypes.register(function (Private) {
  const TemplateVisType = Private(TemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return new TemplateVisType({
    name: 'devio',
    title: 'DEVIO',
    description: 'Welcome to Developers.IO',
    icon: 'fa-ban',
    template: '<svg id="elament1" width="50%" height="250" ng-controller="devioController"></svg>',
    params: {
      editor: devioVisParamsTemplate,
      defaults: {
        label: 'Fontsize',
        fontSize: 10,
        min: 0,
        max: 1
      }
    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Value',
        min: 1,
        max: 1,
        defaults: [
          { type: 'count', schema: 'metric' }
        ]
      }
    ])
  });
});
