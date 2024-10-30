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

(function () {
	var __ = wp.i18n.__;
	var registerBlockType = wp.blocks.registerBlockType;

	var el = wp.element.createElement; // The wp.element.createElement() function to create elements.
	var _wp$editor = wp.editor,
	    InnerBlocks = _wp$editor.InnerBlocks,
	    RichText = _wp$editor.RichText,
	    InspectorControls = _wp$editor.InspectorControls;
	var _wp$components = wp.components,
	    ColorPalette = _wp$components.ColorPalette,
	    RadioControl = _wp$components.RadioControl;
	var withState = wp.compose.withState;
	var _wp$data = wp.data,
	    select = _wp$data.select,
	    dispatch = _wp$data.dispatch,
	    withSelect = _wp$data.withSelect;

	/**
  * Register block
  *
  * @param  {string}   name     Block name.
  * @param  {Object}   settings Block settings.
  * @return {?WPBlock}          Block itself, if registered successfully,
  *                             otherwise "undefined".
  */

	registerBlockType('casiarw/review', {
		title: __('Casia review', 'casiarw'),
		icon: 'lock',
		category: 'common',
		attributes: {
			title: {
				type: 'string',
				default: 'Title'
			},
			desc: {
				type: 'string',
				default: 'desc'
			},
			color1: {
				type: 'string',
				default: '#EC4D37'
			},
			color2: {
				type: 'string',
				default: '#1D1B1B'
			},
			color3: {
				type: 'string',
				default: '#FFFFFF'
			},
			overall: {
				type: 'number',
				default: 0
			},
			displayType: {
				type: 'string',
				default: 'numbers'
			}
		},
		edit: withSelect(function (select, blockData) {
			return {
				innerBlocks: select('core/editor').getBlocks(blockData.clientId)
			};
		})(function (props) {

			var title = props.attributes.title;
			var desc = props.attributes.desc;
			var color1 = props.attributes.color1;
			var color2 = props.attributes.color2;
			var color3 = props.attributes.color3;
			var overall = props.attributes.overall;
			var displayType = props.attributes.displayType;

			var clientId = props.clientId;


			var existingInnerBlocks = [];

			//Remove deleted block ratings from average rating
			existingInnerBlocks = [];
			select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach(function (block) {
				existingInnerBlocks.push(block.clientId);
			});

			for (var key in props.attributes.innerRatings) {
				if (props.attributes.innerRatings.hasOwnProperty(key)) {
					if (!existingInnerBlocks.includes(key)) {
						delete props.attributes.innerRatings[key];
					}
				}
			}
			//Remove deleted block ratings from average rating ends

			//Calculate overall rating
			overallSum = 0;
			numberOfRatings = 0;
			for (var key in props.attributes.innerRatings) {
				if (props.attributes.innerRatings.hasOwnProperty(key)) {
					overallSum += props.attributes.innerRatings[key];
					numberOfRatings++;
				}
			}
			overall = overallSum / numberOfRatings;
			//Calculate overall rating ends

			// Setup styles
			var titleStyles = {
				backgroundColor: color2,
				color: color1
			};

			var starStyles = {
				width: Math.round(overall * 10) + '%'
			};

			var TypeRadioControl = withState({
				option: displayType
			})(function (_ref) {
				var option = _ref.option,
				    setState = _ref.setState;
				return wp.element.createElement(RadioControl, {
					label: 'How to display ratings',
					selected: option,
					options: [{ label: 'Numbers', value: 'numbers' }, { label: 'Stars', value: 'stars' }],
					onChange: function onChange(option) {
						setState({ option: option });
						props.setAttributes({ displayType: option });

						select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach(function (block) {
							dispatch('core/editor').updateBlockAttributes(block.clientId, { displayType: option });
						});
					}
				});
			});

			select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach(function (block) {
				dispatch('core/editor').updateBlockAttributes(block.clientId, { color1: color1 });
			});

			select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach(function (block) {
				dispatch('core/editor').updateBlockAttributes(block.clientId, { color2: color2 });
			});

			select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach(function (block) {
				dispatch('core/editor').updateBlockAttributes(block.clientId, { color3: color3 });
			});

			select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach(function (block) {
				dispatch('core/editor').updateBlockAttributes(block.clientId, { displayType: displayType });
			});

			function onChangeTitle(updatedTitle) {
				props.setAttributes({ title: updatedTitle });
			}

			function onChangeDesc(updatedDesc) {
				props.setAttributes({ desc: updatedDesc });
			}

			function onChangeColor1(updatedCol) {
				props.setAttributes({ color1: updatedCol });

				select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach(function (block) {
					dispatch('core/editor').updateBlockAttributes(block.clientId, { color1: updatedCol });
				});
			}

			function onChangeColor2(updatedCol) {
				props.setAttributes({ color2: updatedCol });

				select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach(function (block) {
					dispatch('core/editor').updateBlockAttributes(block.clientId, { color2: updatedCol });
				});
			}

			function onChangeColor3(updatedCol) {
				props.setAttributes({ color3: updatedCol });

				select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach(function (block) {
					dispatch('core/editor').updateBlockAttributes(block.clientId, { color3: updatedCol });
				});
			}

			return [wp.element.createElement(
				InspectorControls,
				{ key: 'inspector' },
				wp.element.createElement(
					'p',
					{ className: 'casiarw__inspector_desc' },
					'Color 1:'
				),
				wp.element.createElement(
					ColorPalette,
					{ title: 'Color 1', value: color1, onChange: onChangeColor1 },
					'\'Color 1:\''
				),
				wp.element.createElement(
					'p',
					{ className: 'casiarw__inspector_desc' },
					'Color 2:'
				),
				wp.element.createElement(
					ColorPalette,
					{ title: 'Color 2', value: color2, onChange: onChangeColor2 },
					'Color 2:'
				),
				wp.element.createElement(
					'p',
					{ className: 'casiarw__inspector_desc' },
					'Color 3:'
				),
				wp.element.createElement(
					ColorPalette,
					{ title: 'Color 3', value: color3, onChange: onChangeColor3 },
					'\'Color 3:\''
				),
				wp.element.createElement(TypeRadioControl, null)
			), wp.element.createElement(
				'div',
				{ className: 'casiarw-review' },
				wp.element.createElement(
					'div',
					{ className: 'casiarw-review__title', style: titleStyles },
					wp.element.createElement(RichText, { tagName: 'div', value: title, onChange: onChangeTitle })
				),
				wp.element.createElement(InnerBlocks, { className: 'casiarw-review__rows', allowedBlocks: ['casiarw/ratingrow'] }),
				wp.element.createElement(
					'div',
					{ className: 'casiarw-review__desc' },
					wp.element.createElement(RichText, { tagName: 'div', value: desc, onChange: onChangeDesc, style: titleStyles })
				),
				wp.element.createElement(
					'div',
					{ className: 'casiarw-review__overall', style: titleStyles },
					{
						'numbers': Math.round(overall * 10) / 10,
						'stars': wp.element.createElement(
							'div',
							{ className: 'ratings' },
							wp.element.createElement('div', { className: 'empty-stars' }),
							wp.element.createElement('div', { className: 'full-stars', style: starStyles })
						)
					}[displayType]
				)
			)];
		}),

		save: function save(props) {
			var title = props.attributes.title;
			var desc = props.attributes.desc;
			var color1 = props.attributes.color1;
			var color2 = props.attributes.color2;
			var color3 = props.attributes.color3;
			var displayType = props.attributes.displayType;

			// Setup styles
			var titleStyles = {
				backgroundColor: color2,
				color: color1
			};

			var ratingsContStyles = {
				position: 'absolute',
				top: '9px',
				transform: 'translateX(-50%)',
				left: '50%'
			};

			function onChangeContent(updatedContent) {
				props.setAttributes({ content: updatedContent });
			}

			return wp.element.createElement(
				'div',
				{ 'meta-displaytype': displayType, className: 'casiarw-review casiarw-review--color1-' + color1 + ' casiarw-review--color2-' + color2 + ' casiarw-review--color3-' + color3 },
				wp.element.createElement(
					'div',
					{ className: 'casiarw-review__title', style: titleStyles },
					wp.element.createElement(
						'div',
						null,
						title
					)
				),
				wp.element.createElement(InnerBlocks.Content, null),
				wp.element.createElement(
					'div',
					{ className: 'casiarw-review__desc', style: titleStyles },
					wp.element.createElement(
						'div',
						null,
						desc
					)
				),
				wp.element.createElement(
					'div',
					{ className: 'casiarw-review__overall', style: titleStyles },
					wp.element.createElement(
						'div',
						{ className: 'ratings-container', style: ratingsContStyles },
						wp.element.createElement(
							'div',
							{ className: 'ratings' },
							wp.element.createElement('div', { className: 'empty-stars' }),
							wp.element.createElement('div', { className: 'full-stars' })
						)
					)
				)
			);
		}
	});
})();

/***/ })
/******/ ]);