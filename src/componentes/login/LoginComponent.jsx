import React from 'react'

const LoginComponent = () => {
  return (
<div className="wrapper fadeInDown">
  <div id="formContent">

    <div className="fadeIn first">
      <br/>
      <img src="public/Logo.png" alt="Depovent" height="50" width="45%"/>
    </div>
<br/>
    <form>
      <input type="text" id="login" className="fadeIn second" name="login" placeholder="Usuario"/>
      <input type="text" id="password" className="fadeIn third" name="login" placeholder="Password"/>
      <input type="submit" className="fadeIn fourth" value="Acceder"/>
    </form>

    <div id="formFooter">
      <a className="underlineHover" href="#">Olvido su contraseña?</a>
    </div>

  </div>
</div>
  )
}

export default LoginComponent