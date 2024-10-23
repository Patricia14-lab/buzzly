function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`app ${themename} error-404`}>
        <NoUser.MenuTop />
        <Content />
      </div>
    </ThemeProvider>
  );

  function Content() {
    return (
      <div className="content">
        <Text />
        <Logo2 width={400} />
      </div>
    );

    function Text() {
      return (
        <div className="text">
          <h1>¿Te has equivocado de camino?</h1>
          <div>
            Parece que te has perdido, abejita
            <br />
            <br />
            <Button variant="contained" href="/" size="large">
              Inicio
            </Button>
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.querySelector("body"));
