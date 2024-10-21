function MenuLeft() {
  return (
    <div className="menu left-menu">
      <input type="checkbox" id="state-left-menu" />
      <div className="backdrop"></div>
      <div className="content">
        <ButtonClose />
        <br />
        <Action />
      </div>
    </div>
  );

  function Action() {
    return (
      <div className="actions">
        <Profile />
        <hr />
        <br />
        <Contacts />
        <SavedMessages />
        <Settings />
        <hr />
        <SessionEnd />
      </div>
    );

    function SessionEnd() {
      return (
        <Button
          className="action-menu off"
          endIcon={<i className="fa fa-power-off" />}
        >
          Cerrar sesión
        </Button>
      );
    }

    function Settings() {
      return (
        <Button
          className="action-menu"
          endIcon={<i className="fa fa-gear" />}
          fullWidth
        >
          Ajustes
        </Button>
      );
    }

    function SavedMessages() {
      return (
        <Button
          className="action-menu"
          endIcon={<i className="fa fa-bookmark" />}
          fullWidth
        >
          Mensajes guardados
        </Button>
      );
    }

    function Contacts() {
      return (
        <Button
          className="action-menu"
          endIcon={<i className="fa fa-users" />}
          fullWidth
        >
          Contactos
        </Button>
      );
    }

    function Profile() {
      return (
        <Button
          className="action-menu"
          endIcon={<i className="fa fa-user" />}
          fullWidth
        >
          Perfil
        </Button>
      );
    }
  }

  function ButtonClose() {
    return (
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
    );
  }
}
