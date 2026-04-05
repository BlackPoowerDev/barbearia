import axios from 'axios'



const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers:{
    'Content-Type': 'application/json',
  }
})


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    // Verifica se o status é 401
    if (error.response && error.response.status === 401) {
      
      // Aqui está o pulo do gato: checar o 'code' que você criou no Node.js
      const errorCode = error.response.data.code;
      const errorMessage = error.response.data.error;

      if (errorCode === 'TOKEN_EXPIRED' || errorMessage === 'Token inválido') {
        console.log("Sessão expirada, redirecionando...");
        
        localStorage.removeItem('token');
        // Usar location.replace evita que o usuário consiga clicar em "voltar" 
        // para a página protegida
        window.location.replace('/auth'); 
      }
      
      // Se for erro de login (ex: "Senha incorreta"), o código cai aqui embaixo 
      // e o seu 'catch' no componente de Login vai conseguir mostrar a mensagem.
    }
    
    return Promise.reject(error);
  }
);
export default api 