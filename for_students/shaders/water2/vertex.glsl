
 // declare the varying variable that gets passed to the fragment shader
 varying vec2 v_uv;
// varying float v_dim;
varying vec4 fragCoord;
void main() {
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    fragCoord = gl_Position;
    // pass the texture coordinate as well
    v_uv = uv;

    // pass the extra attribute
  //  v_dim = dim;
}