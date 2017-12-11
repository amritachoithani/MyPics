define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'regenerator-runtime', './auth-config'], function (exports, _environment, _regeneratorRuntime, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;
  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.users = users;
      this.message = 'Home';
      this.showLogin = true;
    }

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";
      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.users.save(this.user);

              case 2:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    return Home;
  }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/gallery', '../resources/data/pics', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _gallery, _pics, _aureliaAuth) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.List = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _gallery.Gallery, _pics.Pics, _aureliaAuth.AuthService), _dec(_class = function () {
        function List(router, gallery, pics, auth) {
            _classCallCheck(this, List);

            this.gallery = gallery;
            this.pics = pics;
            this.router = router;
            this.message = 'List';
            this.auth = auth;
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.showList = 'galleryList';
        }

        List.prototype.activate = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.gallery.getUserGallery(this.user._id);

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function activate() {
                return _ref.apply(this, arguments);
            }

            return activate;
        }();

        List.prototype.createGallery = function createGallery() {
            this.galleryObj = {
                gallery: "",
                description: "",
                dateCreated: new Date(),
                userId: this.user._id
            };
            this.showList = 'galleryForm';
        };

        List.prototype.createPhotos = function createPhotos() {
            this.photoObj = {
                galleryId: JSON.parse(sessionStorage.getItem('gallery'))._id
            };
            this.showList = 'picsForm';
        };

        List.prototype.editGallery = function editGallery(gallery) {
            this.galleryObj = gallery;
            this.showList = 'galleryForm';
        };

        List.prototype.editPics = function editPics(pics) {
            this.photoObj = pics;
            this.showList = 'picsForm';
        };

        List.prototype.deleteGallery = function deleteGallery(gallery) {
            this.gallery.deleteGallery(gallery._id);
        };

        List.prototype.deletePics = function deletePics(pics) {
            this.pics.deletePics(pics._id);
        };

        List.prototype.changeFiles = function changeFiles() {
            this.filesToUpload = new Array();
            this.filesToUpload.push(this.files[0]);
        };

        List.prototype.removeFile = function removeFile(index) {
            this.filesToUpload.splice(index, 1);
        };

        List.prototype.saveGallery = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var response, galleryId;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!this.galleryObj) {
                                    _context2.next = 14;
                                    break;
                                }

                                _context2.next = 3;
                                return this.gallery.save(this.galleryObj);

                            case 3:
                                response = _context2.sent;

                                if (!response.error) {
                                    _context2.next = 8;
                                    break;
                                }

                                alert("There was an error creating the Galleries");
                                _context2.next = 13;
                                break;

                            case 8:
                                galleryId = response._id;

                                if (!(this.filesToUpload && this.filesToUpload.length)) {
                                    _context2.next = 13;
                                    break;
                                }

                                _context2.next = 12;
                                return this.gallery.uploadFile(this.filesToUpload, this.user._id, galleryId);

                            case 12:
                                this.filesToUpload = [];

                            case 13:
                                this.showList = 'galleryList';

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function saveGallery() {
                return _ref2.apply(this, arguments);
            }

            return saveGallery;
        }();

        List.prototype.savePics = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                var response, picsId, galleryId;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!this.photoObj) {
                                    _context3.next = 15;
                                    break;
                                }

                                _context3.next = 3;
                                return this.pics.savePicture(this.photoObj);

                            case 3:
                                response = _context3.sent;

                                if (!response.error) {
                                    _context3.next = 8;
                                    break;
                                }

                                alert("There was an error uploading the photo");
                                _context3.next = 14;
                                break;

                            case 8:
                                picsId = response._id;
                                galleryId = response.galleryId;

                                if (!(this.filesToUpload && this.filesToUpload.length)) {
                                    _context3.next = 14;
                                    break;
                                }

                                _context3.next = 13;
                                return this.pics.uploadFile(this.filesToUpload, galleryId, picsId);

                            case 13:
                                this.filesToUpload = [];

                            case 14:
                                this.showList = 'picsList';

                            case 15:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function savePics() {
                return _ref3.apply(this, arguments);
            }

            return savePics;
        }();

        List.prototype.showGallery = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(gallery) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                sessionStorage.setItem("gallery", JSON.stringify(gallery));
                                _context4.next = 3;
                                return this.pics.getUserPic(JSON.parse(sessionStorage.getItem('gallery'))._id);

                            case 3:
                                this.showList = 'picsList';

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function showGallery(_x) {
                return _ref4.apply(this, arguments);
            }

            return showGallery;
        }();

        List.prototype.back = function back() {
            this.showList = 'galleryList';
        };

        List.prototype.backPics = function backPics() {
            this.showList = 'picsList';
        };

        List.prototype.logout = function logout() {
            sessionStorage.removeItem('user');
            this.auth.logout();
        };

        return List;
    }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './value-converters/completed', './elements/flatpickr']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataServices = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function DataServices(http) {
      var _this = this;

      _classCallCheck(this, DataServices);

      this.httpClient = http;
      this.BASE_URL = "http://localhost:5000/api/";
      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
            _request.headers.append('Authorization', authHeader);
            console.log('Requesting ' + _request.method + ' ' + _request.url);
            return _request;
          },
          response: function response(_response) {
            console.log('Received ' + _response.status + ' ' + _response.url);
            return _response;
          }
        });
      });
    }

    DataServices.prototype.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: files
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
});
define('resources/data/gallery',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Gallery = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Gallery = exports.Gallery = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Gallery(data) {
      _classCallCheck(this, Gallery);

      this.data = data;
      this.GALLERY_SERVICE = 'gallery';
      this.galleryArray = [];
    }

    Gallery.prototype.getUserGallery = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.data.get(this.GALLERY_SERVICE + "/" + id);

              case 2:
                response = _context.sent;

                if (!response.error && !response.message) {
                  this.galleryArray = response;
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserGallery(_x) {
        return _ref.apply(this, arguments);
      }

      return getUserGallery;
    }();

    Gallery.prototype.save = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(gallery) {
        var response, _response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!gallery) {
                  _context2.next = 14;
                  break;
                }

                if (gallery._id) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 4;
                return this.data.post(gallery, this.GALLERY_SERVICE);

              case 4:
                response = _context2.sent;

                if (!response.error) {
                  this.galleryArray.push(response);
                }
                return _context2.abrupt('return', response);

              case 9:
                _context2.next = 11;
                return this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);

              case 11:
                _response = _context2.sent;

                if (!_response.error) {}
                return _context2.abrupt('return', _response);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function save(_x2) {
        return _ref2.apply(this, arguments);
      }

      return save;
    }();

    Gallery.prototype.deleteGallery = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
        var response, i;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.delete(this.GALLERY_SERVICE + "/" + id);

              case 2:
                response = _context3.sent;

                if (!response.error) {
                  for (i = 0; i < this.galleryArray.length; i++) {
                    if (this.galleryArray[i]._id === id) {
                      this.galleryArray.splice(i, 1);
                    }
                  }
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteGallery(_x3) {
        return _ref3.apply(this, arguments);
      }

      return deleteGallery;
    }();

    return Gallery;
  }()) || _class);
});
define('resources/data/pics',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Pics = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Pics = exports.Pics = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Pics(data) {
      _classCallCheck(this, Pics);

      this.data = data;
      this.PIC_SERVICE = 'pics';
      this.picsArray = [];
      this.GALLERY_SERVICE = 'gallery';
    }

    Pics.prototype.getUserPic = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(galleryId) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.data.get("users/" + this.GALLERY_SERVICE + "/" + galleryId);

              case 2:
                response = _context.sent;

                if (!response.error && !response.message) {
                  this.picsArray = response;
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserPic(_x) {
        return _ref.apply(this, arguments);
      }

      return getUserPic;
    }();

    Pics.prototype.savePicture = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(pics) {
        var response, _response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!pics) {
                  _context2.next = 14;
                  break;
                }

                if (pics._id) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 4;
                return this.data.post(pics, this.GALLERY_SERVICE + "/" + this.PIC_SERVICE);

              case 4:
                response = _context2.sent;

                if (!response.error) {
                  this.picsArray.push(response);
                }
                return _context2.abrupt('return', response);

              case 9:
                _context2.next = 11;
                return this.data.put(pics, this.GALLERY_SERVICE + "/" + this.PIC_SERVICE + "/" + pics._id);

              case 11:
                _response = _context2.sent;

                if (!_response.error) {}
                return _context2.abrupt('return', _response);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function savePicture(_x2) {
        return _ref2.apply(this, arguments);
      }

      return savePicture;
    }();

    Pics.prototype.deletePics = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
        var response, i;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.delete("pics" + "/" + id);

              case 2:
                response = _context3.sent;

                if (!response.error) {
                  for (i = 0; i < this.picsArray.length; i++) {
                    if (this.picsArray[i]._id === id) {
                      this.picsArray.splice(i, 1);
                    }
                  }
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deletePics(_x3) {
        return _ref3.apply(this, arguments);
      }

      return deletePics;
    }();

    Pics.prototype.uploadFile = function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(files, galleryId, picsId) {
        var formData, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                formData = new FormData();

                files.forEach(function (item, index) {
                  formData.append("file" + index, item);
                });
                _context4.next = 4;
                return this.data.uploadFiles(formData, this.GALLERY_SERVICE + "/upload/" + galleryId + "/" + picsId);

              case 4:
                response = _context4.sent;
                return _context4.abrupt('return', response);

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function uploadFile(_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return uploadFile;
    }();

    return Pics;
  }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;

            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var CompletedValueConverter = exports.CompletedValueConverter = function () {
        function CompletedValueConverter() {
            _classCallCheck(this, CompletedValueConverter);
        }

        CompletedValueConverter.prototype.toView = function toView(array, value) {
            if (!value) {
                return array.filter(function (item) {
                    return !item.completed;
                });
            } else {
                return array;
            }
        };

        return CompletedValueConverter;
    }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormatValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
    function DateFormatValueConverter() {
      _classCallCheck(this, DateFormatValueConverter);
    }

    DateFormatValueConverter.prototype.toView = function toView(value) {
      if (value === undefined || value === null) {
        return;
      }

      return (0, _moment2.default)(value).format('MMM Do YYYY');
    };

    return DateFormatValueConverter;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\n    margin-right: 10px;\n}\n\n.leftMargin {\n    margin-left: 10px;\n}\n\n.centerMargin {\n    margin-right: 10px;\n}"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><div class=\"card text-center\"><div class=\"card-header\">Welcome to your Photo Gallery!</div><h1>${message}</h1><compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose><compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></div></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><h1>${message}</h1><compose show.bind=\"showList== 'galleryList'\" view=\"./components/galleryList.html\"></compose><compose show.bind=\"showList== 'galleryForm'\" view=\"./components/galleryForm.html\"></compose><compose show.bind=\"showList== 'picsList'\" view=\"./components/picsList.html\"></compose><compose show.bind=\"showList== 'picsForm'\" view=\"./components/picsForm.html\"></compose></template>"; });
define('text!modules/components/galleryForm.html', ['module'], function(module) { module.exports = "<template><center><h1 class=\"center\">Add Galleries</h1></center><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group topMargin\"><label for=\"galleryInput\">Gallery Name *</label><input value.bind=\"galleryObj.gallery\" type=\"text\" class=\"form-control\" id=\"galleryInput\" aria-describedby=\"galleryHelp\" placeholder=\"Enter Gallery Name\"> <small id=\"galleryHelp\" class=\"form-text text-muted\">A short name for the gallery.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"galleryObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"form-group\"><label for=\"createDateInput\">Date Created *</label><flat-picker value.bind=\"galleryObj.dateCreated\"></flat-picker><small id=\"createDateHelp\" class=\"form-text text-muted\">The date to gallery is created.</small></div></form></div><button click.trigger=\"saveGallery()\" class=\"btn btn-primary topMargin\">Save</button></template>"; });
define('text!modules/components/galleryList.html', ['module'], function(module) { module.exports = "<template><center><h1 class=\"center\">Galleries</h1></center><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"createGallery()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span></span></div><div show.bind=\"gallery.galleryArray.length\"><table class=\"table\"><thead><tr><th>Gallery Name</th><th>Date Created</th><th>Description</th><th>Edit | Delete</th></tr></thead><tbody><tr repeat.for=\"gallery of gallery.galleryArray\"><th><button click.trigger=\"showGallery(gallery)\" class=\"btn btn-primary\">${gallery.gallery}</button></th><td>${gallery.dateCreated | dateFormat}</td><td>${gallery.description}</td><td><i click.trigger=\"editGallery(gallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deleteGallery(gallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!gallery.galleryArray.length\"><h2>Apparently, you don't have any galleries!</h2></div></div></div></div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template>    <div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div><center>   <label for=\"email\">Email</label><div class=\"col-lg-4\">    <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" style=\"width:27rem\" id=\"email\" placeholder=\"Email\"></div><br>    <label for=\"password\">Password</label><div class=\"col-lg-4\">    <input value.bind=\"password\" type=\"password\" class=\"form-control\" style=\"width:27rem\" id=\"password\" placeholder=\"Password\"></div></center>  <br>      <button type=\"button\" class=\"btn btn-primary\" click.trigger=\"login()\">Login</button>   <button type=\"button\" class=\"btn btn-primary\" click.trigger=\"showRegister()\">Register</button>  </template>"; });
define('text!modules/components/picsForm.html', ['module'], function(module) { module.exports = "<template><center><h1 class=\"center\">Upload Photos to Gallery</h1></center><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"backPics()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div></div><form><div class=\"form-group topMargin\"><label for=\"picsInput\">Photo Name *</label><input value.bind=\"photoObj.picsName\" type=\"text\" class=\"form-control\" id=\"picsNameInput\" aria-describedby=\"picsHelp\" placeholder=\"Enter Photo Name\"> <small id=\"picsHelp\" class=\"form-text text-muted\">A short name for the photo.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"photoObj.picsDescription\" type=\"text\" class=\"form-control\" id=\"picsDescriptionInput\" aria-describedby=\"picsDescriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"picsDescriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"row\"><div class=\"col\"><label class=\"btn btn-secondary\">Browse for photos&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload photos.</small></div><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div><button click.trigger=\"savePics()\" class=\"btn btn-primary topMargin\">Upload Photo</button></form></template>"; });
define('text!modules/components/picsList.html', ['module'], function(module) { module.exports = "<template><center><h1 class=\"center\">Photos</h1></center><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"createPhotos()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></span></div><div show.bind=\"pics.picsArray.length\"><table class=\"table\"><thead><tr><th>Photo</th><th>Photo Name</th><th>Description</th><th>Edit | Delete</th></tr></thead><tbody><tr repeat.for=\"pics of pics.picsArray\"><th><a href=\"http://localhost:5000/uploads/${pics.galleryId}/${pics.file.filename}\" target=\"_blank\"><img src=\"http://localhost:5000/uploads/${pics.galleryId}/${pics.file.filename}\" style=\"width:100px;height:100px\"></a></th><td>${pics.picsName}</td><td>${pics.picsDescription}</td><td><i click.trigger=\"editPics(pics)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deletePics(pics)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!pics.picsArray.length\"><h2>Apparently, you don't have any photos!</h2></div></div></div></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template>First Name: <input value.bind=\"user.firstName\"> Last Name: <input value.bind=\"user.lastName\"> Email: <input value.bind=\"user.email\"> Password: <input value.bind=\"user.password\"> <span>${registerError}</span><button click.trigger=\"save()\">Save</button></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template>    <require from=\"flatpickr/flatpickr.css\"></require>    <div class=\"input-group aurelia-flatpickr\">     <input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input>     </div></template>"; });
//# sourceMappingURL=app-bundle.js.map