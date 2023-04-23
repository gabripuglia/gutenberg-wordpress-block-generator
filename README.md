# Wordpress Gutenberg Blocks Generator
With this script you may create how many wordpress gutenberg blocks you want without duplicate node modules

## Installation
- Set the development env: https://developer.wordpress.org/block-editor/getting-started/devenv/
- Clone this repo in your plugin or theme
- From the main folder of this repo, run the command `npm install`
- Include the file BlockGenerator.php (include, require, require_once)

## Create Block
- From the main folder of this repo, run the command `npm run create-block {block_name}`
- The script will create a folder "blocks". You can find all the files of the new block inside that directory

## Build and Start
- Move to ../blocks/{block_name} folder
- Run the command `npm run build` OR `npm run start`

## Other features
- From the main folder of this repo, run `npm run build-all` (alpha)
-- Force the build for every blocks. Usefully if you use custom react components across the blocks.

