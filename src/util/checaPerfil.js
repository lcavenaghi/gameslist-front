function checaPerfil(perfis) {
    try {
        let token = parseJwt(localStorage.getItem("token"));
        return perfis.includes(token.tipoDeAcesso)
    } catch (error) {
        console.log("Erro ao verificar perfil do usuário - ", error)
        return false;
    }
}

function tokenAutenticado(token) {
    if (token) {
        let tokenDate = parseJwt(token).exp;
        let now = new Date()/1000;
        return tokenDate > now;
    }
    else
        return false
}

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

export {checaPerfil, tokenAutenticado};