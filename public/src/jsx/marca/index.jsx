function LogoTexto2(params) {
  params.width ??= 100;
  params.href ??= "/";
  return LOAD_IMG_SZS({
    szs: [150, 512, 1024],
    src: (sz) => `/src/img/logo/texto/2-${sz}.png`,
    ...params,
  });
}
function Logo2(params) {
  return LOAD_IMG_SZS({
    szs: [512, 1024],
    src: (sz) => `/src/img/logo/2-${sz}.png`,
    ...params,
  });
}

function LOAD_IMG_SZS(params) {
  const p = { ...params };
  delete p.src;
  delete p.szs;
  delete p.width;
  delete p.href;

  const { src, szs, width = 300, href } = params;
  const sz = szs
    .sort()
    .reverse()
    .find((w) => width <= w);
  const img = <img src={src(sz)} width={`${width}px`} {...p} />;
  if (href) {
    return <a href={href}>{img}</a>;
  }
  return img;
}
