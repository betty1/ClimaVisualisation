
function onLightChange(value, shaderPass) {

	//copy gui params into shader uniforms
	shaderPass.uniforms[ "amount" ].value = testParams.amount;
}