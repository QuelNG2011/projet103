Webcam.set({ 
    width:350, 
    height:300, 
    image_format : 'png', 
    png_quality:90 
  });

  camera = document.getElementById("camera");

  Webcam.attach( '#camera' );

  function takeSnapshot() //serve para capturar imagem 
{
    Webcam.snap(function(data_uri) { //funçao pre definida da webcam, utlizada para obter imagem de uma webcam
    //comando data_uri: comando de pre visualizaçao de uma imagem 
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    }); //atraves da div result eu consigo pegar o resultado da minha imagem que foi capturada e ela vai ser exibida
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IPfia04b9/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!'); //modelo carregado
  } 
     //o proposito da funçao check é pegar a imagem capturada, passa-la para a bliboteca ml5, 
     //e fazer comparaçao e depois chamar a funçao result 
  function check() 
  {
    img = document.getElementById('captured_image'); //armazenando a imagem capturada dentro de uma variavel que se chama "img"
    classifier.classify(img, gotResult); //classifier continua sendo uma variavel que guarda o modelo do inicio do codigo
  } //classify é uma funçao pré definida do ml5 utilizada para comparar a imagem capturada juntamente com o modelo que voce armazenou no modelo treinado


function gotResult(error, results) { //o proposito dessa funçao é mostrar o resultado obtido, apos a identificaçao da imagem capturada
  if (error) { //condiçao de erro 
    console.error(error);
  } else { // condicao de resultado 
    console.log(results);
    document.getElementById("resultObjectName").innerHTML = results[0].label;// vamos obter essas informaçoes dentro da spam desenvolvida no HTML
    document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(3); // vamos obter essas informaçoes dentro da spam desenvolvida no HTML
  } //toFixed é uma funçao pré definida, nos ajudará a reduzir um numero apos o decimal quando colocamos a quantidade necessaria de digitos apos a virgula
}
