
import axios from 'axios';

export function Logueo(usuario){
    try {
        axios.post('http://alethetwin.online:8080/api/v1/Login',{
            headers: {
                'Access-Control-Allow-Origin': '*',
            }},
            {
            matricula: usuario.matricula,
            password: usuario.password
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.log(error)
    }
}

