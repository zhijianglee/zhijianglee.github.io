<?php
  if($_POST["submit"] === "add")
  {
    $fh = fopen("data.txt", "a");
    $content = "Nom:\t".$_POST["truth_dare_content"]."\n";
    fwrite($fh, $content);
    fclose($fh);
  }
    header("index.html");
?>
