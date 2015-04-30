var utils = {},
    Rosetta = {};

(function () {
    var isType = {
        isString: function(elem) {
            return typeof elem == 'string';
        },

        isDomNode: function(elem) {
            return !!(elem && elem.nodeType === 1);
        },

        isOriginalTag: function(str) {
            return !!this.plainDom[str];
        },

        isWindow: function(obj) {
            return obj != null && obj == obj.window;
        },

        isPlainObject: function(obj) {
            return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
        },

        isArray: function(value) {
            return value instanceof Array;
        },

        isObject: function(value) {
            return typeof value == 'object';
        },

        extend: function(target, source, deep) {
            for (key in source) {
                if (deep && (this.isPlainObject(source[key]) || this.isArray(source[key]))) {
                    if (this.isPlainObject(source[key]) && !this.isPlainObject(target[key])) {
                        target[key] = {};
                    }

                    if (this.isArray(source[key]) && !this.isArray(target[key])){
                        target[key] = [];
                    }

                    this.extend(target[key], source[key], deep);
                } else if (source[key] !== undefined) {
                    target[key] = source[key];
                }
            }
            return target;
        }
    };


    var rosettaElem = {
        plainDom: {
            content: 'content',
            a: 'a',
            abbr: 'abbr',
            address: 'address',
            area: 'area',
            article: 'article',
            aside: 'aside',
            audio: 'audio',
            b: 'b',
            base: 'base',
            bdi: 'bdi',
            bdo: 'bdo',
            big: 'big',
            blockquote: 'blockquote',
            body: 'body',
            br: 'br',
            button: 'button',
            canvas: 'canvas',
            caption: 'caption',
            cite: 'cite',
            code: 'code',
            col: 'col',
            colgroup: 'colgroup',
            data: 'data',
            datalist: 'datalist',
            dd: 'dd',
            del: 'del',
            details: 'details',
            dfn: 'dfn',
            dialog: 'dialog',
            div: 'div',
            dl: 'dl',
            dt: 'dt',
            em: 'em',
            embed: 'embed',
            fieldset: 'fieldset',
            figcaption: 'figcaption',
            figure: 'figure',
            footer: 'footer',
            form: 'form',
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6',
            head: 'head',
            header: 'header',
            hgroup: 'hgroup',
            hr: 'hr',
            html: 'html',
            i: 'i',
            iframe: 'iframe',
            img: 'img',
            input: 'input',
            ins: 'ins',
            kbd: 'kbd',
            keygen: 'keygen',
            label: 'label',
            legend: 'legend',
            li: 'li',
            link: 'link',
            main: 'main',
            map: 'map',
            mark: 'mark',
            menu: 'menu',
            menuitem: 'menuitem',
            meta: 'meta',
            meter: 'meter',
            nav: 'nav',
            noscript: 'noscript',
            object: 'object',
            ol: 'ol',
            optgroup: 'optgroup',
            option: 'option',
            output: 'output',
            p: 'p',
            param: 'param',
            picture: 'picture',
            pre: 'pre',
            progress: 'progress',
            q: 'q',
            rp: 'rp',
            rt: 'rt',
            ruby: 'ruby',
            s: 's',
            samp: 'samp',
            script: 'script',
            section: 'section',
            select: 'select',
            small: 'small',
            source: 'source',
            span: 'span',
            strong: 'strong',
            style: 'style',
            sub: 'sub',
            summary: 'summary',
            sup: 'sup',
            table: 'table',
            tbody: 'tbody',
            td: 'td',
            textarea: 'textarea',
            tfoot: 'tfoot',
            th: 'th',
            thead: 'thead',
            time: 'time',
            title: 'title',
            tr: 'tr',
            track: 'track',
            u: 'u',
            ul: 'ul',
            'var': 'var',
            video: 'video',
            wbr: 'wbr',

            // SVG
            circle: 'circle',
            clipPath: 'clipPath',
            defs: 'defs',
            ellipse: 'ellipse',
            g: 'g',
            line: 'line',
            linearGradient: 'linearGradient',
            mask: 'mask',
            path: 'path',
            pattern: 'pattern',
            polygon: 'polygon',
            polyline: 'polyline',
            radialGradient: 'radialGradient',
            rect: 'rect',
            stop: 'stop',
            svg: 'svg',
            text: 'text',
            tspan: 'tspan'
        },

        supportEvent: {
            // 只支持原生的
            onClick: 'click',
            onTouchStart: 'touchstart',
            onTouchEnd: 'touchend'
        }
    };


    var base = {
        camelize: function (key) {
            var _reg = /-(.)/g;
            return key.replace(_reg, function(_, txt) {
                return txt.toUpperCase();
            });
        },

        toPlainArray: function (data, result) {
            if (!result) {
                var result = [];
            }

            for (var i = 0; i < data.length; i ++) {
                var item = data[i];
                if (utils.isArray(item)) {
                    toArray(item, result);
                } else {
                    result.push(item);
                }
            }

            return result;
        }
    };


    var args = [isType, rosettaElem, base];

    for (var i = 0; i < args.length; i++) {
        var item = args[i];
        isType.extend(utils, item, true);
    }
})();

(function() {
    var ATTACHED = 'attached',
        DETACHED = 'detached',
        CREATED = 'created',
        ATTRIBUTECHANGE = 'attributeChange';

    var createElemClassFactory = function(type, renderFunc) {
        return (function(type, renderFunc) {
            function CustomElement (options) {
              utils.extend(this, options || {}, true);
            }

            function update (options) {
                this.trigger(ATTRIBUTECHANGE);
            }

            function destroy () {
                this.off();
                this.root.remove();
                delete Rosetta.ref(this.name);
                this.trigger(DETACHED);
            }

            function on (type, listener, context, ifOnce) {
                var queue = this.events[type] || (this.events[type] = []);
                queue.push({f: listener, o: context, ifOnce: ifOnce});
            }

            function trigger (type) {
                var SLICE = [].slice,
                    list = this.events[type];

                if (!list) {
                    return;
                }

                var arg = SLICE.call(arguments, 1);
                for(var i = 0, j = list.length; i < j; i++) {
                    var cb = list[i];
                    if (cb.f.apply(cb.o, arg) === false) {
                        break;
                    }

                    if (cb.ifOnce === true) {
                        list.splice(i, 1);
                        i--;
                        j--;
                    }
                }
            }

            function off (type) {
                if (!type) {
                    this.events = [];
                }

                delete this.events[type];
            }

            function once (type, listener, context) {
                this.on(type, listener, context, true);
            }

            CustomElement.prototype = {
                type: type,

                name: name,

                update: update,

                destroy: destroy,

                renderFunc: renderFunc,

                isRosettaElem: true,

                ref: {},

                events: {},

                on: on,

                trigger: trigger,

                off: off,

                once: once
            }

            return CustomElement;

        })(type, renderFunc);
    };


    Rosetta = (function() {
        function parse (parent) {
            var js = parent.innerHTML.replace(/&lt;!\[CDATA\[|\]\]&gt;/g, '');

            eval(js);
        }

        function init () {
            var elems = document.querySelectorAll('textarea[type="r-element"]');
            for (var i = 0; i < elems.length; i++) {
                var item = elems[i];
                parse(item);
            }
        }

        var refers = {};

        return {
            init: init,

            _elemClass: {},

            ref: function(key, value) {
                if (value) {
                    refers[key] = value;
                } else {
                    return refers[key];
                }
            },

            getElemClass: function(type) {
                return this._elemClass[type];
            },

            addElemClass: function(type, elemClass) {
                this._elemClass[type] = elemClass
            },

            addElem: function(name, elemObj) {
                refers[name] = elemObj;
            },

            render: function(obj, root) {
                if (utils.isString(root)) {
                    root = document.querySelector(root);
                }

                if (!obj) {
                    return;
                }

                if (obj.isRosettaElem == true) {
                    obj.renderFunc(obj);
                    obj.root = obj.__t(obj, obj.attr, obj.ref);
                    obj.holder = {};
                    var contents = obj.root.querySelectorAll('content');

                    for (var i = 0; i < contents.length; i++) {
                        var item = contents[i];
                        obj.holder[item.getAttribute('selector')] = item;
                    }

                    // deal with content
                    var tmp = document.createDocumentFragment();
                    if (obj.children && obj.children.length > 0) {
                        for (var i = 0; i < obj.children.length; i++) {
                            var item = obj.children[i];

                            tmp.appendChild(item);
                        }

                        for (var i in obj.holder) {
                            var dom = obj.holder[i];
                            var newDom = tmp.querySelectorAll(i);
                            if (newDom.length > 0) {
                                var container = document.createElement('div');
                                container.setAttribute('class', '.content');
                                dom.parentElement.replaceChild(container, dom);
                                for (var j = 0; j < newDom.length; j++) {
                                    container.appendChild(newDom[j]);
                                }
                            } else {
                                dom.parentElement.removeChild(dom);
                            }
                        }
                    }
                } else if (utils.isDomNode(obj)) {
                    obj.root = obj;
                }

                for (var i in obj.attr) {
                    var item = obj.attr[i];
                    if (!utils.supportEvent[i]) {
                        obj.root.setAttribute(i, item);
                    } else {
                        obj.root.addEventListener(utils.supportEvent[i], item, false);
                    }
                }

                if (utils.isDomNode(root) && root.getAttribute('type') == 'r-element') {
                    root.parentElement.replaceChild(obj.root, root);
                    obj.trigger(ATTACHED);
                } else {
                    if (root.isRosettaElem == true) {
                        root.children = root.children || [];

                        root.children.push(obj);
                    } else {
                        if (obj.root) {
                            root.appendChild(obj.root);
                        } else if (utils.isString(obj)) {
                            root.innerHTML = obj;
                        }

                    }
                }
            },

            create: function(type, attr) {
                var children = [].slice.call(arguments, 2),
                    children = utils.toPlainArray(children),
                    result = null;

                attr = attr || {};
                if (utils.isString(attr)) {
                    attr = JSON.parse(attr);
                }

                if (utils.isString(type)) {
                    if (utils.isOriginalTag(type)) {
                        var node = document.createElement(type);
                        node.attr = attr;

                        result = node;

                    } else {
                        var NewClass = this.getElemClass(type),
                            options = {
                                attr: attr || {}
                            },
                            elemObj = null;

                        if (!!NewClass) {
                            elemObj = new NewClass(options);
                            elemObj.name = attr.ref? attr.ref: '';
                            if (!!attr.ref) {
                                Rosetta.addElem(attr.ref, elemObj);
                            }

                            elemObj.trigger(CREATED);
                        }

                        result = elemObj;
                    }

                    if (!!result) {
                        for (var i = 0; i < children.length; i++) {
                            var item = children[i];
                            // content的判断

                            Rosetta.render(item, result);
                        }
                    }

                    return result;
                }

            },

            register: function(type, renderFunc) {
                var elemClass = createElemClassFactory(type, renderFunc);
                Rosetta.addElemClass(type, elemClass);
                return elemClass;
            }
        };
    })();
})();
