<?php

require_once "../controladores/usuarios.controlador.php";
require_once "../modelos/usuarios.modelo.php";

class AjaxUsuarios
{

    public $sede;
    public $idUsuario;

    public function ajaxFichasSede()
    {
        $item = "sede";
        $valor = $_POST["sede"];
        $respuesta = ControladorUsuarios::ctrMostrarFichasSede($item, $valor);
        echo json_encode($respuesta);
    }


    public function ajaxMostrarUsuario()
    {
        $item = "id_usuario";
        $valor = $this->idUsuario;
        $respuesta = ControladorUsuarios::ctrMostrarUsuarios($item, $valor);
        echo json_encode($respuesta);
    }

   
}

if (isset($_POST["sede"])) {
    $fichas = new AjaxUsuarios();
    $fichas->sede = $_POST["sede"];
    $fichas->ajaxFichasSede();
}

if (isset($_POST["idUsuario"])) {
    $usuario = new AjaxUsuarios();
    $usuario->idUsuario = $_POST["idUsuario"];
    $usuario->ajaxMostrarUsuario();

} 