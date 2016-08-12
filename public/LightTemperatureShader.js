/**
 * Brightness and Color Temperature Shader, based on Simple Brightness Shader by felixturner (http://airtight.cc/)
 */

 THREE.LightTemperatureShader = {

	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"brightness":     { type: "f", value: 1.0 },
		"warmth": { type: "f", value: 1.0 },
	},

	vertexShader: [

	"varying vec2 vUv;",
	"void main() {",
		"vUv = uv;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

	"}"

	].join("\n"),

	fragmentShader: [

	"uniform sampler2D tDiffuse;",
	"uniform float brightness;",
	"uniform float warmth;",
	"varying vec2 vUv;",

	"void main() {",

		"vec4 color = texture2D(tDiffuse, vUv);",
		"vec4 colorProcessed = color;",
		"if (warmth > 1.0) colorProcessed = vec4(color.r * warmth, color.g, color.b / warmth, color.a);",
		"if (warmth < -1.0) colorProcessed = vec4(color.r / warmth * (-1.0), color.g, color.b * warmth * (-1.0), color.a);",
		"gl_FragColor = colorProcessed * brightness;",

	"}"


	].join("\n")

};
