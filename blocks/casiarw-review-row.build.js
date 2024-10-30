/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
	var __ = wp.i18n.__;
	var registerBlockType = wp.blocks.registerBlockType;

	var el = wp.element.createElement; // The wp.element.createElement() function to create elements.
	var _wp$editor = wp.editor,
	    InspectorControls = _wp$editor.InspectorControls,
	    PlainText = _wp$editor.PlainText,
	    RichText = _wp$editor.RichText;
	//const { RangeControl, TextControl } = wp.components;

	var _wp$components = wp.components,
	    RangeControl = _wp$components.RangeControl,
	    TextControl = _wp$components.TextControl;
	var _wp$data = wp.data,
	    select = _wp$data.select,
	    dispatch = _wp$data.dispatch;

	/**
  * Register block
  *
  * @param  {string}   name     Block name.
  * @param  {Object}   settings Block settings.
  * @return {?WPBlock}          Block itself, if registered successfully,
  *                             otherwise "undefined".
  */

	registerBlockType('casiarw/ratingrow', {
		title: __('Casia review row', 'casiarw'),
		icon: 'lock',
		category: 'common',
		parent: ['casiarw/review'],
		attributes: {
			title: {
				type: 'string',
				title: __('Title', 'casiarw'),
				default: 'title'
			},
			rating: {
				type: 'number',
				default: 0
			},
			desc: {
				type: 'string',
				default: 'desc' /*,
                    blockValue: {
                    type: 'number',
                    source: 'meta',
                    meta: 'casiarw_overall_rating'
                    }*/
			} },
		edit: function edit(props) {
			var title = props.attributes.title;
			var rating = props.attributes.rating;
			var desc = props.attributes.desc;

			var color1 = props.attributes.color1;
			var color2 = props.attributes.color2;
			var color3 = props.attributes.color3;

			var displayType = props.attributes.displayType;

			var newValue = {};

			var clientId = props.clientId;


			var rowStyles = {
				backgroundColor: color2
			};

			var filledStyles = {
				backgroundColor: color1
			};

			var titleStyles = {
				color: color3
			};

			var starStyles = {
				width: rating * 10 + '%'
			};

			var ratingsContStyles = {
				position: 'absolute',
				right: '20px',
				top: '50%',
				transform: 'translateY(-50%)'

				//Send row rating to parent element to calculate average rating
			};$.each(select('core/editor').getEditorBlocks(), function (index, value) {
				$.each(value.innerBlocks, function (indexInner, valueInner) {
					if (valueInner.clientId === clientId) {
						if (value.attributes.innerRatings) {
							newValue = Object.assign(value.attributes.innerRatings, _defineProperty({}, valueInner.clientId, rating));
						} else {
							newValue = _defineProperty({}, valueInner.clientId, rating);
						}
						dispatch('core/editor').updateBlockAttributes(value.clientId, { innerRatings: newValue });
						return;
					}
				});
			});
			//Send row rating to parent element to calculate average rating ends

			function onChangeTitle(updatedTitle) {
				props.setAttributes({ title: updatedTitle });
			}

			function onChangeRating(updatedRating) {
				props.setAttributes({ rating: updatedRating });
			}

			function onChangeDesc(updatedDesc) {
				props.setAttributes({ rating: updatedDesc });
			}

			return [wp.element.createElement(
				InspectorControls,
				{ key: 'controls' },
				wp.element.createElement(RangeControl, { value: rating, onChange: onChangeRating, min: 0, max: 10 })
			), wp.element.createElement(
				'div',
				{ className: 'casiarw-review__row', style: rowStyles },
				{
					'numbers': wp.element.createElement('div', { className: 'casiarw-review__filled casiarw-review__filled--' + rating, style: filledStyles }),
					'stars': wp.element.createElement(
						'div',
						{ className: 'ratings-container', style: ratingsContStyles },
						wp.element.createElement(
							'div',
							{ className: 'ratings' },
							wp.element.createElement('div', { className: 'empty-stars' }),
							wp.element.createElement('div', { className: 'full-stars', style: starStyles })
						)
					)
				}[displayType],
				wp.element.createElement(
					'div',
					{ className: 'casiarw-review__rowinfo' },
					wp.element.createElement(RichText, { value: title, onChange: onChangeTitle, tagName: 'span', style: titleStyles }),
					wp.element.createElement(
						'span',
						{ className: 'casiarw-review__rowtitle', style: titleStyles },
						': '
					),
					{
						'numbers': wp.element.createElement(
							'span',
							{ className: 'casiarw-review__rating', style: titleStyles },
							rating,
							' '
						)
					}[displayType]
				)
			)];
		},

		save: function save(props) {
			var title = props.attributes.title;
			var rating = props.attributes.rating;

			var color1 = props.attributes.color1;
			var color2 = props.attributes.color2;
			var color3 = props.attributes.color3;

			var displayType = props.attributes.displayType;

			var ratingsContStyles = {
				position: 'absolute',
				right: '20px',
				top: '50%',
				transform: 'translateY(-50%)'
			};

			return wp.element.createElement(
				'div',
				{ className: 'casiarw-review__row' },
				wp.element.createElement('div', { className: 'casiarw-review__filled casiarw-review__filled--' + rating }),
				wp.element.createElement(
					'div',
					{ className: 'ratings-container', style: ratingsContStyles },
					wp.element.createElement(
						'div',
						{ className: 'ratings' },
						wp.element.createElement('div', { className: 'empty-stars' }),
						wp.element.createElement('div', { className: 'full-stars', 'meta-rating': rating })
					)
				),
				wp.element.createElement(
					'span',
					{ className: 'casiarw-review__rowtitle' },
					title
				),
				wp.element.createElement(
					'span',
					{ className: 'casiarw-review__rowtitle' },
					': '
				),
				wp.element.createElement(
					'span',
					{ className: 'casiarw-review__rating' },
					rating
				)
			);
		}
	});
})();

/***/ })
/******/ ]);