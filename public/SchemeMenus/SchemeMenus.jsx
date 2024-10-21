function SchemeMenus() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="packpage-scheme-menu">
        <MenuTop />
        <Page />
      </div>
    </ThemeProvider>
  );
}
