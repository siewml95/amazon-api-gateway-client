'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _stackableFetcherAwsSignerV4 = require('stackable-fetcher-aws-signer-v4');

var _stackableFetcherAwsSignerV42 = _interopRequireDefault(_stackableFetcherAwsSignerV4);

var _stackableFetcher = require('stackable-fetcher');

var _deployment = require('./deployment');

var _deployment2 = _interopRequireDefault(_deployment);

var _integration = require('./integration');

var _integration2 = _interopRequireDefault(_integration);

var _integrationResponse = require('./integration-response');

var _integrationResponse2 = _interopRequireDefault(_integrationResponse);

var _method = require('./method');

var _method2 = _interopRequireDefault(_method);

var _methodResponse = require('./method-response');

var _methodResponse2 = _interopRequireDefault(_methodResponse);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resource = require('./resource');

var _resource2 = _interopRequireDefault(_resource);

var _restapi = require('./restapi');

var _restapi2 = _interopRequireDefault(_restapi);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

/**
 * @class Client
 */

var Client = (function () {
  /**
   * @param {String} accessKeyId
   * @param {Fetcher} fetcher
   * @param {String} region
   * @param {String} secretAccessKey
   */

  function Client(_ref) {
    var accessKeyId = _ref.accessKeyId;
    var fetcher = _ref.fetcher;
    var region = _ref.region;
    var secretAccessKey = _ref.secretAccessKey;

    _classCallCheck(this, Client);

    this.accessKeyId = accessKeyId;
    this._fetcher = fetcher;
    this.region = region;
    this.secretAccessKey = secretAccessKey;
  }

  /**
   * @param {Boolean=} cacheClusterEnabled
   * @param {Integer=} cacheClusterSize
   * @param {String=} description
   * @param {String} restapiId
   * @param {String} stageDescription
   * @param {String} stageName
   * @return {Promise}
   */

  _createClass(Client, [{
    key: 'createDeployment',
    value: function createDeployment(_ref2) {
      var cacheClusterEnabled = _ref2.cacheClusterEnabled;
      var cacheClusterSize = _ref2.cacheClusterSize;
      var description = _ref2.description;
      var restapiId = _ref2.restapiId;
      var stageDescription = _ref2.stageDescription;
      var stageName = _ref2.stageName;

      /*  return this.getFetcher().post(
          `${this._getBaseUrl()}/restapis/${restapiId}/deployments`,
         ).then(body => new Deployment(body));*/
      return this.getFetcher().createDeployment({
        restApiId: restapiId,
        cacheClusterEnabled: cacheClusterEnabled,
        cacheClusterSize: cacheClusterSize,
        description: description,
        stageDescription: stageDescription,
        stageName: stageName
      }).promise().then(function (body) {
        return new _deployment2['default'](body);
      });
    }

    /**
     * @param {String} parentId
     * @param {String} pathPart
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'createResource',
    value: function createResource(_ref3) {
      var parentId = _ref3.parentId;
      var pathPart = _ref3.pathPart;
      var restapiId = _ref3.restapiId;

      /*return this.getFetcher().post(
        `${this._getBaseUrl()}/restapis/${restapiId}/resources/${parentId}`,
        { pathPart: pathPart }
      ).then(body => new Resource(body));*/

      return this.getFetcher().createResource({
        parentId: parentId,
        restApiId: restapiId,
        pathPart: pathPart
      }).promise().then(function (body) {
        return new _resource2['default'](body);
      });
    }

    /**
     * @param {Array.<String>} paths
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'createResources',
    value: function createResources(_ref4) {
      var _this = this;

      var paths = _ref4.paths;
      var restapiId = _ref4.restapiId;

      return this.getRootResource({
        restapiId: restapiId
      }).then(function (rootResource) {
        return _this._createResourcesByPaths({
          paths: paths,
          restapiId: restapiId,
          rootResource: rootResource
        });
      });
    }

    /**
     * @param {String} name
     * @return {Promise}
     */
  }, {
    key: 'createRestapi',
    value: function createRestapi(_ref5) {
      var name = _ref5.name;

      /*  return this.getFetcher().post(
          `${this._getBaseUrl()}/restapis`,
          { name: name }
        ).then(body => new Restapi(body)); */

      return this.getFetcher().createRestApi({
        name: name
      }).promise().then(function (body) {
        return new _restapi2['default'](body);
      });
    }

    /**
     * @param {String} modelName
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'deleteModel',
    value: function deleteModel(_ref6) {
      var modelName = _ref6.modelName;
      var restapiId = _ref6.restapiId;

      /*return this.getFetcher().delete(
        `${this._getBaseUrl()}/restapis/${restapiId}/models/${modelName}`
      ).then(response => null);*/

      return this.getFetcher().deleteModel({
        restApiId: restapiId,
        modelName: modelName
      }).promise().then(function (response) {
        return null;
      });
    }

    /**
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'deleteRestapi',
    value: function deleteRestapi(_ref7) {
      var restapiId = _ref7.restapiId;

      /*return this.getFetcher().delete(
        `${this._getBaseUrl()}/restapis/${restapiId}`
      ).then(response => null);
      */
      return this.getFetcher().deleteRestApi({
        restApiId: restapiId
      }).promise().then(function (response) {
        return null;
      });
    }

    /**
     * @todo Use Array.prototype.find polyfill instead of forEach
     * @param {String} path
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'findResourceByPath',
    value: function findResourceByPath(_ref8) {
      var path = _ref8.path;
      var restapiId = _ref8.restapiId;

      return this.listResources({
        restapiId: restapiId
      }).then(function (resources) {
        var matchedResource = undefined;
        resources.forEach(function (resource) {
          if (resource.source.path === path) {
            matchedResource = resource;
          }
        });
        return matchedResource;
      });
    }

    /**
     * @return {Fetcher}
     */
  }, {
    key: 'getFetcher',
    value: function getFetcher() {
      if (!this._fetcher) {
        this._fetcher = this._buildFetcher();
      }
      return this._fetcher;
    }

    /**
     * @param {String} httpMethod
     * @param {String} resourceId
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'getMethod',
    value: function getMethod(_ref9) {
      var httpMethod = _ref9.httpMethod;
      var resourceId = _ref9.resourceId;
      var restapiId = _ref9.restapiId;

      /*return this.getFetcher().get(
        `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}`
      ).then(source => new Method(source));
      */
      return this.getFetcher().getMethod({
        httpMethod: httpMethod,
        resourceId: resourceId,
        restApiId: restapiId
      }).promise().then(function (source) {
        return new _method2['default'](source);
      });
    }

    /**
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'getRestapi',
    value: function getRestapi(_ref10) {
      var restapiId = _ref10.restapiId;

      /*  return this.getFetcher().get(
         `${this._getBaseUrl()}/restapis/${restapiId}`
       ).then(source => new Restapi(source));*/

      return this.getFetcher().getRestApi({
        restApiId: restapiId
      }).promise().then(function (source) {
        return new _restapi2['default'](source);
      });
    }

    /**
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'getRootResource',
    value: function getRootResource(_ref11) {
      var restapiId = _ref11.restapiId;

      return this.findResourceByPath({
        path: '/',
        restapiId: restapiId
      });
    }

    /**
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'listDeployments',
    value: function listDeployments(_ref12) {
      var restapiId = _ref12.restapiId;

      /*return this.getFetcher().get(
        `${this._getBaseUrl()}/restapis/${restapiId}/deployments`
      ).then(body => body._embedded.item.map(source => new Deployment(source)));*/

      return this.getFetcher().getDeployments({
        restApiId: restapiId
      }).promise().then(function (body) {
        return body._embedded.item.map(function (source) {
          return new _deployment2['default'](source);
        });
      });
    }

    /**
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'listResources',
    value: function listResources(_ref13) {
      var restapiId = _ref13.restapiId;

      /*return this.getFetcher().get(
        `${this._getBaseUrl()}/restapis/${restapiId}/resources`
      ).then(body => body._embedded.item.map(source => new Resource(source))); */
      return this.getFetcher().getResources({
        restApiId: restapiId
      }).promise().then(function (body) {
        return body._embedded.item.map(function (source) {
          return new _resource2['default'](source);
        });
      });
    }

    /**
     * @return {Promise}
     */
  }, {
    key: 'listRestapis',
    value: function listRestapis() {
      /*return this.getFetcher().get(
        `${this._getBaseUrl()}/restapis`
      ).then(body => body._embedded.item.map(source => new Restapi(source)));*/

      return this.getFetcher().getRestApis({}).promise().then(function (body) {
        return body._embedded.item.map(function (source) {
          return new _restapi2['default'](source);
        });
      });
    }

    /**
     * @param {Array.<String>=} cacheKeyParameters
     * @param {String=} cacheNamespace
     * @param {Boolean=} credentials
     * @param {String} httpMethod
     * @param {String=} integrationHttpMethod
     * @param {Object=} requestParameters
     * @param {Object=} requestTemplates
     * @param {String} resourceId
     * @param {String} restapiId
     * @param {String} type
     * @param {String=} uri
     * @return {Promise}
     */
  }, {
    key: 'putIntegration',
    value: function putIntegration(_ref14) {
      var cacheKeyParameters = _ref14.cacheKeyParameters;
      var cacheNamespace = _ref14.cacheNamespace;
      var credentials = _ref14.credentials;
      var httpMethod = _ref14.httpMethod;
      var integrationHttpMethod = _ref14.integrationHttpMethod;
      var requestParameters = _ref14.requestParameters;
      var requestTemplates = _ref14.requestTemplates;
      var resourceId = _ref14.resourceId;
      var restapiId = _ref14.restapiId;
      var type = _ref14.type;
      var uri = _ref14.uri;

      /*return this.getFetcher().put(
        `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}/integration`,
        {
           cacheKeyParameters: cacheKeyParameters,
           cacheNamespace: cacheNamespace,
           credentials: credentials,
           httpMethod: integrationHttpMethod,
           requestParameters: requestParameters,
           requestTemplates: requestTemplates,
           type: type,
           uri: uri,
        }
      ).then(body => new Integration(body));*/
      return this.getFetcher().putIntegration({
        httpMethod: httpMethod,
        resourceId: resourceId,
        restApiId: restapiId,
        cacheKeyParameters: cacheKeyParameters,
        cacheNamespace: cacheNamespace,
        credentials: credentials,
        httpMethod: integrationHttpMethod,
        requestParameters: requestParameters,
        requestTemplates: requestTemplates,
        type: type,
        uri: uri
      }).promise().then(function (body) {
        return new _integration2['default'](body);
      });
    }

    /**
     * @param {String} httpMethod
     * @param {String} resourceId
     * @param {Object=} responseParameters
     * @param {Object=} responseTemplates
     * @param {String} restapiId
     * @param {Object=} selectionPattern
     * @param {Integer} statusCode
     * @return {Promise}
     */
  }, {
    key: 'putIntegrationResponse',
    value: function putIntegrationResponse(_ref15) {
      var httpMethod = _ref15.httpMethod;
      var resourceId = _ref15.resourceId;
      var responseParameters = _ref15.responseParameters;
      var responseTemplates = _ref15.responseTemplates;
      var restapiId = _ref15.restapiId;
      var selectionPattern = _ref15.selectionPattern;
      var statusCode = _ref15.statusCode;

      /*return this.getFetcher().put(
        `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}/integration/responses/${statusCode}`, {
          selectionPattern: selectionPattern,
          responseParameters: responseParameters,
          responseTemplates: responseTemplates
        }
      ).then(body => new IntegrationResponse(body));*/

      return this.getFetcher().putIntegrationResponse({
        httpMethod: httpMethod,
        resourceId: resourceId,
        restApiId: restapiId,
        statusCode: statusCode,
        selectionPattern: selectionPattern,
        responseParameters: responseParameters,
        responseTemplates: responseTemplates
      }).promise().then(function (body) {
        return new _integrationResponse2['default'](body);
      });
    }

    /**
     * @param {Boolean=} apiKeyRequired
     * @param {String=} authorizationType
     * @param {String} httpMethod
     * @param {Object=} requestModels
     * @param {Object=} requestParameters
     * @param {String} resourceId
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: 'putMethod',
    value: function putMethod(_ref16) {
      var apiKeyRequired = _ref16.apiKeyRequired;
      var authorizationType = _ref16.authorizationType;
      var httpMethod = _ref16.httpMethod;
      var requestModels = _ref16.requestModels;
      var requestParameters = _ref16.requestParameters;
      var resourceId = _ref16.resourceId;
      var restapiId = _ref16.restapiId;

      /*  return this.getFetcher().put(
          `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}`, {
            apiKeyRequired: apiKeyRequired || false,
            authorizationType: authorizationType || 'NONE',
            requestModels: requestModels || {},
            requestParameters: requestParameters || {}
          }
        ).then(body => new Method(body));
      */
      return this.getFetcher().putMethod({
        restApiId: restapiId,
        resourceId: resourceId,
        httpMethod: httpMethod,
        apiKeyRequired: apiKeyRequired || false,
        authorizationType: authorizationType || 'NONE',
        requestModels: requestModels || {},
        requestParameters: requestParameters || {}
      }).promise().then(function (body) {
        return new _method2['default'](body);
      });
    }

    /**
     * @param {String} httpMethod
     * @param {String} resourceId
     * @param {Object=} responseModels
     * @param {Object=} responseParameters
     * @param {String} restapiId
     * @param {Integer} statusCode
     * @return {Promise}
     */
  }, {
    key: 'putMethodResponse',
    value: function putMethodResponse(_ref17) {
      var httpMethod = _ref17.httpMethod;
      var resourceId = _ref17.resourceId;
      var responseModels = _ref17.responseModels;
      var responseParameters = _ref17.responseParameters;
      var restapiId = _ref17.restapiId;
      var statusCode = _ref17.statusCode;

      /*return this.getFetcher().put(
        `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}/responses/${statusCode}`, {
          responseModels: responseModels || {},
          responseParameters: responseParameters || {}
        }
      ).then(body => new MethodResponse(body));*/

      return this.getFetcher().putMethodResponse({
        httpMethod: httpMethod,
        resourceId: resourceId,
        restApiId: restapiId,
        statusCode: statusCode,
        responseModels: responseModels || {},
        responseParameters: responseParameters || {}
      }).promise().then(function (body) {
        return new _methodResponse2['default'](body);
      });
    }

    /**
     * @param {Function} middleware
     * @param {Object=} options
     * @return {Client}
     */
  }, {
    key: 'use',
    value: function use(middleware, options) {
      return new this.constructor({
        accessKeyId: this.accessKeyId,
        fetcher: this.getFetcher().use(middleware, options),
        region: this.region,
        secretAccessKey: this.secretAccessKey
      });
    }

    /**
     * @return {Fetcher}
     */
  }, {
    key: '_buildFetcher',
    value: function _buildFetcher() {
      return new _awsSdk2['default'].APIGateway({
        accessKeyId: this.accessKeyId, //apigatewayConfig.ACCESS_KEY_ID,
        secretAccessKey: this.secretAccessKey, //process.env.SECRET_ACCESS_KEY,
        region: this.region
      });
    }

    /**
     * @param {Resource} parentResource
     * @param {Array.<String>} pathParts
     * @param {String} restapiId
     * @return {Promise}
     */
  }, {
    key: '_createChildResources',
    value: function _createChildResources(_ref18) {
      var _this2 = this;

      var parentResource = _ref18.parentResource;
      var pathParts = _ref18.pathParts;
      var restapiId = _ref18.restapiId;

      if (pathParts.length > 0) {
        return this.findResourceByPath({
          path: _path2['default'].join(parentResource.source.path, pathParts[0]),
          restapiId: restapiId
        }).then(function (resource) {
          return resource || _this2.createResource({
            parentId: parentResource.source.id,
            pathPart: pathParts[0],
            restapiId: restapiId
          });
        }).then(function (resource) {
          return _this2._createChildResources({
            parentResource: resource,
            pathParts: pathParts.slice(1),
            restapiId: restapiId
          });
        });
      } else {
        return Promise.resolve();
      }
    }

    /**
     * @param {Array.<String>} paths
     * @param {String} restapiId
     * @param {Resource} rootResource
     * @return {Promise}
     */
  }, {
    key: '_createResourcesByPaths',
    value: function _createResourcesByPaths(_ref19) {
      var _this3 = this;

      var paths = _ref19.paths;
      var restapiId = _ref19.restapiId;
      var rootResource = _ref19.rootResource;

      if (paths.length > 0) {
        return this._createChildResources({
          parentResource: rootResource,
          pathParts: paths[0].split('/').slice(1),
          restapiId: restapiId
        }).then(function () {
          return _this3._createResourcesByPaths({
            paths: paths.slice(1),
            restapiId: restapiId,
            rootResource: rootResource
          });
        });
      } else {
        return Promise.resolve();
      }
    }

    /**
     * @return {String}
     */
  }, {
    key: '_getBaseUrl',
    value: function _getBaseUrl() {
      return 'https://apigateway.' + this.region + '.amazonaws.com';
    }
  }]);

  return Client;
})();

exports['default'] = Client;
module.exports = exports['default'];