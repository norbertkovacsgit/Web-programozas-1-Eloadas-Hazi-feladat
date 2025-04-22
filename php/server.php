<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Access-Control-Allow-Origin: *');

while (true) {
    echo "data: " . date('H:i:s') . "\n\n";
    ob_flush();
    flush();
    sleep(1);
}
?>
