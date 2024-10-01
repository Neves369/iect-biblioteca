const gerar = () =>{
	let codigo = "";
	
	for (let i = 0; i <= 15; i++) {
		codigo = codigo + Math.floor(Math.random() * 10);
	}

	return codigo.replace(/(.{4})/g, '$1 ').trim();
}

export default {
	gerar
}





