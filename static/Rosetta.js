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
              utils.extend(this, options, true);
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
            var node = parent.children,
                elemType = node.tagName.toLowerCase(),
                attrs = node.attributes,
                elemClass = Rosetta.getElemClass(type),
                root = document.createElement('div');

            root.setAttribute('class', elemType);
            parent.parent().replaceChild(root, parent);

            var obj = Rosetta.create(elemType, attrs, child);
            Rosetta.render(obj, root);
        };

        function run () {
            var elems = $('textarea[type="r-element"]');
            for (var i = 0; i <= elems.length; i++) {
                var item = elems[i];
                parse(item);
            }
        };

        function query (selector) {
            return document.querySelectAll(selector);
        };

        return {
            run: run,

            _elemClass: {},

            ref: {},

            getElemClass: function(type) {
                return this._elemClass[type];
            },

            addElemClass: function(type, elemClass) {
                this._elemClass[type] = elemClass
            },

            addElem: function(name, elemObj) {
                this.ref[name] = elemObj;
            },

            render: function(elemObj, root) {
                if (utils.isString(root)) {
                    root = document.querySelector(root);
                }

                if (utils.isDomNode(elemObj)) {
                    root.appendChild(elemObj);
                } else if (elemObj.isRosettaElem == true) {
                    elemObj.root = root;
                    elemObj.renderFunc(elemObj)
                    elemObj.root.appendChild(elemObj.tmpl());
                }

                // 递归render，处理事件绑定

                elemObj.trigger(ATTACHED);
            },

            create: function(type, attr) {
                var children = [].slice.call(arguments, 2),
                    result = utils.toPlainArray(children);

                if (utils.isString(type)) {
                    if (utils.isOriginalTag(type)) {
                        var node = document.createElement(type);
                        if (utils.isString(attr)) {
                            attr = JSON.parse(attr);
                        }

                        for (var i in attr) {
                            node.setAttribute(i, attr[i]);
                        }

                        node.children = result;
                        node.trigger(CREATED);

                        return node;

                    } else {
                        var NewClass = this.getElemClass(type),
                            options = {
                                attr: attr
                            };

                        if (!!NewClass) {
                            elemObj = new NewClass(options);
                            elemObj.name = attr.name;
                            if (!!attr.name) {
                                Rosetta.addElem(attr.name, elemObj);
                            }

                            elemObj.children = result;
                            elemObj.trigger(CREATED);
                        }

                        return elemObj;
                    }
                }

            },

            register: function(type, renderFunc) {
                var elemClass = createElemClassFactory(type, renderFunc);
                this.addElemClass(type, elemClass);
                return elemClass;
            }
        };
    })();
})();
