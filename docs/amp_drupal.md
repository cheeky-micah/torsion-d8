# **Drupal AMP**
How to install and setup a basic AMP sub-theme for drupal in torsion.

## Installation
* Download the amp module from here: https://www.drupal.org/project/amp
* AMP Requires the token module, so you'll need that aswell: https://www.drupal.org/project/token
* Download and install the amp base theme from here: https://www.drupal.org/project/amptheme
* Download and enable the 'composer manager' module: https://www.drupal.org/project/composer_manager
* Initialize composer by running the init.php script `"php PATH_TO_COMPOSER_MANAGER_MODULE/scripts/init.php"`, example from root:
    ````
    php modules/contrib/composer_manager/scripts/init.php 
    ````
* You should see Composer Manager has been successfully initialized. once initialized properly.
* Run the composer drupal-update" script from the the root of your Drupal directory:
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
 * Start with downloading or checking out the pre-built child torsion amp theme form here: https://github.com/cheeky-micah/torsion-d8
 * For D8: Place the theme in the `/themes/custom/` folder.
 * On the AMP Configuration Page:
    * Set AMP Theme to "CMM Torsion AMP"

### Discoverable Pages Using LD+JSON
 * Google recommends the use of LD+JSON to help with making your pages discoverable.  The example they give is here: https://www.ampproject.org/docs/guides/discovery
 * An example of the Cheeky Monkey Blog Node `[node--blog.html.twig]`
    
````
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Blog",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ urlPath }}"
  },
  "headline": "{{ blogTitle }}",
  "image": {
    "@type": "ImageObject",
    "url": "{{ hero_image }}",
    "height": 696,
    "width": 224
  },
  "datePublished": "{{ isoDateCreated }}",
  "dateModified": "{{ isoDateChanged }}",
  "author": {
    "@type": "Person",
    "name": "{{ blogAuthor }}"
  },
   "publisher": {
    "@type": "Organization",
    "name": "Cheeky Monkey Media",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cheekymonkeymedia.ca/themes/cmm/images/site-logo.svg",
      "width": 190,
      "height": 48
    }
  },
  "description": "{{ description|length > 250 ? description|slice(0, 250)|trim ~ '...' : description }}"
}
</script>
````

 * The twig variables will have to be populated though, through your .theme file. Like the `{{ isoDateCreated }}` variables.
 * Here is an example of the the `hook_preprocess_node()` we used in or .theme file to get those variables populated.

````
/**
 * @function
 * prepare some twig variables to use for injecting into node template level
 */
function cmm_torsion_amp_preprocess_node(&$variables) {
  global $base_url;

  $node           = $variables['node'];
  $isoDateCreated = $node->getCreatedTime();
  $isoDateChanged = $node->getChangedTime();
  $blogAuthorID   = $node->getOwnerId();
  $blogAuthorUser = \Drupal\user\Entity\User::load($blogAuthorID);
  $blogTitle      = $node->getTitle();
  $current_uri    = \Drupal::request()->getRequestUri();

  $variables['isoDateCreated'] = \Drupal::service('date.formatter')->format($isoDateCreated, 'Y-m-d\\TH:i:sP');
  $variables['isoDateChanged'] = \Drupal::service('date.formatter')->format($isoDateChanged, 'Y-m-d\\TH:i:sP');
  $variables['urlPath']        = $base_url . $current_uri;
  $variables['blogAuthor']     = $blogAuthorUser->getDisplayName();
  $variables['blogTitle']      = $blogTitle;

  /**
   * get hero image url from blog nodes
   */
  if ($node->getType() == 'blog') {
    if (!$node->get('field_image')->isEmpty()) {
      $file = $node->field_image->entity;
      if ($file) {
        $image = \Drupal::service('image.factory')->get($file->getFileUri());
        if ($image->isValid()) {
          $f_uri = $file->getFileUri();
          $style = ImageStyle::load('blog_header_smallportrait_2');
          $variables['hero_image'] = $style->buildUrl($f_uri);
        }
      }
    }
  }

  /**
   * get variables for custom output in twig template for the social_link nodetype
   */
  if ($node->getType() == 'social_link') {
    $variables['footer_social_title'] = $node->get('title')->value;
    if (!$node->get('field_icon')->isEmpty()) {
      $file = $node->field_icon->entity;
      $f_uri = file_create_url($file->getFileUri());
      $variables['footer_social_image'] = $f_uri;
    }
    if (!$node->get('field_link')->isEmpty()) {
      $link = $node->get('field_link')->first()->getUrl();
      $variables['footer_social_link'] = $link;
    }
  }
}
````

## Images
 * Unfortunately drupal does not render images (placed by the CKEditor), with their width and height attributes. But for amp to properly process them and apply it's own `<amp-img>` tag, we need those attributes.  So we have a module that will preprocess those images on running update.php, node save, and node update, entitry save, and entity update.
 * Get the module from here: `TODO: add module to D.O`

## Hints, Tips, Things to watch out for:
 * There is **no user** writen JS or libraries allowed, it will be completely ignored, you must use AMP specific libraries.
 * CSS is done all inline via an amp include template file.
    * In `D8` use the `cmm_torsion_amp/templates/amp-css/amp-custom-styles.html.twig` file to write your css.
