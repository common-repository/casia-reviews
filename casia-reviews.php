<?php
/**
Plugin Name: Casia Reviews
Description: Simple way to add reviews to Your site.
Version: 1.0
Author: castellar120
License: GPLv2 or later
Text Domain: casiarw
*/

//Actions
add_action( 'wp_enqueue_scripts', 'casiarw_styles' );
add_action( 'admin_enqueue_scripts', 'casiarw_admin_styles' );
add_action( 'wp_enqueue_scripts', 'casiarw_scripts' );
add_action( 'after_setup_theme', 'casiarw_textdomain_setup' );

// Register Style
function casiarw_styles() {
	wp_enqueue_style( 'casiarw/main', plugins_url( 'main.css', __FILE__ ), false, filemtime( plugins_url( 'main.css', __FILE__ ) ));
}

// Update CSS within in Admin
function casiarw_admin_styles() {
	wp_enqueue_style('casiarw/admin/styles', plugins_url( 'admin.css', __FILE__ ), false, filemtime( plugins_url( 'admin.css', __FILE__ ) ));
}

function casiarw_scripts() {
	if ( has_block( 'casiarw/review' ) ) {
		wp_enqueue_script(
			'casiarw/mainjs',
			plugins_url( 'review.js', __FILE__ ),
			array( 'jquery' ),
			filemtime( plugins_url( 'review.js', __FILE__ ) )
		);
	}
}

function casiarw_textdomain_setup(){
	load_theme_textdomain( 'casiarw', plugins_url( 'main.css', __FILE__ ) . '/languages' );
}

/**
 * Enqueue the block's assets for the editor.
 *
 * wp-blocks:  Includes the registerBlockType() function to register blocks.
 * wp-i18n:    Includes the __() function for internationalization.
 * wp-element: Includes the createElement() function to create elements.
 * wp-editor:  Includes the RichText functionality for editable content.
 *
 * @since 1.0.0
 */
function casiarw_review_block() {
	wp_enqueue_script(
		'casiarw/review', // Unique handle.
		plugins_url( '/blocks/casiarw-review.build.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugins_url( '/blocks/casiarw-review.build.js', __FILE__ ) ) // filemtime — Gets file modification time.
	);
}

add_action( 'enqueue_block_editor_assets', 'casiarw_review_block' );

/**
 * Enqueue the block's assets for the editor.
 *
 * wp-blocks:  Includes the registerBlockType() function to register blocks.
 * wp-i18n:    Includes the __() function for internationalization.
 * wp-element: Includes the createElement() function to create elements.
 * wp-editor:  Includes the RichText functionality for editable content.
 *
 * @since 1.0.0
 */
function casiarw_review_block_row() {
	wp_enqueue_script(
		'casiarw/ratingrow', // Unique handle.
		plugins_url( '/blocks/casiarw-review-row.build.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugins_url( '/blocks/casiarw-review-row.build.js', __FILE__ ) ) // filemtime — Gets file modification time.
	);
}

add_action( 'enqueue_block_editor_assets', 'casiarw_review_block_row' );