<?php

class BlocksGenerator {

    public static function init(){
        add_action( 'init',  'BlocksGenerator::register_blocks');
    }

    public static function register_blocks(){
        if(is_dir(__DIR__ . '/blocks')){
            $blocks = scandir(__DIR__ . '/blocks');
            unset($blocks[0]);
            unset($blocks[1]);
            $blocks = array_values($blocks);
            if(!empty($blocks)){
                foreach ($blocks as $block){
                    $path = sprintf('%s/blocks/%s/build', __DIR__, $block);
                    register_block_type($path);
                }
            }
        }
    }

}

BlocksGenerator::init();