const authHeader = () => {
  const jwt = localStorage.getItem('jwt_token');

  if(jwt) {
    return { Authorization: 'Bearer ' + jwt };
  }
  else {
    return {};
  }
}

export default authHeader();