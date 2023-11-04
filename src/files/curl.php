<?php
$tg_bot_token = "6295142205:AAFxTDfp4B4elVwF2vTo38bKvpKPJDuqR_Y";
$chat_id = "-977499279";

$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['msg'];

$arr = array(
    'Имя' => $name,
    'Телефон' => $phone,
    'Сообщение' => $message,
);

$body = "<b>Новый заказ с сайта rabota-gorod.ru </b>\n\n";
foreach($arr as $key => $value) {
    if(trim(!empty($value))){
        $body .= $key.": <b>".$value."</b>\n";
    }
};


// $body .= "\n" . $_SERVER['REMOTE_ADDR'];
// $body .= "\n" . date('d.m.y H:i:s');

// 'HTML' и HTML

$param = [
    "chat_id" => $chat_id,
    "text" => $body,
    "parse_mode" => 'HTML'
];

$url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendMessage?" . http_build_query($param);

var_dump($body);

file_get_contents($url);

foreach ( $_FILES as $file ) {

    $url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendDocument";

    move_uploaded_file($file['tmp_name'], $file['name']);

    $document = new \CURLFile($file['name']);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, ["chat_id" => $chat_id, "document" => $document]);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    $out = curl_exec($ch);

    curl_close($ch);

    unlink($file['name']);
}

die('1');