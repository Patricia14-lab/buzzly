const NoUser = {
  MenuTop: () => {
    return (
      <div className="menu-top">
        <LogoTexto2 className="bright-hover" />
        <div className="right">
          <Button
            endIcon={<i className="fa fa-user" />}
            color="inherit"
            href="/user/unlogged/login"
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    );
  },
};
