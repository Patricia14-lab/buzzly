function SchemeMenus() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="packpage-scheme-menu">
        <div className="menu top-menu">
          <div className="left-top">
            <label className="bars2menuleft" htmlFor="state-left-menu">
              <span className="value on">
                <i className="fa-solid fa-angles-left" />
              </span>
              <span className="value off">
                <i className="fa fa-bars" />
              </span>
            </label>
            <div className="logo">
              <img src="src/img/logotexto21024.png" height="30px" />
            </div>
          </div>
          <div className="center-top">center</div>
          <div className="right-top">right</div>
        </div>
        <div className="page">
          <div className="menu left-menu">
            <input type="checkbox" id="state-left-menu" />
            <div className="backdrop"></div>
            <div className="content">
              <label htmlFor="state-left-menu">
                <IconButton
                  size="small"
                  className="close"
                  onClick={() => {
                    document.getElementById("state-left-menu").checked = false;
                  }}
                >
                  <i className="fa fa-times" />
                </IconButton>
              </label>
              <br />
              <div className="actions">
                <Button
                  className="action-menu"
                  endIcon={<i className="fa fa-user" />}
                  fullWidth
                >
                  Perfil
                </Button>
                <hr />
                <br />
                <Button
                  className="action-menu"
                  endIcon={<i className="fa fa-users" />}
                  fullWidth
                >
                  Contactos
                </Button>
                <Button
                  className="action-menu"
                  endIcon={<i className="fa fa-bookmark" />}
                  fullWidth
                >
                  Mensajes guardados
                </Button>
                <Button
                  className="action-menu"
                  endIcon={<i className="fa fa-gear" />}
                  fullWidth
                >
                  Ajustes
                </Button>
                <hr />
                <Button
                  className="action-menu off"
                  endIcon={<i className="fa fa-power-off" />}
                >
                  Cerrar sesión
                </Button>
              </div>
              <div className="row">
                <div className="avatar"></div>
                <div className="nombre"></div>
              </div>
            </div>
          </div>
          <div className="content-app">contenido</div>
        </div>
      </div>
    </ThemeProvider>
  );
}

ReactDOM.render(<SchemeMenus />, document.querySelector("body"));
