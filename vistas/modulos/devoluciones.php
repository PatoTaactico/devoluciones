<div class="content-wrapper">
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>devoluciones</h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">inicio</li>
          </ol>
        </div>
      </div>
    </div>
  </section>

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <table id="tblSedes" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Identificacion</th>
                    <th>Nombre/Rol</th>
                    <th>Ficha</th>
                    <th>Fecha</th>
                    <th>Placa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>123456</td>
                    <td>Juan Perez / Admin</td>
                    <td>F123</td>
                    <td>2023-10-01</td>
                    <td>ABC123</td>
                  </tr>
                  <tr>
                    <td>789012</td>
                    <td>Maria Lopez / User</td>
                    <td>F456</td>
                    <td>2023-10-02</td>
                    <td>XYZ789</td>
                  </tr>
                  <tr>
                    <td>345678</td>
                    <td>Carlos Ruiz / Manager</td>
                    <td>F789</td>
                    <td>2023-10-03</td>
                    <td>LMN456</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="card-footer d-flex justify-content-end ml-2">
    <button  class="btn btn-danger float-right mr-2 ml-2" data-toggle="modal" data-target="#modalMalEstado">
      Mal Estado
    </button>
    <button  class="btn btn-success float-right" data-toggle="modal" data-target="#modalBuenEstado" >
      Buen Estado
    </button>
  </div>
</div>


<!-- Modal Mal Estado -->
<div class="modal fade" id="modalMalEstado" tabindex="-1" role="dialog" aria-labelledby="modalMalEstadoLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document"> <!-- Tamaño uniforme -->
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalMalEstadoLabel">Reporte de Mal Estado</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Por favor, describa el problema en el siguiente campo para generar un reporte:</p>
        <form id="formMalEstado" method="POST">
          <div class="form-group">
            <label for="reporteMalEstado">Descripción del Problema</label>
            <textarea class="form-control" id="reporteMalEstado" name="reporteMalEstado" rows="4" required></textarea>
          </div>
          <div class="d-flex justify-content-center mt-4">
            <button type="button" class="btn btn-danger mr-2" data-dismiss="modal" style="width: 150px;">Cancelar</button>
            <button type="button" class="btn btn-success" id="btnEnviarReporte" style="width: 150px;">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<script>
  document.getElementById('btnEnviarReporte').addEventListener('click', function () {
    const reporte = document.getElementById('reporteMalEstado').value;

    if (reporte.trim() === '') {
      // Validación: el campo no puede estar vacío
      // Por ahora, solo cerramos el modal.
      $('#modalMalEstado').modal('hide'); // Cierra el modal
    }
    // Aquí se puede implementar la lógica para enviar el reporte al sistema.
    // Por ahora, solo cerramos el modal.
    $('#modalMalEstado').modal('hide'); // Cierra el modal
  });
</script>