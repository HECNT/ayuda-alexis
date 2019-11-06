var Promise = require('bluebird'); /*LIBRERIA PARA HACER EL PROMISE EACH*/

/*
* EJEMPLO DE ARRAY DE DOCUMENTOS
*/
var arreglo = [
  { fieldname: "file", originalname: "Hola", mimetype: "application/pdf", size: 2311231 },
  { fieldname: "file", originalname: "Hola", mimetype: "application/word", size: 2311231 },
  { fieldname: "file", originalname: "Hola", mimetype: "application/excel", size: 2311231 },
  { fieldname: "file", originalname: "Hola", mimetype: "application/pdf", size: 2311231 }
]

/*
* INVOCAR A LA FUNCION SE LE PASA COMO PARAMETRO UN ARREGLO DE JSON CON LOS DOCUMENTOS A VALIDAR
*/
validarDocumento(arreglo)
.then(function(res){
  /*EN RES SE CONTIENE EL RESULTADO DE LA VALIDACION DE DOCUMENTOS,
  * LA RESPUESTA CONTIENE DOS ARREGLOS UNO CON DOCUMENTOS VALIDOS QUE TIENE EL NOMBRE DE documentos_validos Y
  * OTRO QUE CONTIENE LOS DOCUMENTOS INVALIDOS QUE LLEVA EL NOMBRE DE documentos_invalidos
  */
  console.log(res,'<---------- RESULTADO');
})


function validarDocumento(d) {
  return new Promise(function(resolve, reject) {
    /*
    * DEFINICIO DE VARIABLES
    */
    var documentos_validos = ['application/pdf']; // ARREGLO QUE CONTIENE LOS MINETYPE QUE SON VALIDOS
    var arr_documentos = []; // ARREGLO DONDE SE VAN A GUARDAR LOS DOCUMENTOS VALIDOS
    var arr_documentos_invalidos = []; // ARREGLO DONDE SE VAN A GUARDAR LOS DOCUMENTOS INVALIDOS
    var valido = true; // BANDERA PARA SABER SI UN DOCUMENTO ES VALIDO

    /*
    * INICIA PROCESO DE VALIDACION POR MEDIO DE UN PROMISE EACH
    */

    Promise.each(d, function(item){
      return new Promise(function(resolve, reject) {

        /*
        * SE REALIZA FOR PARA RECORRER TODOS LOS MINETYPE VALIDOS
        */
        for (var key in documentos_validos) {
          valido = item.mimetype === documentos_validos[key] ? true : false;
        }

        /*
        * SE VALIDA SI EL DOCUMENTO ES VALIDO
        */
        if (valido) {
          /*
          * SE AGREGA DOCUMENTO AL ARREGLO DE DOCUMENTOS VALIDOS
          */
          arr_documentos.push(item)
        } else {
          /*
          * SE AGREGA DOCUMENTO AL ARREGLO DE DOCUMENTOS INVALIDOS
          */
          arr_documentos_invalidos.push(item)
        }

        /*
        * SE RESULVE PROMESA
        */
        resolve()

      });
    }).then(function(){
      /*
      * TERMINA ITERACION Y DEVUELVE RESPUESTA GENERAL
      */
      resolve({ err: false, documentos_validos: arr_documentos, documentos_invalidos: arr_documentos_invalidos })
    })
  });
}
