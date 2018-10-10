<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><?php wp_title(); ?></title>
  <!--build:css ../../styles.min.css-->
  <link href="wp-content/themes/toko/src/css/main.css" rel="stylesheet">
  <!--endbuild-->
  <?php wp_head(); ?>
</head>
<body>

  <div id="wrapper" class="hfeed">
  <header id="header" role="banner">
  <section id="branding">
  <div id="site-title"><?php if ( is_front_page() || is_home() || is_front_page() && is_home() ) { echo '<h1>'; } ?><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_html( get_bloginfo( 'name' ) ); ?>" rel="home"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></a><?php if ( is_front_page() || is_home() || is_front_page() && is_home() ) { echo '</h1>'; } ?></div>
  <div id="site-description"><?php bloginfo( 'description' ); ?></div>
  </section>
  <nav id="menu" role="navigation">
  <div id="search">
  <?php get_search_form(); ?>
  </div>
  <?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>
  </nav>
  </header>
  <div id="container">
