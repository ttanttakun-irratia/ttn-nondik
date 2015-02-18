<?php

$kalitateak = array("0","1","2","3","4");
$fitxategia = "nondik.json";
$nondik = "http://ttanttakun.org/nondik/";

if($_POST["latitudea"] && $_POST["longitudea"] && $_POST["kalitatea"]) {

	$json = file_get_contents($fitxategia);
	$json = json_decode($json,true);
	
	$kalitatea = $_POST["kalitatea"];
	$latitudea = $_POST["latitudea"];
	$longitudea = $_POST["longitudea"];

	$egokia = true;

	if(!in_array($kalitatea, $kalitateak )) $egokia = false;
	if(floatval($latitudea) === 0) $egokia = false;
	if(floatval($longitudea) === 0) $egokia = false;

	if($egokia){
		$json[] = array(
			'lat'		=> $latitudea,
			'lng'		=> $longitudea,
			'kalitatea'	=> $kalitatea,
			'date'		=> time()
		);
		
		$fh = fopen($fitxategia, 'w') or die("can't open file");
		$stringData = json_encode(array_values($json));	
		fwrite($fh, $stringData);
		fclose($fh);
		
		setcookie("nondik", "true", time()+3600*24);

		echo "<meta http-equiv=\"REFRESH\" content=\"12;url=".$nondik."\"></HEAD>
		<h2>Eskerrikasko parte hartzeagatik</h2> 
		<p>Gogoratu egunean bat bakarrik jarri dezakezula. Mapara itzuliko da orrialdea
		automatikoki momentu gutxiren barru, ez badabil klikatu 
		<a href=\"".$nondik."\">hemen</a>.<br/> Baliteke zure marka ez azaltzea, baina lasai,
		 denbora pixka batera azalduko da.</p>";
	
	} else {
		echo "<meta http-equiv=\"REFRESH\" content=\"1;url=".$nondik."/\">";
		echo "Arazoren bat izan da, mesedez, saiatu berriz";
	}
}