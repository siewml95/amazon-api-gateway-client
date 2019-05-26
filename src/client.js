import AwsSignerV4 from 'stackable-fetcher-aws-signer-v4'
import {
  Fetcher,
  JsonRequestEncoder,
  JsonResponseDecoder,
  RejectLogger
} from 'stackable-fetcher'
import Deployment from './deployment'
import Integration from './integration'
import IntegrationResponse from './integration-response'
import Method from './method'
import MethodResponse from './method-response'
import Model from './model'
import path from 'path'
import Resource from './resource'
import Restapi from './restapi'
import AWS from 'aws-sdk';



/**
 * @class Client
 */
export default class Client {
  /**
   * @param {String} accessKeyId
   * @param {Fetcher} fetcher
   * @param {String} region
   * @param {String} secretAccessKey
   */
  constructor({
    accessKeyId,
    fetcher,
    region,
    secretAccessKey
  }) {
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
  createDeployment({
    cacheClusterEnabled,
    cacheClusterSize,
    description,
    restapiId,
    stageDescription,
    stageName
  }) {
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
    }).promise().then(
      body => new Deployment(body)
    )
  }

  /**
   * @param {String} parentId
   * @param {String} pathPart
   * @param {String} restapiId
   * @return {Promise}
   */
  createResource({
    parentId,
    pathPart,
    restapiId
  }) {
    /*return this.getFetcher().post(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources/${parentId}`,
      { pathPart: pathPart }
    ).then(body => new Resource(body));*/

    return this.getFetcher().createResource({
      parentId: parentId,
      restApiId: restapiId,
      pathPart: pathPart
    }).promise().then(body => new Resource(body))
  }

  /**
   * @param {Array.<String>} paths
   * @param {String} restapiId
   * @return {Promise}
   */
  createResources({
    paths,
    restapiId
  }) {
    return this.getRootResource({
      restapiId: restapiId
    }).then((rootResource) => {
      return this._createResourcesByPaths({
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
  createRestapi({
    name
  }) {
    /*  return this.getFetcher().post(
        `${this._getBaseUrl()}/restapis`,
        { name: name }
      ).then(body => new Restapi(body)); */

    return this.getFetcher().createRestApi({
      name: name
    }).promise().then(body => new Restapi(body))
  }

  /**
   * @param {String} modelName
   * @param {String} restapiId
   * @return {Promise}
   */
  deleteModel({
    modelName,
    restapiId
  }) {
    /*return this.getFetcher().delete(
      `${this._getBaseUrl()}/restapis/${restapiId}/models/${modelName}`
    ).then(response => null);*/

    return this.getFetcher().deleteModel({
      restApiId: restapiId,
      modelName: modelName
    }).promise().then(response => null)
  }

  /**
   * @param {String} restapiId
   * @return {Promise}
   */
  deleteRestapi({
    restapiId
  }) {
    /*return this.getFetcher().delete(
      `${this._getBaseUrl()}/restapis/${restapiId}`
    ).then(response => null);
    */
    return this.getFetcher().deleteRestApi({
      restApiId: restapiId
    }).promise().then(response => null)
  }

  /**
   * @todo Use Array.prototype.find polyfill instead of forEach
   * @param {String} path
   * @param {String} restapiId
   * @return {Promise}
   */
  findResourceByPath({
    path,
    restapiId
  }) {
    return this.listResources({
      restapiId: restapiId
    }).then((resources) => {
      let matchedResource;
      resources.forEach((resource) => {
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
  getFetcher() {
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
  getMethod({
    httpMethod,
    resourceId,
    restapiId
  }) {
    /*return this.getFetcher().get(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}`
    ).then(source => new Method(source));
*/
    return this.getFetcher().getMethod({
      httpMethod: httpMethod,
      resourceId: resourceId,
      restApiId: restapiId
    }).promise().then(source => new Method(source))
  }

  /**
   * @param {String} restapiId
   * @return {Promise}
   */
  getRestapi({
    restapiId
  }) {
    /*  return this.getFetcher().get(
       `${this._getBaseUrl()}/restapis/${restapiId}`
     ).then(source => new Restapi(source));*/

    return this.getFetcher().getRestApi({
      restApiId: restapiId
    }).promise().then(source => new Restapi(source))
  }

  /**
   * @param {String} restapiId
   * @return {Promise}
   */
  getRootResource({
    restapiId
  }) {
    return this.findResourceByPath({
      path: '/',
      restapiId: restapiId
    });
  }

  /**
   * @param {String} restapiId
   * @return {Promise}
   */
  listDeployments({
    restapiId
  }) {
    /*return this.getFetcher().get(
      `${this._getBaseUrl()}/restapis/${restapiId}/deployments`
    ).then(body => body._embedded.item.map(source => new Deployment(source)));*/

    return this.getFetcher().getDeployments({
      restApiId: restapiId
    }).promise().then(body => body._embedded.item.map(source => new Deployment(source)))
  }

  /**
   * @param {String} restapiId
   * @return {Promise}
   */
  listResources({
    restapiId
  }) {
    /*return this.getFetcher().get(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources`
    ).then(body => body._embedded.item.map(source => new Resource(source))); */
    return this.getFetcher().getResources({
      restApiId: restapiId
    }).promise().then(body => body._embedded.item.map(source => new Resource(source)))
  }

  /**
   * @return {Promise}
   */
  listRestapis() {
    /*return this.getFetcher().get(
      `${this._getBaseUrl()}/restapis`
    ).then(body => body._embedded.item.map(source => new Restapi(source)));*/

    return this.getFetcher().getRestApis({

    }).promise().then(body => body._embedded.item.map(source => new Restapi(source)))
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
  putIntegration({
    cacheKeyParameters,
    cacheNamespace,
    credentials,
    httpMethod,
    integrationHttpMethod,
    requestParameters,
    requestTemplates,
    resourceId,
    restapiId,
    type,
    uri
  }) {
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
      httpMethod : httpMethod,
      resourceId: resourceId,
      restApiId: restapiId,
      cacheKeyParameters: cacheKeyParameters,
      cacheNamespace: cacheNamespace,
      credentials: credentials,
      httpMethod: integrationHttpMethod,
      requestParameters: requestParameters,
      requestTemplates: requestTemplates,
      type: type,
      uri: uri,
    }).promise().then(body=>new Integration(body))
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
  putIntegrationResponse({
    httpMethod,
    resourceId,
    responseParameters,
    responseTemplates,
    restapiId,
    selectionPattern,
    statusCode
  }) {
    /*return this.getFetcher().put(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}/integration/responses/${statusCode}`, {
        selectionPattern: selectionPattern,
        responseParameters: responseParameters,
        responseTemplates: responseTemplates
      }
    ).then(body => new IntegrationResponse(body));*/


    return this.getFetcher().putIntegrationResponse({
      httpMethod : httpMethod,
      resourceId: resourceId,
      restApiId: restapiId,
      statusCode : statusCode,
      selectionPattern: selectionPattern,
      responseParameters: responseParameters,
      responseTemplates: responseTemplates
    }).promise().then(body => new IntegrationResponse(body))
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
  putMethod({
    apiKeyRequired,
    authorizationType,
    httpMethod,
    requestModels,
    requestParameters,
    resourceId,
    restapiId
  }) {
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
      restApiId:restapiId,
      resourceId:resourceId,
      httpMethod:httpMethod,
      apiKeyRequired: apiKeyRequired || false,
      authorizationType: authorizationType || 'NONE',
      requestModels: requestModels || {},
      requestParameters: requestParameters || {}
    }
    ).promise().then(body=>new Method(body))
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
  putMethodResponse({
    httpMethod,
    resourceId,
    responseModels,
    responseParameters,
    restapiId,
    statusCode
  }) {
    /*return this.getFetcher().put(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}/responses/${statusCode}`, {
        responseModels: responseModels || {},
        responseParameters: responseParameters || {}
      }
    ).then(body => new MethodResponse(body));*/

    return this.getFetcher().putMethodResponse({
      httpMethod : httpMethod,
      resourceId : resourceId,
      restApiId : restapiId,
      statusCode: statusCode,
      responseModels: responseModels || {},
      responseParameters: responseParameters || {}
    }).promise().then(body=>new MethodResponse(body))
  }

  /**
   * @param {Function} middleware
   * @param {Object=} options
   * @return {Client}
   */
  use(middleware, options) {
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
  _buildFetcher() {
    return new AWS.APIGateway({
      accessKeyId: this.accessKeyId, //apigatewayConfig.ACCESS_KEY_ID,
      secretAccessKey: this.secretAccessKey, //process.env.SECRET_ACCESS_KEY,
      region: this.region
    })
  }

  /**
   * @param {Resource} parentResource
   * @param {Array.<String>} pathParts
   * @param {String} restapiId
   * @return {Promise}
   */
  _createChildResources({
    parentResource,
    pathParts,
    restapiId
  }) {
    if (pathParts.length > 0) {
      return this.findResourceByPath({
        path: path.join(parentResource.source.path, pathParts[0]),
        restapiId: restapiId
      }).then((resource) => {
        return resource || this.createResource({
          parentId: parentResource.source.id,
          pathPart: pathParts[0],
          restapiId: restapiId
        });
      }).then((resource) => {
        return this._createChildResources({
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
  _createResourcesByPaths({
    paths,
    restapiId,
    rootResource
  }) {
    if (paths.length > 0) {
      return this._createChildResources({
        parentResource: rootResource,
        pathParts: paths[0].split('/').slice(1),
        restapiId: restapiId
      }).then(() => {
        return this._createResourcesByPaths({
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
  _getBaseUrl() {
    return `https://apigateway.${this.region}.amazonaws.com`;
  }
}
