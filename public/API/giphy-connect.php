<?php 

class Gifs
{
    private static $api_key;
    private static $limit;
    private static $size;


    public function __construct($api_key = null, $limit = 0, $size = 0)
    {
        self::$api_key = $api_key;
        self::$limit = $limit;
        self::$size = $size;
    }

    private function getRandomGif($tag=null)
    {
        $endpoint = 'http://api.giphy.com/v1/gifs/random';
        $params = array(
        'tag' => urlencode($tag)
        );
        
        $res = $this->request($endpoint, $params);
        
        return $res;
    }

    private function request($endpoint, array $params = array())
    {
        $params['api_key'] = self::$api_key;
        $query = http_build_query($params);
        $url = $endpoint . ($query ? "?$query" : '');
        $res = file_get_contents($url);
        $res = $res ? json_decode($res) : false;
        $result = $res->data->images->downsized_small;
        
        return $result;
    }


    public function sendGifs()
    {
        $gifs = array();
        
        for($i = 0; $i < self::$limit; $i++)
        {
            $gif = $this->getRandomGif();
            if($gif->mp4_size <= self::$size){
                $gifs[$i] = $gif->mp4;
            }
            else{
                $i--;
            }
        }

        return $gifs;
    }
}

// Add random gifs urls to array

$API_KEY = 'your_api_key';
$gifs = new Gifs($API_KEY, $_GET['limit'], $_GET['size']);
$result = $gifs->sendGifs();

echo json_encode($result);
