# **Drupal AMP**
How to install and setup a basic AMP sub-theme for drupal in torsion.

## Installation
* Download the amp module from here: https://www.drupal.org/project/amp
* AMP Requires the token module, so you'll need that aswell: https://www.drupal.org/project/token
* Download and install the amp base theme from here: https://www.drupal.org/project/amptheme
* Downlaod and enable the 'composer manager' module: https://www.drupal.org/project/composer_manager
* Initialize composer by running the init.php script `"php PATH_TO_COMPOSER_MANAGER_MODULE/scripts/init.php"`, example from root:
    ````
    php modules/contrib/composer_manager/scripts/init.php 
    ````
* You should see Composer Manager has been successfully initialized. once initialized properly.
* Run composer drupal-update from the the root of your Drupal directory.
    ````
    composer drupal-update
    ````
* Enable the Token Module
* Enable the AMP Module
* Enable the AMP Base Theme (don't set it to default)

## Setup
* Enable AMP on any node types that you'll be adding AMP functionality to, like a 'news' or 'blog' node:
    * Navigate to `Configuration->Content Authoring->AMP Configuration`
    * You'll get a list of available node types to enable AMP on.
    * Click the 'Enable AMP in Custom Display Settings'
    * Click `custom display settings'
    * Enable the `AMP` checkbox and Save
    * This will allow for another 'display mode' where you can specifically choose which fields to show on the amp version of the page.
* Back on the AMP Configuration Page:
    * Enable the "Power User" checkbox, and Save.
    * Set AMP Theme to "CMM Torsion AMP" once you've downloaded and installed the child theme. See "theme" section of this doc.

From here on it, it's all themeing.

## Theme
 * Start with downloading or checking out the pre-built child torsion amp theme form here: https://github.com/Cheeky-Monkey-Media/torsion-amp
 * For D8: Place the theme in the `/themes/custom/` folder.

## Hints, Tips, Things to watch out for:
 * There is **no user** writen JS or libraries allowed, it will be completely ignored, you must use AMP specific libraries.
 * CSS is done all inline via an amp include template file.
    * In `D8` use the `cmm_torsion_amp/templates/amp-css/amp-custom-styles.html.twig` file to write your css.
