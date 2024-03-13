class GenericResponse {
  sucess = false;
  data = undefined;
  exception = '';

  constructor(sucess, data, exception) {
    this.sucess = sucess;
    this.data = data;
    this.exception = exception;
  }
}
module.exports = GenericResponse;
