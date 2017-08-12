var container = document.getElementById("container");
var gl = container.getContext("experimental-webgl");
var program;
if (gl) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, 500, 500);
  
  createShaders(gl);
  createBuffers(gl);
  
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
 
  // Viewport is set to the size of canvas by default.
  // Only need to set it if canvas size change
  
}

function createBuffers(gl) {
  var vertices = new Float32Array([
    -0.25, 0.5, 0.0,
    -0.5,  0.0, 0.0,
     0.0,  0.0, 0.0,
     0.25, 0.5, 0.0,
     0.5, 0.0,  0.0,
  ]);
  var vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 12, 0);
  
  var indexes = new Uint16Array([
    0, 1, 2,
    2, 4, 3
  ]);
  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW);
}

function createShaders(gl) {
  program = gl.createProgram();
  var vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, document.getElementById('shader-vs').textContent);
  gl.compileShader(vs);
  var fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, document.getElementById('shader-fs').textContent);
  gl.compileShader(fs);
  //var compilationLog = gl.getShaderInfoLog(fs);
  //console.log('Shader compiler log: ' + compilationLog);
  
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  
  gl.linkProgram(program);
  
  gl.useProgram(program);
  
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  
  if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
    var info = gl.getProgramInfoLog(program);
    throw 'Could not compile WebGL program. \n\n' + info;
  }
  
  program.vertexPositionAttribute = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(program.vertexPositionAttribute);
}
