function MenuTop() {
  return (
    <div className="menu top-menu">
      <Left />
      <Center />
      <Right />
    </div>
  );

  function Left() {
    return (
      <div className="left-top">
        <MenuLeftCaller />
        <Logo />
      </div>
    );

    function Logo() {
      return (
        <div className="logo">
          <LogoTexto2 className="bright-hover" />
        </div>
      );
    }

    function MenuLeftCaller() {
      return (
        <label className="bars2menuleft" htmlFor="state-left-menu">
          <span className="value on">
            <i className="fa-solid fa-angles-left" />
          </span>
          <span className="value off">
            <i className="fa fa-bars" />
          </span>
        </label>
      );
    }
  }

  function Right() {
    return <div className="right-top">right987</div>;
  }

  function Center() {
    return <div className="center-top">center123</div>;
  }
}
