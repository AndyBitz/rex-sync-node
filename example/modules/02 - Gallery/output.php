<?php 
  $images = explode(',', 'REX_MEDIALIST[id=1]');

  $buffer = '';

  foreach ($images as $image) {
    $buffer .= ('
      <div>
        <img src="/media/'.$image.'" alt="" />
      </div>
    ');
  }

  echo '<div class="gallery">'.$buffer.'</div>';
?>
